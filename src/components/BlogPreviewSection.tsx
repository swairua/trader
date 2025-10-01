import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteContent } from "@/hooks/useSiteContent";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url?: string;
  image?: string;
  imageAlt?: string;
  reading_time_mins?: number;
  readTime?: string | number;
  published_at?: string;
  authors?: { name: string }[];
  categories?: { name: string }[];
  level?: string;
  category?: string;
}

export function BlogPreviewSection() {
  const { content } = useSiteContent();
  const { t } = useI18n();
  const { title: contentTitle, subtitle: contentSubtitle } = content.blogPreview;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          excerpt,
          featured_image_url,
          reading_time_mins,
          published_at,
          post_authors(
            authors(name)
          ),
          post_categories(
            categories(name)
          )
        `)
        .eq('published', true)
        .or('published_at.is.null,published_at.lte.' + new Date().toISOString())
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const formattedPosts = data?.map(post => ({
        ...post,
        authors: post.post_authors?.map((pa: any) => pa.authors) || [],
        categories: post.post_categories?.map((pc: any) => pc.categories) || []
      })) || [];

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // Use static fallback data if needed
      const staticPosts = content.blogPreview.posts || [];
      setPosts(staticPosts);
    } finally {
      setLoading(false);
    }
  };

  const displayPosts = posts.length > 0 ? posts : content.blogPreview.posts;

  return (
    <section className="py-16 lg:py-18 bg-background" aria-labelledby="blog-section-heading">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16">
            <h2 id="blog-section-heading" className="fluid-h2 text-foreground mb-4">
              {title}
            </h2>
            <p className="fluid-body text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="overflow-hidden border border-border/50 h-full">
                    <div className="aspect-video bg-muted"></div>
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-muted rounded"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))
            ) : (
              displayPosts.map((post, index) => (
              <article key={index} className="group">
                <Card className="overflow-hidden border border-border/50 hover:shadow-elevation transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                  <Link to={`/blog/${post.slug}`} className="flex-1 flex flex-col" aria-label={`Read article: ${post.title}`}>
                     <div className="aspect-video relative overflow-hidden">
                       <img 
                         src={post.featured_image_url || post.image || '/lovable-uploads/trading-strategy.jpg'} 
                         alt={post.imageAlt || `Professional trading education article: ${post.title}`}
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         loading="lazy"
                         decoding="async"
                         width={400}
                         height={225}
                       />
                      <div className="absolute inset-x-0 bottom-0 h-4/5 sm:h-2/3 lg:h-1/2 bg-gradient-to-t from-black/85 via-black/55 to-transparent pointer-events-none" aria-hidden="true" />
                      
                       <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                         {(post.reading_time_mins || post.readTime) && (
                           <div className="glass-card px-3 py-1 text-sm text-white/90 flex items-center gap-1" aria-hidden="true">
                             <Clock className="w-3 h-3" />
                             {post.reading_time_mins ? `${post.reading_time_mins} min read` : post.readTime}
                           </div>
                         )}
                         {(post.categories?.[0]?.name || post.level) && (
                           <div className="glass-card px-3 py-1 text-sm text-white/90 flex items-center gap-1" aria-hidden="true">
                             <User className="w-3 h-3" />
                             {post.categories?.[0]?.name || post.level}
                           </div>
                         )}
                       </div>
                      
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2 group-hover:text-primary-glow transition-colors leading-tight text-shadow-hero">
                          {post.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="inline-flex items-center justify-center gap-2 text-primary font-medium group-hover:text-primary-hover transition-colors">
                        <span className="sr-only">Read full article: {post.title}</span>
                        <span aria-hidden="true">Read Article</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                  </Link>
                </Card>
               </article>
             ))
            )}
           </div>
        </div>
      </div>
    </section>
  );
}
