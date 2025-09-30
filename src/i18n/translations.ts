export type Locale = 'en' | 'fr';

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Accessibility / generic
    skip_to_main_content: 'Skip to main content',

    // Cookie banner
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

    // Navigation / CTAs
    nav_more: 'More',
    nav_learn_drive: 'Learn DRIVE Strategy',
    nav_start_trading: 'Start Trading',
    nav_telegram: 'Telegram',
    nav_open_telegram: 'Open KenneDyne spot Telegram',
    nav_close: 'Close',

    // Services / common CTAs
    view_details: 'View Details',

    // DRIVE section
    drive_framework_title: 'The D.R.I.V.E Strategy Framework',
    drive_acronym_full: 'Direction. Range. Interest Point. Value of Risk. Entry.',
    drive_framework_description:
      'A systematic 5-step methodology that transforms retail traders into institutional professionals.',
    explore_drive_playbook: 'Explore the DRIVE Playbook',
    join_on_telegram: 'Join on Telegram',

    // DRIVE steps (for localized titles/descriptions)
    drive_direction_title: 'Direction',
    drive_direction_desc: 'Learn how to analyze market direction across multiple timeframes (Monthly, Weekly, Daily).',
    drive_range_title: 'Range',
    drive_range_desc: 'Learn how to define market ranges to narrow tradable areas.',
    drive_poi_title: 'Interest Point (POI)',
    drive_poi_desc: 'Learn how to align support and resistance across timeframes.',
    drive_value_of_risk_title: 'Value of Risk',
    drive_value_of_risk_desc: 'Learn how to apply structured risk-to-reward ratios.',
    drive_entry_title: 'Entry',
    drive_entry_desc: 'Learn how to follow structured entry rules.',

    // How it Works extras
    create_exness_account: 'Create your Exness account',
    key_benefits: 'Key Benefits:',
    your_success_story: 'Your Success Story Starts Here',
    success_story_paragraph:
      'Join thousands of successful traders who transformed their financial future with our proven methodology.',
    free_setup: '100% Free Setup',
    proven_results: 'Proven Results',

    // Risk disclaimer bar
    risk_notice_chip: 'Risk notice',
    risk_notice_title: 'Risk Notice',
    risk_notice_message:
      "Trading Forex and CFDs involves high risk. Past performance does not guarantee future results.",
    learn_more: 'Learn more',
    dismiss: 'Dismiss',
  },
  fr: {
    // Accessibility / generic
    skip_to_main_content: 'Aller au contenu principal',

    // Cookie banner
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

    // Navigation / CTAs
    nav_more: 'Plus',
    nav_learn_drive: 'Apprendre la stratégie DRIVE',
    nav_start_trading: 'Commencer à trader',
    nav_telegram: 'Telegram',
    nav_open_telegram: 'Ouvrir le Telegram KenneDyne spot',
    nav_close: 'Fermer',

    // Services / common CTAs
    view_details: 'Voir les détails',

    // DRIVE section
    drive_framework_title: 'Le cadre de la stratégie D.R.I.V.E',
    drive_acronym_full: 'Direction. Range. Point d’intérêt. Valeur du risque. Entrée.',
    drive_framework_description:
      'Une méthodologie systématique en 5 étapes qui transforme les traders particuliers en professionnels institutionnels.',
    explore_drive_playbook: 'Explorer le Playbook DRIVE',
    join_on_telegram: 'Rejoindre sur Telegram',

    // DRIVE steps
    drive_direction_title: 'Direction',
    drive_direction_desc: 'Apprenez à analyser la direction du marché sur plusieurs horizons (Mensuel, Hebdomadaire, Journalier).',
    drive_range_title: 'Range',
    drive_range_desc: 'Apprenez à définir des zones de range pour cibler les zones négociables.',
    drive_poi_title: 'Point d’intérêt (POI)',
    drive_poi_desc: 'Apprenez à aligner supports et résistances à travers les horizons temporels.',
    drive_value_of_risk_title: 'Valeur du risque',
    drive_value_of_risk_desc: 'Apprenez à appliquer des ratios risque/rendement structurés.',
    drive_entry_title: 'Entrée',
    drive_entry_desc: 'Apprenez à suivre des règles d’entrée structurées.',

    // How it Works extras
    create_exness_account: 'Créez votre compte Exness',
    key_benefits: 'Avantages clés :',
    your_success_story: 'Votre histoire de réussite commence ici',
    success_story_paragraph:
      'Rejoignez des milliers de traders qui ont transformé leur avenir financier grâce à notre méthodologie éprouvée.',
    free_setup: 'Mise en place 100% gratuite',
    proven_results: 'Résultats prouvés',

    // Risk disclaimer bar
    risk_notice_chip: 'Avertissement de risque',
    risk_notice_title: 'Avertissement de risque',
    risk_notice_message:
      "Le trading du Forex et des CFD comporte un risque élevé. Les performances passées ne garantissent pas les résultats futurs.",
    learn_more: 'En savoir plus',
    dismiss: 'Fermer',
  },
};
