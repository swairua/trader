export { I18nProvider, useI18n, setGlobalLanguage } from './I18nProvider';
export type { Locale } from './translations';
export { translations } from './translations';

export function switchLanguage(lang: 'en' | 'fr') {
  // import locally to avoid circular deps
  const { setGlobalLanguage } = require('./I18nProvider') as typeof import('./I18nProvider');
  setGlobalLanguage(lang);
}

export function switchToFrench() {
  switchLanguage('fr');
}
