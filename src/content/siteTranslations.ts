import { SiteContent, defaultContent } from './siteContent';

export const siteTranslations: Record<'en'|'fr', Partial<SiteContent>> = {
  en: {},
  fr: {
    navigation: {
      brand: 'KenneDyne spot',
      links: [
        { name: 'Accueil', href: '/' },
        { name: 'Stratégie DRIVE', href: '/strategy' },
        { name: 'Services', href: '/services' },
        { name: 'Ressources', href: '/resources' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faqs' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    hero: {
      badge: 'FORMATION EN PREMIER LIEU',
      headline: 'Apprenez les concepts de trading institutionnel avec la stratégie <span class="text-primary">DRIVE</span>',
      subheadline: "Accédez à des ressources pédagogiques, une formation à l'analyse du marché et nos stratégies basées sur l'institution lorsque vous vous inscrivez auprès de notre courtier partenaire <a href=\"https://one.exnesstrack.org/a/17eqnrbs54\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"underline text-primary font-semibold\">exness</a>.",
      cta1: 'Commencer à apprendre',
      cta2: 'Voir comment DRIVE fonctionne',
      disclaimer: '',
      trustStrip: 'Méthodologie éprouvée | Éducation réelle | Pas de fausses promesses',
      trustIndicators: [
        { value: '5+', label: "Années d'expérience" },
        { value: 'Premium', label: 'Contenu' },
        { value: '10K+', label: 'Étudiants' }
      ]
    },
    services: {
      title: "Nos services d'éducation",
      subtitle: "Formation complète axée sur le développement de compétences réelles, pas de fausses promesses",
      items: [
        {
          title: "Formation à la stratégie DRIVE",
          description: "Apprenez notre approche systématique en 5 étapes pour l'analyse du marché et l'exécution des opérations avec une gestion des risques appropriée."
        },
        {
          title: "Mentorat 1-à-1",
          description: "Accompagnement personnalisé pour développer votre psychologie de trading, votre discipline et votre compréhension de la structure du marché."
        },
        {
          title: "Gestion des risques",
          description: "Maîtrisez le dimensionnement des positions, les stop loss et la protection du capital—la base d'un trading durable."
        }
      ]
    },
    transformCTA: {
      title: "Prêt à transformer votre trading?",
      subtitle: "Rejoignez des centaines de traders qui développent de vraies compétences grâce à une éducation systématique et des principes de gestion des risques.",
      stats: [
        { value: '500+', label: "Étudiants formés" },
        { value: '200+', label: "Leçons" },
        { value: '24/7', label: "Support éducatif" }
      ],
      button: { text: 'Commencer la formation', href: 'https://one.exnesstrack.org/a/17eqnrbs54' }
    },
    finalCTA: {
      title: "Prêt à apprendre le trading professionnel?",
      subtitle: "Commencez votre formation systématique avec des méthodes éprouvées et des attentes réalistes.",
      button: { text: 'Commencer l’apprentissage', href: 'https://t.me/KenneDynespot' },
      benefits: [
        "Approche axée sur l'éducation",
        "Parcours d'apprentissage structuré",
        "Méthodologie DRIVE complète",
        "Concentration sur la gestion des risques",
        "Support de mentorat continu"
      ]
    },
    newsletter: {
      title: "Notes hebdomadaires du marché",
      subtitle: "Configurations, erreurs que nous apprenons et listes de contrôle livrées dans votre boîte mail chaque dimanche",
      disclaimer: "Aperçus hebdomadaires. Pas de spam. Désabonnement possible à tout moment.",
      placeholder: "votre.email@exemple.com",
      button: "Recevoir les notes"
    },
    howItWorks: {
      title: "Comment ça marche",
      subtitle: "Commencez en quelques minutes et profitez d'avantages de niveau institutionnel entièrement gratuits.",
      steps: [
        {
          number: "1",
          title: "Inscrivez-vous chez Exness",
          description: "Cliquez sur notre bouton ci-dessous pour créer votre compte Exness gratuit via notre lien d'affiliation. Cela ne prend que 2 minutes. Complétez également la vérification d'identité et de résidence.",
          features: [
            "5 comptes investisseurs de détail (Std, Std cent, Zero & Pro)",
            "Dépôt minimum 10 USD",
            "200 Lots max",
            "1000 positions max",
            "Compte islamique",
            "1 : Levier illimité",
            "Frais de retrait ZERO",
            "Retrait instantané et divers moyens de paiement"
          ]
        },
        {
          number: "2",
          title: "Alimentez votre compte",
          description: "Effectuez votre premier dépôt pour activer votre compte. Choisissez le montant adapté à vos objectifs de capital de trading."
        },
        {
          number: "3",
          title: "Envoyez votre ID de compte",
          description: "Une fois inscrit, envoyez-nous votre identifiant Exness pour vérifier votre inscription et activer vos avantages."
        },
        {
          number: "4",
          title: "Débloquez tout gratuitement",
          description: "Recevez instantanément l'accès aux signaux premium, au mentorat 1-à-1 et à la formation complète sur la stratégie DRIVE."
        }
      ]
    },
    footer: {
      brand: "Éducation professionnelle en trading Smart Money",
      description: "Transformer les traders de détail en professionnels de niveau institutionnel grâce à des méthodologies éprouvées et du mentorat",
      phone: "+254 101 316 169",
      email: "info@institutionaltrader.ke",
      whatsappText: "Obtenir de l'aide",
      sections: undefined as any,
      services: undefined as any,
      socials: undefined as any,
      legalLinks: undefined as any,
      copyright: "© 2025 KenneDyne spot. Tous droits réservés.",
      designCredit: undefined as any,
      riskDisclaimer: "Le trading comporte des risques importants et n'est pas adapté à tous les investisseurs."
    },
    pages: {
      driveStrategy: {
        title: "La stratégie DRIVE",
        subtitle: "Notre approche systématique pour l'analyse du marché FX et les décisions de trading",
        content: "Apprenez notre méthodologie complète DRIVE pour une analyse cohérente du marché."
      },
      blog: undefined as any,
      faqs: undefined as any,
      contact: undefined as any
    }
  }
};

export function getLocalizedContent(baseContent: SiteContent, lang: 'en'|'fr'): SiteContent {
  if (lang === 'en') return baseContent;
  const overrides = siteTranslations.fr as Partial<SiteContent>;
  // Deep merge selectively for known fields to avoid losing data
  const merged: SiteContent = {
    ...baseContent,
    navigation: overrides.navigation || baseContent.navigation,
    hero: overrides.hero || baseContent.hero,
    services: overrides.services || baseContent.services,
    transformCTA: overrides.transformCTA || baseContent.transformCTA,
    finalCTA: overrides.finalCTA || baseContent.finalCTA,
    newsletter: overrides.newsletter || baseContent.newsletter,
    footer: {
      ...baseContent.footer,
      ...(overrides.footer || {})
    },
    pages: {
      ...baseContent.pages,
      ...(overrides.pages || {})
    }
  };

  return merged;
}
