import { useEffect, useState } from 'react';
import { getSiteContent, resetSiteContent, updateNavigationContent, type SiteContent } from '@/content/siteContent';

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(getSiteContent());

  // Mount-only effect to initialize content
  useEffect(() => {
    updateNavigationContent(); // Force update navigation from latest defaultContent
    setContent(getSiteContent());
  }, []); // Empty dependency array to run only on mount

  // Separate effect for SEO updates to prevent infinite loops
  useEffect(() => {
    const seo = content.seo;
    
    // Update document title
    const titleElement = document.getElementById('page-title');
    if (titleElement && titleElement.textContent !== seo.title) {
      titleElement.textContent = seo.title;
    } else if (!titleElement && document.title !== seo.title) {
      document.title = seo.title;
    }
    
    // Update meta description
    const descriptionElement = document.getElementById('page-description') as HTMLMetaElement;
    if (descriptionElement && descriptionElement.content !== seo.description) {
      descriptionElement.content = seo.description;
    }
    
    // Update meta keywords
    const keywordsElement = document.getElementById('page-keywords') as HTMLMetaElement;
    if (keywordsElement && keywordsElement.content !== seo.keywords) {
      keywordsElement.content = seo.keywords;
    }
  }, [content.seo.title, content.seo.description, content.seo.keywords]); // Only depend on actual SEO values

  const refreshContent = () => {
    resetSiteContent();
    setContent(getSiteContent());
  };

  return { content, refreshContent };
}