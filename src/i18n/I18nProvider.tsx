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

  const t = useCallback(
    (key: string) => {
      const dict = translations[language] ?? translations.en;
      return dict[key] ?? translations.en[key] ?? key;
    },
    [language]
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
