import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEO_CONFIG } from '../config/seo';

export default function SEOHead({ locale = 'es-mx', title, description }) {
  const location = useLocation();
  // Convert locale format (es-mx) to config key (es_MX)
  const localeKey = locale.replace(/-/g, '_').toUpperCase();
  const config = SEO_CONFIG[localeKey] || SEO_CONFIG.es_MX;

  const finalTitle = title || config.title;
  const finalDescription = description || config.description;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={config.keywords} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content="https://nexora-hug.com/og-image.jpg" />
      <meta property="og:url" content={`https://nexora-hug.com${location.pathname}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={`https://nexora-hug.com${location.pathname}`} />
    </Helmet>
  );
}

