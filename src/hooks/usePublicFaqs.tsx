import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  created_at: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: string;
}

interface UsePublicFaqsReturn {
  faqs: FAQ[];
  categories: FAQCategory[];
  loading: boolean;
  error: string | null;
}

export const usePublicFaqs = (language?: string): UsePublicFaqsReturn => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to filter by possible language columns; gracefully fallback if column doesn't exist
        const tryFetch = async (col?: string, val?: string) => {
          let query = supabase
            .from('faqs')
            .select('*')
            .eq('published', true)
            .order('order_index', { ascending: true })
            .order('created_at', { ascending: true });
          if (col && val) query = query.eq(col as any, val);
          const { data, error } = await query;
          return { data: (data as FAQ[] | null) ?? null, error };
        };

        // Primary attempt: requested language
        const attemptsPrimary = [
          { col: 'locale', val: language },
          { col: 'language', val: language },
          { col: 'lang', val: language },
          { col: undefined, val: undefined },
        ];

        let result: FAQ[] | null = null;
        for (const a of attemptsPrimary) {
          const { data, error } = await tryFetch(a.col as any, a.val as any);
          if (error && typeof error.message === 'string' && error.message.includes('column') && error.message.includes('does not exist')) {
            continue;
          }
          if (data && data.length > 0) {
            result = data;
            break;
          }
          if (!error && data && data.length === 0) {
            // try next
            continue;
          }
        }

        // Fallback: English if none found for current language
        if ((!result || result.length === 0) && language !== 'en') {
          const attemptsFallback = [
            { col: 'locale', val: 'en' },
            { col: 'language', val: 'en' },
            { col: 'lang', val: 'en' },
            { col: undefined, val: undefined },
          ];
          for (const a of attemptsFallback) {
            const { data, error } = await tryFetch(a.col as any, a.val as any);
            if (error && typeof error.message === 'string' && error.message.includes('column') && error.message.includes('does not exist')) {
              continue;
            }
            if (data && data.length > 0) {
              result = data;
              break;
            }
          }
        }

        const faqsData = result ?? [];
        setFaqs(faqsData);

        // Extract unique categories and create category objects with URL-safe slugs
        const uniqueCategories = [...new Set(faqsData.map(faq => faq.category).filter(Boolean))];
        const categoryObjects: FAQCategory[] = uniqueCategories.map(cat => ({
          id: normalizeToSlug(cat),
          label: cat,
          icon: getCategoryIcon(cat)
        }));

        setCategories(categoryObjects);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [language]);

  return { faqs, categories, loading, error };
};

// Helper function to normalize category names to URL-safe slugs
const normalizeToSlug = (category: string): string => {
  return category.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to get icons for categories
const getCategoryIcon = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'general': 'HelpCircle',
    'strategy': 'Target', 
    'education': 'BookOpen',
    'risk & legal': 'Shield',
    'support': 'MessageCircle',
    'trading': 'TrendingUp',
    'account': 'User',
    'technical': 'Settings',
    'psychology': 'User',
    'risk management': 'Shield'
  };

  const key = category.toLowerCase();
  return categoryMap[key] || 'HelpCircle';
};
