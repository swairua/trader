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

    // WhyExnessSection
    why_exness_badge: 'Why Choose Exness?',
    why_exness_heading_prefix: 'Your Trading Success Starts with the',
    why_exness_heading_accent: 'Right Broker',
    why_exness_intro:
      'Join millions of traders worldwide who trust Exness for superior trading conditions, rock-solid regulation, and unmatched execution speed. Experience the premium difference.',
    why_exness_benefit1_title: 'Globally Regulated',
    why_exness_benefit1_desc:
      'Multi-jurisdiction authorization by recognized financial authorities including FCA (UK), CySEC (Cyprus), FSCA (South Africa), and FSC (Mauritius).',
    why_exness_benefit1_highlight: 'FCA & CySEC Regulated',
    why_exness_benefit2_title: 'Lightning-Fast Transfers',
    why_exness_benefit2_desc:
      'Experience instant deposits and withdrawals with multiple payment methods and zero withdrawal fees.',
    why_exness_benefit2_highlight: 'Instant Withdrawals',
    why_exness_benefit3_title: 'Market-Leading Conditions',
    why_exness_benefit3_desc:
      'Ultra-tight spreads from 0.0 pips, transparent pricing, and access to 200+ trading instruments across Forex, Metals, Indices, and Crypto.',
    why_exness_benefit3_highlight: 'From 0.0 Pip Spreads',
    why_exness_see_comparison: 'See Detailed Comparison',
    why_exness_hide_comparison: 'Hide Detailed Comparison',
    why_exness_table_feature: 'Feature',
    why_exness_table_others: 'Other Brokers',
    risk_disclaimer_label: 'Risk Disclaimer:',
    why_exness_risk_disclaimer:
      'Leverage varies by jurisdiction and regulation. High leverage increases both potential profits and risks. Trading involves substantial risk of loss and may not be suitable for all investors.',
    why_exness_cta_title: 'Ready to Experience the Difference?',
    why_exness_cta_subtitle:
      "Join the millions who've already discovered why Exness stands apart from the competition.",
    why_exness_cta_button: 'Start Your Trading Journey',
    why_exness_bullet_no_fees: 'No Hidden Fees',
    why_exness_bullet_instant_setup: 'Instant Setup',
    why_exness_bullet_premium_support: 'Premium Support',
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

    // WhyExnessSection
    why_exness_badge: 'Pourquoi choisir Exness ? ',
    why_exness_heading_prefix: 'Votre réussite en trading commence avec le',
    why_exness_heading_accent: 'bon courtier',
    why_exness_intro:
      "Rejoignez des millions de traders qui font confiance à Exness pour des conditions de trading supérieures, une réglementation solide et une exécution inégalée. Découvrez la différence premium.",
    why_exness_benefit1_title: 'Réglementation mondiale',
    why_exness_benefit1_desc:
      "Autorisation multi-juridiction par des autorités financières reconnues, notamment la FCA (Royaume-Uni), la CySEC (Chypre), la FSCA (Afrique du Sud) et la FSC (Maurice).",
    why_exness_benefit1_highlight: 'Réglementé par FCA & CySEC',
    why_exness_benefit2_title: 'Transferts ultra-rapides',
    why_exness_benefit2_desc:
      "Dépôts et retraits instantanés, multiples méthodes de paiement et aucuns frais de retrait.",
    why_exness_benefit2_highlight: 'Retraits instantanés',
    why_exness_benefit3_title: 'Conditions de marché leader',
    why_exness_benefit3_desc:
      "Spreads ultra-serrés à partir de 0,0 pip, tarification transparente et accès à plus de 200 instruments (Forex, Métaux, Indices, Crypto).",
    why_exness_benefit3_highlight: 'À partir de 0,0 pip',
    why_exness_see_comparison: 'Voir la comparaison détaillée',
    why_exness_hide_comparison: 'Masquer la comparaison détaillée',
    why_exness_table_feature: 'Caractéristique',
    why_exness_table_others: 'Autres courtiers',
    risk_disclaimer_label: 'Avertissement de risque :',
    why_exness_risk_disclaimer:
      "L'effet de levier varie selon la juridiction et la réglementation. Un levier élevé augmente à la fois les profits potentiels et les risques. Le trading comporte un risque important de perte et peut ne pas convenir à tous les investisseurs.",
    why_exness_cta_title: "Prêt à découvrir la différence ?",
    why_exness_cta_subtitle:
      "Rejoignez les millions de personnes qui ont déjà découvert pourquoi Exness se démarque de la concurrence.",
    why_exness_cta_button: 'Commencez votre parcours de trading',
    why_exness_bullet_no_fees: 'Aucun frais caché',
    why_exness_bullet_instant_setup: 'Configuration instantanée',
    why_exness_bullet_premium_support: 'Support premium',
  },
};
