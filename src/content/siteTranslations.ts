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
      subtitle: "Rejoignez des centaines de traders qui développent de vraies compétences grâce à une éducation syst��matique et des principes de gestion des risques.",
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
    resources: {
      courses: [
        {
          id: "1",
          title: "Fondamentaux du trading DRIVE",
          description: "Maîtrisez les principes fondamentaux de la stratégie DRIVE avec notre cours d'initiation complet.",
          level: "Beginner" as const,
          tags: ["DRIVE", "Trading", "Fondamentaux"],
          coverImage: "/lovable-uploads/trading-strategy.jpg",
          url: "/courses/drive-fundamentals",
          slug: "drive-fundamentals",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      ebooks: [
        {
          id: "1",
          title: "Essentiels de la gestion des risques",
          description: "Guide complet pour protéger votre capital et gérer le risque dans le trading forex.",
          author: "KenneDyne spot",
          pages: 45,
          tags: ["Gestion des risques", "Protection du capital"],
          coverImage: "/lovable-uploads/risk-management.jpg",
          downloadUrl: "/downloads/risk-management-essentials.pdf",
          slug: "risk-management-essentials",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      materials: [
        {
          id: "1",
          title: "Aide-mémoire Psychologie du marché",
          description: "Guide de référence rapide pour comprendre la psychologie du marché et les comportements des traders.",
          type: "sheet" as const,
          topic: "Psychologie",
          level: "Intermediate" as const,
          tags: ["Psychologie", "Référence", "Guide rapide"],
          coverImage: "/lovable-uploads/market-psychology.jpg",
          url: "/materials/market-psychology-sheet.pdf",
          slug: "market-psychology-cheat-sheet",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]
    },
    testimonials: {
      title: "Ce que disent les apprenants",
      subtitle: "Retours de notre communauté d'apprenants dévoués",
      items: [
        {
          name: "James M.",
          role: "Nairobi, Kenya",
          content: "Les leçons structurées m'ont aidé à mieux comprendre les concepts de trading. Les séances de mentorat ont expliqué le raisonnement derrière différents setups de marché.",
          rating: 5,
          initials: "JM"
        },
        {
          name: "Lerato P.",
          role: "Johannesburg, Afrique du Sud",
          content: "Faire partie de la communauté Traders in the Zone me motive. Les discussions favorisent la collaboration et l'apprentissage partagé.",
          rating: 5,
          initials: "LP"
        },
        {
          name: "Emeka O.",
          role: "Lagos, Nigéria",
          content: "J'apprécie l'équilibre entre accompagnement et éducation. Cela m'aide à gagner en confiance pour développer ma propre approche de trading.",
          rating: 5,
          initials: "EO"
        }
      ],
      disclaimer: "Ces témoignages reflètent des expériences d’apprentissage individuelles. Les résultats de trading varient et les performances passées ne garantissent pas les résultats futurs."
    },
    blogPreview: {
      title: "Blog d'éducation au trading",
      subtitle: "Aperçus pédagogiques, analyses de marché et connaissances pratiques pour vous aider à développer des habitudes de trading disciplinées",
      posts: [
        {
          title: "Comprendre la structure du marché : Guide pour débutants",
          excerpt: "Découvrez les fondamentaux de la structure du marché et comment les traders institutionnels perçoivent les mouvements de prix.",
          image: "/lovable-uploads/trading-strategy.jpg",
          imageAlt: "Trader professionnel analysant les graphiques en utilisant la stratégie DRIVE",
          slug: "drive-strategy-framework",
          category: "Stratégie",
          readTime: 5,
          level: "Débutant"
        },
        {
          title: "Gestion des risques : Fondation du trading réussi",
          excerpt: "Pourquoi la gestion des risques est plus importante que la recherche du setup parfait. Découvrez comment calculer la taille des positions.",
          image: "/lovable-uploads/risk-management.jpg",
          imageAlt: "Tableau de gestion des risques montrant le dimensionnement des positions",
          slug: "risk-management-basics",
          category: "Gestion des risques",
          readTime: 7,
          level: "Essentiel"
        },
        {
          title: "La psychologie du trading : Surmonter les pièges mentaux courants",
          excerpt: "Comment développer la discipline et l'état d'esprit nécessaires pour une performance de trading cohérente.",
          image: "/lovable-uploads/market-psychology.jpg",
          imageAlt: "Espace de travail de trading professionnel démontrant la psychologie disciplinée",
          slug: "trading-psychology-discipline",
          category: "Psychologie",
          readTime: 6,
          level: "Intermédiaire"
        }
      ],
      categories: ["Tous", "Stratégie", "Gestion des risques", "Psychologie"]
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
            "5 comptes (Standard, Cent, Zero, Pro)",
            "Dépôt min. 10 USD",
            "Jusqu’à 200 lots",
            "Jusqu’à 1 000 positions",
            "Compte islamique disponible",
            "Levier illimité",
            "Frais de retrait zéro",
            "Retraits instantanés, nombreux moyens de paiement"
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
          title: "D��bloquez tout gratuitement",
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
      services: {
        title: "Services",
        items: [
          "Signaux premium quotidiens",
          "Mentorat individuel",
          "Formation à la stratégie DRIVE"
        ]
      },
      sections: [
        {
          title: "Éducation",
          links: [
            { name: "Stratégie DRIVE", href: "/strategy" },
            { name: "Gestion des risques", href: "/blog" },
            { name: "Psychologie du trading", href: "/blog" },
            { name: "Analyse de marché", href: "/blog" }
          ]
        },
        {
          title: "Support",
          links: [
            { name: "FAQ", href: "/faqs" },
            { name: "Contactez-nous", href: "/contact" },
            { name: "Mentorat", href: "/contact" },
            { name: "Communauté", href: "/contact" }
          ]
        },
        {
          title: "Entreprise",
          links: [
            { name: "À propos", href: "/about" },
            { name: "Notre approche", href: "/strategy" },
            { name: "Témoignages", href: "/#testimonials" },
            { name: "Blog", href: "/blog" }
          ]
        }
      ],
      legalLinks: [
        { name: "Politique de confidentialité", href: "/privacy-policy" },
        { name: "Conditions d'utilisation", href: "/terms-of-use" },
        { name: "Avertissement sur les risques", href: "/risk-disclaimer" },
        { name: "Divulgation d'affiliation", href: "/affiliate-disclosure" }
      ],
      designCredit: { text: "Conception : Zira Technologies", url: "https://www.zira-tech.com" },
      copyright: "© 2025 KenneDyne spot. Tous droits réservés.",
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
    howItWorks: overrides.howItWorks || baseContent.howItWorks,
    testimonials: overrides.testimonials || baseContent.testimonials,
    blogPreview: overrides.blogPreview || baseContent.blogPreview,
    resources: overrides.resources || baseContent.resources,
    transformCTA: overrides.transformCTA || baseContent.transformCTA,
    finalCTA: overrides.finalCTA || baseContent.finalCTA,
    newsletter: overrides.newsletter || baseContent.newsletter,
    seo: overrides.seo || baseContent.seo,
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
