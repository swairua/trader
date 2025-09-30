import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { generateFAQSchema } from "@/content/faqs";
import { driveFullName } from "@/content/drive";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { useI18n } from '@/i18n';
import FAQs from "./FAQs";

// Fallback schema
const fallbackFaqSchema = generateFAQSchema();

const FAQPageWithSEO = () => {
  const location = useLocation();
  const canonical = `https://institutional-trader.com${location.pathname}`;
  const [faqSchema, setFaqSchema] = useState(fallbackFaqSchema);
  const { language } = useI18n();

  useEffect(() => {
    const buildSchemaFromDB = async () => {
      try {
        const tryFetch = async (col?: string, val?: string) => {
          let query = supabase
            .from('faqs')
            .select('question, answer')
            .eq('published', true)
            .order('order_index', { ascending: true })
            .order('created_at', { ascending: true });
          if (col && val) query = query.eq(col as any, val);
          const { data, error } = await query;
          return { data, error } as { data: { question: string; answer: string }[] | null; error: any };
        };

        const attemptsPrimary = [
          { col: 'locale', val: language },
          { col: 'language', val: language },
          { col: 'lang', val: language },
          { col: undefined, val: undefined },
        ];

        let rows: { question: string; answer: string }[] | null = null;
        for (const a of attemptsPrimary) {
          const { data, error } = await tryFetch(a.col as any, a.val as any);
          if (error && typeof error.message === 'string' && error.message.includes('does not exist')) continue;
          if (data && data.length > 0) { rows = data; break; }
        }

        if ((!rows || rows.length === 0) && language !== 'en') {
          const attemptsFallback = [
            { col: 'locale', val: 'en' },
            { col: 'language', val: 'en' },
            { col: 'lang', val: 'en' },
            { col: undefined, val: undefined },
          ];
          for (const a of attemptsFallback) {
            const { data, error } = await tryFetch(a.col as any, a.val as any);
            if (error && typeof error.message === 'string' && error.message.includes('does not exist')) continue;
            if (data && data.length > 0) { rows = data; break; }
          }
        }

        if (rows && rows.length > 0) {
          const dynamicSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": rows.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
          };
          setFaqSchema(dynamicSchema);
        }
      } catch (error) {
        console.error('Error building FAQ schema from DB:', error);
        // Keep fallback schema
      }
    };

    buildSchemaFromDB();
  }, [language]);

  return (
    <>
      <SEOHead
        title="FAQs - KenneDyne spot | Trading Education Questions"
        description={`Get answers to frequently asked questions about our forex trading education, ${driveFullName} strategy, risk management, and mentorship programs. Learn about our educational approach.`}
        keywords="trading education FAQ, forex education questions, DRIVE strategy FAQ, Direction Range Interest Point Value Risk Entry, trading mentorship questions, risk management education"
        canonical={canonical}
        schema={faqSchema}
      />
      <FAQs />
    </>
  );
};

export default FAQPageWithSEO;
