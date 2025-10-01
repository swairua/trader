export type TranslationResult = {
  title?: string;
  excerpt?: string;
  content?: string;
};

const CACHE_PREFIX = 'translate_cache_v1';
const API_URL = 'https://libretranslate.de/translate';

async function computeHash(text: string) {
  if (typeof crypto !== 'undefined' && (crypto as any).subtle) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(text);
      const hashBuffer = await (crypto as any).subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // fallthrough
    }
  }
  // Fallback
  try {
    return btoa(unescape(encodeURIComponent(text))).slice(0, 64);
  } catch (e) {
    return String(text.length);
  }
}

function getCacheKey(hash: string, target: string) {
  return `${CACHE_PREFIX}:${hash}:${target}`;
}

function saveToCache(hash: string, target: string, value: string) {
  try {
    const key = getCacheKey(hash, target);
    localStorage.setItem(key, value);
  } catch (e) {
    // ignore
  }
}

function loadFromCache(hash: string, target: string) {
  try {
    const key = getCacheKey(hash, target);
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

async function translateChunk(text: string, target: string, source = 'en') {
  // Check cache
  const hash = await computeHash(text);
  const cached = loadFromCache(hash, target);
  if (cached) return cached;

  try {
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ q: text, source, target, format: 'text' }),
    });

    if (!resp.ok) {
      throw new Error(`Translation API error ${resp.status}`);
    }

    const data = await resp.json();
    const translated = data?.translatedText || '';
    saveToCache(hash, target, translated);
    return translated;
  } catch (e) {
    console.error('Translation failed:', e);
    return text; // fallback to original
  }
}

export async function translateText(text: string, target: string, source = 'en') {
  if (!text) return '';
  if (target === source) return text;

  // If text is short, translate directly
  if (text.length < 3000) {
    return translateChunk(text, target, source);
  }

  // For long text, split by paragraphs and translate sequentially
  const parts = text.split(/\n\n+/g);
  const translatedParts: string[] = [];
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) {
      translatedParts.push(part);
      continue;
    }
    // Honor code blocks by not translating triple-backtick blocks
    if (/^```[\s\S]*```$/m.test(trimmed)) {
      translatedParts.push(part);
      continue;
    }
    const translated = await translateChunk(part, target, source);
    translatedParts.push(translated);
  }

  return translatedParts.join('\n\n');
}

export async function translatePostFields(fields: { title?: string; excerpt?: string; content?: string }, target: string, source = 'en') {
  const result: TranslationResult = {};
  if (fields.title) {
    result.title = await translateText(fields.title, target, source);
  }
  if (fields.excerpt) {
    result.excerpt = await translateText(fields.excerpt, target, source);
  }
  if (fields.content) {
    result.content = await translateText(fields.content, target, source);
  }
  return result;
}
