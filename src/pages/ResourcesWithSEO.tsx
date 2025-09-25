import { Helmet } from 'react-helmet-async';
import Resources from './Resources';
import { StructuredData } from '@/components/StructuredData';
import { createBreadcrumbSchema } from '@/utils/seoHelpers';

export default function ResourcesWithSEO() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://institutional-trader.com/" },
    { name: "Resources", url: "https://institutional-trader.com/resources" }
  ]);

  return (
    <>
      <Helmet>
        <title>Resources — Courses, E‑books & Learning Materials | KenneDyne spot</title>
        <meta 
          name="description" 
          content="Access comprehensive forex trading courses, e-books, and educational materials. Learn the DRIVE strategy, risk management, market psychology, and professional trading techniques."
        />
        <meta 
          name="keywords" 
          content="forex courses, trading education, e-books, learning materials, DRIVE strategy, risk management, market psychology, trading resources, institutional trading"
        />
        <link rel="canonical" href="https://institutional-trader.com/resources" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Trading Education Resources | KenneDyne spot" />
        <meta property="og:description" content="Comprehensive library of forex trading courses, e-books, and educational materials to accelerate your trading journey." />
        <meta property="og:url" content="https://institutional-trader.com/resources" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://institutional-trader.com/og/og-default.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trading Education Resources | KenneDyne spot" />
        <meta name="twitter:description" content="Access courses, e-books, and materials for forex trading education." />
        <meta name="twitter:image" content="https://institutional-trader.com/og/og-default.jpg" />
      </Helmet>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <Resources />
    </>
  );
}
