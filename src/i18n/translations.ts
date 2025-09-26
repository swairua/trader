export type Locale = 'en' | 'fr';

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    skip_to_main_content: 'Skip to main content',
    cookie_preferences: 'Cookie Preferences',
    cookie_message:
      'We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. You can customize your preferences or accept all cookies.',
    customize: 'Customize',
    reject_all: 'Reject All',
    accept_all: 'Accept All',
    cookie_settings: 'Cookie Settings',
    necessary_cookies: 'Necessary Cookies',
    necessary_cookies_desc:
      'Required for basic site functionality. Cannot be disabled.',
    analytics_cookies: 'Analytics Cookies',
    analytics_cookies_desc:
      'Help us understand how visitors interact with our website.',
    marketing_cookies: 'Marketing Cookies',
    marketing_cookies_desc:
      'Used to track visitors across websites for advertising purposes.',
    functional_cookies: 'Functional Cookies',
    functional_cookies_desc:
      'Enable enhanced functionality like live chat and personalization.',
    save_preferences: 'Save Preferences',
  },
  fr: {
    skip_to_main_content: 'Aller au contenu principal',
    cookie_preferences: 'Préférences des cookies',
    cookie_message:
      "Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic du site et à des fins marketing. Vous pouvez personnaliser vos préférences ou accepter tous les cookies.",
    customize: 'Personnaliser',
    reject_all: 'Tout refuser',
    accept_all: 'Tout accepter',
    cookie_settings: 'Paramètres des cookies',
    necessary_cookies: 'Cookies nécessaires',
    necessary_cookies_desc:
      'Requis pour les fonctionnalités de base du site. Ne peut pas être désactivé.',
    analytics_cookies: 'Cookies d’analyse',
    analytics_cookies_desc:
      'Nous aident à comprendre comment les visiteurs interagissent avec notre site.',
    marketing_cookies: 'Cookies marketing',
    marketing_cookies_desc:
      'Utilisés pour suivre les visiteurs sur les sites à des fins publicitaires.',
    functional_cookies: 'Cookies fonctionnels',
    functional_cookies_desc:
      'Permettent des fonctionnalités avancées comme le chat en direct et la personnalisation.',
    save_preferences: 'Enregistrer les préférences',
  },
};
