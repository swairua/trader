import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLocation, Link } from "react-router-dom";
import { Fragment } from "react";
import { createBreadcrumbSchema } from "@/utils/seoHelpers";
import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/strategy': 'Strategy',
  '/services': 'Services', 
  '/services/learn': 'Learn',
  '/mentorship': 'Mentorship',
  '/placement-quiz': 'Placement Quiz',
  '/blog': 'Blog',
  '/faqs': 'FAQs',
  '/contact': 'Contact',
  '/resources': 'Resources',
  '/lp/drive-education': 'Drive Education',
  
  '/privacy-policy': 'Privacy Policy',
  '/terms-of-use': 'Terms of Use',
  '/risk-disclaimer': 'Risk Disclaimer',
  '/affiliate-disclosure': 'Affiliate Disclosure'
};

export function BreadcrumbNavigation() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on home page or admin routes
  if (location.pathname === '/' || location.pathname.startsWith('/admin')) {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Special handling for course pages - virtually nest them under Resources
  if (location.pathname.startsWith('/courses/')) {
    breadcrumbItems.push(
      { label: 'Resources', href: '/resources' },
      { label: 'Courses', href: '/resources#courses' }
    );
    
    // Add the course name as the final breadcrumb
    const courseSlug = pathSegments[1];
    const courseName = courseSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    breadcrumbItems.push({
      label: courseName,
      href: undefined // Current page, no link
    });
  } else {
    // Regular breadcrumb generation for other pages
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbItems.push({
        label,
        href: index === pathSegments.length - 1 ? undefined : currentPath
      });
    });
  }

  // Create schema for SEO
  const schemaItems = breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? `${window.location.origin}${item.href}` : window.location.href
  }));

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(createBreadcrumbSchema(schemaItems))}
        </script>
      </Helmet>
      
      <nav aria-label="Breadcrumb" className="py-4">
        <div className="container px-4">
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <Fragment key={item.label}>
                  <BreadcrumbItem>
                    {item.href ? (
                      <BreadcrumbLink asChild>
                        <Link to={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>
    </>
  );
}