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

// Helper to lookup translations from Supabase table 'translations'
async function lookupTranslations(keys: string[], source: string, target: string) {
  if (!keys || keys.length === 0) return {} as Record<string, string>;
  try {
    const { data, error } = await supabase
      .from('translations')
      .select('input_hash, translated_text')
      .eq('source', source || 'en')
      .eq('target', target)
      .in('input_hash', keys)
      .limit(1000);
    if (error) {
      console.warn('lookupTranslations error', error.message || error);
      return {};
    }
    const map: Record<string, string> = {};
    (data || []).forEach((row: any) => {
      map[row.input_hash] = row.translated_text;
    });
    return map;
  } catch (e) {
    return {};
  }
}

// Helper to persist translations in Supabase
async function persistTranslation(key: string, source: string, target: string, original: string, translated: string) {
  try {
    await supabase.from('translations').insert([{ input_hash: key, source: source || 'en', target, original_text: original, translated_text: translated }]);
  } catch (e) {
    // ignore - non-fatal
  }
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
      // Prepare keys and check in-memory cache first
      const jobs = texts.map((t: string) => {
        const key = `${source}:${target}:${String(t).slice(0,200)}`;
        const cached = cacheGet(key);
        return { t, key, cached };
      });

      // Collect keys not in memory cache
      const missingKeys = jobs.filter(j => !j.cached).map(j => j.key);
      // Lookup persisted translations in Supabase in one query
      const persisted = await lookupTranslations(missingKeys, source || 'en', target);

      // Fill results using cache, persisted, or mark missing
      const toTranslate: { t: string; key: string }[] = [];
      for (const j of jobs) {
        if (j.cached) {
          results.push(j.cached);
          continue;
        }
        if (persisted[j.key]) {
          cacheSet(j.key, persisted[j.key]);
          results.push(persisted[j.key]);
          continue;
        }
        toTranslate.push({ t: j.t, key: j.key });
      }

      // Translate missing sequentially and persist
      for (const job of toTranslate) {
        try {
          const translated = await translateViaLibre(job.t, target, source || 'en');
          cacheSet(job.key, translated);
          results.push(translated);
          // persist
          await persistTranslation(job.key, source || 'en', target, job.t, translated);
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

    // Check persisted
    try {
      const persisted = await lookupTranslations([key], source || 'en', target);
      if (persisted[key]) {
        cacheSet(key, persisted[key]);
        return new Response(JSON.stringify({ translated: persisted[key] }), { status: 200 });
      }
    } catch (e) {
      // ignore
    }

    // Translate and persist
    try {
      const translated = await translateViaLibre(text, target, source || 'en');
      cacheSet(key, translated);
      // persist
      await persistTranslation(key, source || 'en', target, text, translated);
      return new Response(JSON.stringify({ translated }), { status: 200 });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'translate_failed' }), { status: 502 });
    }
  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error' }), { status: 500 });
  }
});
