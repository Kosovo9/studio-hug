import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../config/seo';

export default function SEOHead({ locale = 'es-mx' }) {
  const location = useLocation();
  const config = SEO_CONFIG[locale] || SEO_CONFIG.es_MX;

  return (
    <Helmet>
      <title>{config.title}</title>
      <meta name="description" content={config.description} />
      <meta name="keywords" content={config.keywords} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description} />
      <meta property="og:image" content="https://nexora-hug.com/og-image.jpg" />
      <meta property="og:url" content={`https://nexora-hug.com${location.pathname}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={`https://nexora-hug.com${location.pathname}`} />
    </Helmet>
  );
}

