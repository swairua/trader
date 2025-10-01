import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { translations, type Locale } from './translations';

const STORAGE_KEY = 'app:lang';
const EVENT_NAME = 'app:i18n:set-language';

type I18nContextType = {
  language: Locale;
  setLanguage: (lang: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function detectInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && (stored === 'en' || stored === 'fr')) return stored;
  } catch {}
  if (typeof navigator !== 'undefined') {
    const nav = navigator.language?.toLowerCase() || navigator.languages?.[0]?.toLowerCase();
    if (nav?.startsWith('fr')) return 'fr';
  }
  return 'en';
}

export const I18nProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<Locale>(detectInitialLocale());

  const setLanguage = useCallback((lang: Locale) => {
    setLanguageState(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }, []);

  // Listen for global language change events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ lang: Locale }>).detail;
      if (detail?.lang) setLanguage(detail.lang);
    };
    window.addEventListener(EVENT_NAME, handler as EventListener);
    return () => window.removeEventListener(EVENT_NAME, handler as EventListener);
  }, [setLanguage]);

  const [alternateOnHome, setAlternateOnHome] = useState(false);

  useEffect(() => {
    try {
      const path = typeof window !== 'undefined' ? window.location.pathname : '/';
      setAlternateOnHome(path === '/' || path === '');
    } catch {
      setAlternateOnHome(false);
    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const dict = translations[language] ?? translations.en;
      const en = translations.en[key] ?? key;
      const fr = translations.fr[key] ?? key;

      if (!alternateOnHome) return dict[key] ?? translations.en[key] ?? key;

      // Split into sentences (simple split on punctuation). Keep fallback to full strings if split fails.
      const splitSentences = (s: string) => s
        .split(/(?<=[.!?])\s+/u)
        .map(part => part.trim())
        .filter(Boolean);

      const enParts = splitSentences(en);
      const frParts = splitSentences(fr);

      const max = Math.max(enParts.length, frParts.length);
      const outParts: string[] = [];

      for (let i = 0; i < max; i++) {
        if (enParts[i]) outParts.push(enParts[i]);
        if (frParts[i]) outParts.push(frParts[i]);
      }

      // If no splitting occurred, fallback to simple interleave
      if (outParts.length === 0) return `${en} ${fr}`;

      return outParts.join(' ');
    },
    [language, alternateOnHome]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

// Global API to switch language programmatically (outside React components)
export function setGlobalLanguage(lang: Locale) {
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { lang } }));
}
