import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Calendar, Clock, User, Tag, ArrowLeft, ArrowRight, Star, Loader2, AlertCircle } from 'lucide-react';
import { SEOHead } from '@/components/SEOHead';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { SectionDivider } from '@/components/SectionDivider';
import { useI18n } from '@/i18n';
import { translateText } from '@/utils/translationService';
import { format } from 'date-fns';
import { fr as frLocale, enUS } from 'date-fns/locale';
import forexBlogHero from '@/assets/forex-blog-hero.jpg';
import { useAutoTranslate } from '@/hooks/useAutoTranslate';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image_url?: string;
  published_at: string;
  reading_time_mins: number;
  featured: boolean;
  authors?: { name: string; slug: string }[];
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
  slug: string;
}

const POSTS_PER_PAGE = 12;

export default function BlogPublic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [originalPosts, setOriginalPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [localizedCategories, setLocalizedCategories] = useState<Category[]>([]);
  const [localizedTags, setLocalizedTags] = useState<Tag[]>([]);
  const [localizedAuthors, setLocalizedAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);
  const [newsletterResult, setNewsletterResult] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const page = parseInt(searchParams.get('page') || '1', 10);
  const searchTerm = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('category') || '';
  const tagFilter = searchParams.get('tag') || '';
  const authorFilter = searchParams.get('author') || '';

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    
    // Reset to page 1 when filters change
    if ('page' in updates === false) {
      newParams.delete('page');
    }
    
    setSearchParams(newParams);
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image_url,
          published_at,
          reading_time_mins,
          featured,
          post_authors (
            authors (name, slug)
          ),
          post_categories (
            categories (name, slug)
          ),
          post_tags (
            tags (name, slug)
          )
        `, { count: 'exact' })
        .eq('published', true)
        .or('published_at.is.null,published_at.lte.' + new Date().toISOString())
        .order('featured', { ascending: false })
        .order('published_at', { ascending: false });

      // Apply filters
      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%`);
      }

      // For complex filtering with relationships, we'll fetch all and filter client-side for MVP
      const { data: allPosts, error, count } = await query;
      
      if (error) throw error;

      // Transform posts
      let filteredPosts = allPosts?.map(post => ({
        ...post,
        authors: post.post_authors?.map((pa: any) => pa.authors) || [],
        categories: post.post_categories?.map((pc: any) => pc.categories) || [],
        tags: post.post_tags?.map((pt: any) => pt.tags) || []
      })) || [];

      // Preserve original posts (untranslated) to allow reverting when language changes
      setOriginalPosts(filteredPosts);

      // Translate relationship names (categories, tags, authors) on the fly
      try {
        if (language && language !== 'en' && filteredPosts.length > 0) {
          // collect unique names to avoid duplicate translations
          const uniqueCatNames = Array.from(new Set(filteredPosts.flatMap(p => (p.categories || []).map((c: any) => c.name))));
          const uniqueTagNames = Array.from(new Set(filteredPosts.flatMap(p => (p.tags || []).map((t: any) => t.name))));
          const uniqueAuthorNames = Array.from(new Set(filteredPosts.flatMap(p => (p.authors || []).map((a: any) => a.name))));

          const [translatedCats, translatedTags, translatedAuthors] = await Promise.all([
            Promise.all(uniqueCatNames.map(n => translateText(n, language))).catch(() => []),
            Promise.all(uniqueTagNames.map(n => translateText(n, language))).catch(() => []),
            Promise.all(uniqueAuthorNames.map(n => translateText(n, language))).catch(() => []),
          ]);

          const catMap = new Map(uniqueCatNames.map((n, i) => [n, translatedCats[i] || n]));
          const tagMap = new Map(uniqueTagNames.map((n, i) => [n, translatedTags[i] || n]));
          const authorMap = new Map(uniqueAuthorNames.map((n, i) => [n, translatedAuthors[i] || n]));

          filteredPosts = filteredPosts.map(p => ({
            ...p,
            categories: (p.categories || []).map((c: any) => ({ ...c, name: catMap.get(c.name) || c.name })),
            tags: (p.tags || []).map((t: any) => ({ ...t, name: tagMap.get(t.name) || t.name })),
            authors: (p.authors || []).map((a: any) => ({ ...a, name: authorMap.get(a.name) || a.name })),
          }));
        }
      } catch (e) {
        // ignore translation failures for posts
      }

      // Client-side filtering for relationships
      if (categoryFilter) {
        filteredPosts = filteredPosts.filter(post => 
          post.categories.some(cat => cat.slug === categoryFilter)
        );
      }

      if (tagFilter) {
        filteredPosts = filteredPosts.filter(post => 
          post.tags.some(tag => tag.slug === tagFilter)
        );
      }

      if (authorFilter) {
        filteredPosts = filteredPosts.filter(post => 
          post.authors.some(author => author.slug === authorFilter)
        );
      }

      // Pagination
      const startIndex = (page - 1) * POSTS_PER_PAGE;
      const endIndex = startIndex + POSTS_PER_PAGE;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

      setPosts(paginatedPosts);
      setTotalPosts(filteredPosts.length);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaxonomy = async () => {
    try {
      const [categoriesRes, tagsRes, authorsRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('tags').select('*').order('name'),
        supabase.from('authors').select('*').order('name')
      ]);

      const cats = categoriesRes.data || [];
      const tgs = tagsRes.data || [];
      const auths = authorsRes.data || [];

      if (cats) setCategories(cats);
      if (tgs) setTags(tgs);
      if (auths) setAuthors(auths);

      // Translate taxonomy names on the fly if needed
      try {
        if (language && language !== 'en') {
          const [translatedCats, translatedTags, translatedAuthors] = await Promise.all([
            Promise.all(cats.map((c: Category) => translateText(c.name, language))).catch(() => []),
            Promise.all(tgs.map((tg: Tag) => translateText(tg.name, language))).catch(() => []),
            Promise.all(auths.map((a: Author) => translateText(a.name, language))).catch(() => []),
          ]);

          setLocalizedCategories(cats.map((c: Category, i: number) => ({ ...c, name: translatedCats[i] || c.name })));
          setLocalizedTags(tgs.map((tg: Tag, i: number) => ({ ...tg, name: translatedTags[i] || tg.name })));
          setLocalizedAuthors(auths.map((a: Author, i: number) => ({ ...a, name: translatedAuthors[i] || a.name })));
        } else {
          setLocalizedCategories(cats);
          setLocalizedTags(tgs);
          setLocalizedAuthors(auths);
        }
      } catch (e) {
        // Fallback to original data if translation fails
        setLocalizedCategories(cats);
        setLocalizedTags(tgs);
        setLocalizedAuthors(auths);
      }
    } catch (error) {
      console.error('Error fetching taxonomy:', error);
    }
  };

  useEffect(() => {
    fetchTaxonomy();
  }, []);

  // Re-translate taxonomy when language or original taxonomy changes
  useEffect(() => {
    const retranslate = async () => {
      try {
        if (!categories || categories.length === 0) {
          setLocalizedCategories([]);
        }
        if (!tags || tags.length === 0) {
          setLocalizedTags([]);
        }
        if (!authors || authors.length === 0) {
          setLocalizedAuthors([]);
        }

        if (language && language !== 'en') {
          const [translatedCats, translatedTags, translatedAuthors] = await Promise.all([
            Promise.all((categories || []).map((c: Category) => translateText(c.name, language))).catch(() => []),
            Promise.all((tags || []).map((tg: Tag) => translateText(tg.name, language))).catch(() => []),
            Promise.all((authors || []).map((a: Author) => translateText(a.name, language))).catch(() => []),
          ]);

          setLocalizedCategories((categories || []).map((c: Category, i: number) => ({ ...c, name: translatedCats[i] || c.name })));
          setLocalizedTags((tags || []).map((tg: Tag, i: number) => ({ ...tg, name: translatedTags[i] || tg.name })));
          setLocalizedAuthors((authors || []).map((a: Author, i: number) => ({ ...a, name: translatedAuthors[i] || a.name })));
        } else {
          setLocalizedCategories(categories || []);
          setLocalizedTags(tags || []);
          setLocalizedAuthors(authors || []);
        }
      } catch (e) {
        setLocalizedCategories(categories || []);
        setLocalizedTags(tags || []);
        setLocalizedAuthors(authors || []);
      }
    };
    retranslate();
  }, [language, categories, tags, authors]);

  // Re-translate post relationship names when language or posts change
  useEffect(() => {
    const retranslatePosts = async () => {
      try {
        if (!originalPosts || originalPosts.length === 0) return;
    // If target is english, restore originals
    if (!language || language === 'en') {
      setPosts(originalPosts);
      return; // nothing else to do
    }
    // Avoid re-translating if already translated for this language
    if (originalPosts.some(p => (p as any)._translatedForLanguage === language)) return;

    const uniqueCatNames = Array.from(new Set(originalPosts.flatMap(p => (p.categories || []).map((c: any) => c.name))));
    const uniqueTagNames = Array.from(new Set(originalPosts.flatMap(p => (p.tags || []).map((t: any) => t.name))));
    const uniqueAuthorNames = Array.from(new Set(originalPosts.flatMap(p => (p.authors || []).map((a: any) => a.name))));

        const [translatedCats, translatedTags, translatedAuthors] = await Promise.all([
          Promise.all(uniqueCatNames.map(n => translateText(n, language))).catch(() => []),
          Promise.all(uniqueTagNames.map(n => translateText(n, language))).catch(() => []),
          Promise.all(uniqueAuthorNames.map(n => translateText(n, language))).catch(() => []),
        ]);

        const catMap = new Map(uniqueCatNames.map((n, i) => [n, translatedCats[i] || n]));
        const tagMap = new Map(uniqueTagNames.map((n, i) => [n, translatedTags[i] || n]));
        const authorMap = new Map(uniqueAuthorNames.map((n, i) => [n, translatedAuthors[i] || n]));

        setPosts(prev => prev.map(p => ({
          ...p,
          categories: (p.categories || []).map((c: any) => ({ ...c, name: catMap.get(c.name) || c.name })),
          tags: (p.tags || []).map((t: any) => ({ ...t, name: tagMap.get(t.name) || t.name })),
          authors: (p.authors || []).map((a: any) => ({ ...a, name: authorMap.get(a.name) || a.name })),
          _translatedForLanguage: language,
        })));
      } catch (e) {
        // ignore
      }
    };
    retranslatePosts();
  }, [language, posts]);

  useEffect(() => {
    fetchPosts();
  }, [page, searchTerm, categoryFilter, tagFilter, authorFilter]);

  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  const regularPosts = posts.filter(post => !post.featured);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || !email.includes('@')) {
      setNewsletterResult({ type: 'error', message: t('strategy_error_invalid_email') });
      return;
    }
    setNewsletterSubmitting(true);
    setNewsletterResult({ type: null, message: '' });
    try {
      const { data, error } = await supabase.functions.invoke('submit-newsletter-subscription', {
        body: { email, source_url: window.location.href },
      });
      if (error) throw error;
      if (data?.success) {
        setNewsletterResult({ type: 'success', message: t('newsletter_success') });
        setNewsletterEmail('');
      } else {
        setNewsletterResult({ type: 'error', message: t('newsletter_unexpected') });
      }
    } catch (err) {
      console.error('Newsletter subscription failed:', err);
      setNewsletterResult({ type: 'error', message: t('newsletter_failed') });
    } finally {
      setNewsletterSubmitting(false);
    }
  };

  // useI18n hook
  const { t, language } = useI18n();
  const { translatedMap, isTranslating: blogIsTranslating, totalToTranslate: blogTotal, translatedCount: blogTranslatedCount, translationError: blogTranslationError, retry: retryBlogTranslations } = useAutoTranslate(posts, ['title','excerpt']);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={t('blog_hero_title')}
        description={t('blog_hero_subtitle')}
        canonical="/blog"
        ogImage="/og/og-default.jpg"
      />
      
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 hero-image">
            <img 
              src={forexBlogHero} 
              alt={t('blog_hero_image_alt')} 
              className="w-full h-full object-cover"
              loading="eager"
              width={1920}
              height={1080}
              
              onError={(e) => {
                console.warn('Hero image failed to load');
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-hero-premium grain-texture"></div>
          <div className="container px-4 relative z-20 on-hero">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="fluid-h1 text-white mb-6">{t('blog_hero_title')}</h1>
              <p className="text-hero-body mb-8 max-w-3xl mx-auto">{t('blog_hero_subtitle')}</p>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 max-w-2xl mx-auto">
                <p className="text-sm">
                  <strong>{t('blog_educational_note')}</strong> {t('blog_educational_note_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-20">

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('resources_search_placeholder')}
                  value={searchTerm}
                  onChange={(e) => updateSearchParams({ search: e.target.value })}
                  className="pl-10"
                />
              </div>
              
              <Select 
                value={categoryFilter} 
                onValueChange={(value) => updateSearchParams({ category: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('blog_all_categories')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('blog_all_categories')}</SelectItem>
                  {localizedCategories.map(category => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={tagFilter} 
                onValueChange={(value) => updateSearchParams({ tag: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('blog_all_tags')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('blog_all_tags')}</SelectItem>
                  {localizedTags.map(tag => (
                    <SelectItem key={tag.id} value={tag.slug}>
                      {tag.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select 
                value={authorFilter} 
                onValueChange={(value) => updateSearchParams({ author: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('blog_all_authors')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('blog_all_authors')}</SelectItem>
                  {localizedAuthors.map(author => (
                    <SelectItem key={author.id} value={author.slug}>
                      {author.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                onClick={() => updateSearchParams({
                  search: null,
                  category: null,
                  tag: null,
                  author: null
                })}
              >
                {t('resources_clear_filters')}
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && page === 1 && !searchTerm && !categoryFilter && !tagFilter && !authorFilter && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <h2 className="text-2xl font-bold">{t('blog_featured_title')}</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={`${t('blog_article_image_alt')}: ${translatedMap[post.id]?.title ?? post.title}` }
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <div className="text-4xl font-bold text-primary/30">
                              {post.title.charAt(0)}
                            </div>
                          </div>
                        )}
                        <Badge className="absolute top-3 left-3 bg-yellow-500 text-yellow-900">
                          <Star className="h-3 w-3 mr-1" />
                          {t('blog_featured_title')}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold line-clamp-2">
                            <Link
                              to={`/blog/${post.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {translatedMap[post.id]?.title ?? post.title}
                            </Link>
                          </h3>
                          
                          {post.excerpt && (
                            <p className="text-muted-foreground line-clamp-3">
                              {translatedMap[post.id]?.excerpt ?? post.excerpt}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(post.published_at), 'PPP', { locale: language === 'fr' ? frLocale : enUS })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.reading_time_mins} {t('reading_time_read')}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {post.categories.slice(0, 2).map((category) => (
                              <Badge key={category.slug} variant="secondary" className="text-xs">
                                {category.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Separator className="mt-12" />
              </div>
            )}

            {/* Regular Posts */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {featuredPosts.length > 0 && page === 1 ? t('blog_latest_posts') : t('blog_all_posts')}
                </h2>
                <p className="text-muted-foreground">
                  {totalPosts} {t('blog_posts_found')}
                </p>
              </div>

              {regularPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularPosts.map((post) => (
                    <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={`${t('blog_article_image_alt')}: ${translatedMap[post.id]?.title ?? post.title}` }
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                            <div className="text-4xl font-bold text-primary/30">
                              {post.title.charAt(0)}
                            </div>
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold line-clamp-2">
                            <Link
                              to={`/blog/${post.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {translatedMap[post.id]?.title ?? post.title}
                            </Link>
                          </h3>
                          
                          {post.excerpt && (
                            <p className="text-muted-foreground line-clamp-2 text-sm">
                              {translatedMap[post.id]?.excerpt ?? post.excerpt}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(post.published_at), 'PP', { locale: language === 'fr' ? frLocale : enUS })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.reading_time_mins} {t('reading_time_min')}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {post.categories.slice(0, 2).map((category) => (
                              <Badge key={category.slug} variant="outline" className="text-xs">
                                {category.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {t('blog_no_posts')}
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => updateSearchParams({ 
                      search: null, 
                      category: null, 
                      tag: null, 
                      author: null 
                    })}
                  >
                    {t('blog_clear_all_filters')}
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => updateSearchParams({ page: (page - 1).toString() })}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('blog_previous')}
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateSearchParams({ page: pageNum.toString() })}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => updateSearchParams({ page: (page + 1).toString() })}
                  >
                    {t('blog_next')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
        </div>

        <SectionDivider variant="wave" className="text-muted" />
        
        {/* Newsletter CTA */}
        <section className="py-20 near-footer-contrast grain-texture">
          <div className="container px-4 relative z-10 pointer-events-auto">
            <div className="max-w-4xl mx-auto text-center pointer-events-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {t('newsletter_title')}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t('newsletter_subtitle')}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pointer-events-auto">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('newsletter_email_placeholder')}
                  className="flex-1 pointer-events-auto"
                  required
                />
                <Button type="submit" variant="hero" className="px-6 py-2 pointer-events-auto" disabled={newsletterSubmitting}>
                  {newsletterSubmitting ? t('newsletter_subscribing') : t('newsletter_subscribe')}
                </Button>
              </form>
              {newsletterResult.type && (
                <p className={`text-sm mt-4 ${newsletterResult.type === 'success' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`} aria-live="polite">
                  {newsletterResult.message}
                </p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                {t('newsletter_note')}
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
