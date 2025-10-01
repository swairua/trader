import React from 'react';
import { useI18n, switchLanguage } from '@/i18n';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  size?: 'sm' | 'md';
};

export const LanguageSwitch: React.FC<Props> = ({ className, size = 'md' }) => {
  const { language, setLanguage } = useI18n();

  const setLang = (lang: 'en' | 'fr') => {
    try {
      switchLanguage(lang);
    } catch {
      setLanguage(lang);
    }
  };

  const base = 'inline-flex items-center rounded-full border border-border/60 bg-background shadow-sm';
  const padding = size === 'sm' ? 'p-0.5' : 'p-1';
  const segment = size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';

  return (
    <div className={cn(base, padding, className)} role="group" aria-label="Language switch">
      <button
        type="button"
        aria-pressed={language === 'en'}
        onClick={() => setLang('en')}
        className={cn(
          segment,
          'rounded-full transition-colors',
          language === 'en' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'
        )}
      >
        ENG
      </button>
      <button
        type="button"
        aria-pressed={language === 'fr'}
        onClick={() => setLang('fr')}
        className={cn(
          segment,
          'rounded-full transition-colors',
          language === 'fr' ? 'bg-primary text-primary-foreground' : 'text-foreground/80 hover:text-foreground'
        )}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitch;
