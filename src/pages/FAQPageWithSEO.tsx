import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { generateFAQSchema } from "@/content/faqs";
import { driveFullName } from "@/content/drive";
import { supabase } from "@/integrations/supabase/client";
import FAQs from "./FAQs";

// Fallback schema
const fallbackFaqSchema = generateFAQSchema();

const FAQPageWithSEO = () => {
  const location = useLocation();
  const canonical = `https://institutional-trader.com${location.pathname}`;
  const [faqSchema, setFaqSchema] = useState(fallbackFaqSchema);

  useEffect(() => {
    const buildSchemaFromDB = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('question, answer')
          .eq('published', true)
          .order('order_index', { ascending: true })
          .order('created_at', { ascending: true });

        if (error) throw error;

        if (data && data.length > 0) {
          const dynamicSchema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": data.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
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
  }, []);

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
