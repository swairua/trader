import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Simple LRU cache in memory per function instance - short-lived but reduces repeated calls
const cache = new Map<string, string>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24h
const cacheMeta = new Map<string, number>();

function cacheSet(key: string, value: string) {
  cache.set(key, value);
  cacheMeta.set(key, Date.now() + CACHE_TTL);
}

function cacheGet(key: string) {
  const exp = cacheMeta.get(key) || 0;
  if (Date.now() > exp) {
    cache.delete(key);
    cacheMeta.delete(key);
    return null;
  }
  return cache.get(key) || null;
}

async function translateViaLibre(text: string, target: string, source = 'en') {
  const payload = { q: text, source, target, format: 'text' };
  const res = await fetch('https://libretranslate.de/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('translate-failed');
  const data = await res.json();
  return data.translatedText || data.translation || '';
}

serve(async (req) => {
  try {
    if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const body = await req.json().catch(() => ({}));
      const { text, texts, target, source } = body || {};
    // Validate
    if ((!text && !Array.isArray(texts)) || !target) return new Response(JSON.stringify({ error: 'invalid_payload' }), { status: 400 });

    // If batch
    if (Array.isArray(texts)) {
      const results: string[] = [];
      const jobs = texts.map((t: string) => {
        const key = `${source}:${target}:${String(t).slice(0,200)}`;
        const cached = cacheGet(key);
        if (cached) {
          results.push(cached);
          return null;
        }
        return { t, key };
      }).filter(Boolean) as { t: string; key: string }[];

      // Translate missing ones sequentially to avoid rate limits
      for (const job of jobs) {
        try {
          const translated = await translateViaLibre(job.t, target, source || 'en');
          cacheSet(job.key, translated);
          results.push(translated);
        } catch (e) {
          results.push(job.t); // fallback to original
        }
      }

      return new Response(JSON.stringify({ translated: results }), { status: 200 });
    }

    // Single text
    const key = `${source}:${target}:${String(text).slice(0, 200)}`;
    const cached = cacheGet(key);
    if (cached) return new Response(JSON.stringify({ translated: cached }), { status: 200 });

    // Optionally you can store translations in a Supabase table for long-term caching. For now, in-memory
    try {
      const translated = await translateViaLibre(text, target, source || 'en');
      cacheSet(key, translated);
      return new Response(JSON.stringify({ translated }), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'translate_failed' }), { status: 502 });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error' }), { status: 500 });
  }
});
