const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

function generateSitemap() {
  return new Promise((resolve, reject) => {
    const sitemap = new SitemapStream({ 
      hostname: process.env.SITE_URL || 'https://nexora-hug.com' 
    });

    const writeStream = createWriteStream(
      path.join(__dirname, '../../client/public/sitemap.xml')
    );

    sitemap.pipe(writeStream);

    // Páginas principales en múltiples idiomas
    const pages = ['/', '/spaces', '/analytics', '/pricing', '/affiliates', '/settings'];
    const locales = ['es-mx', 'en-us', 'en-ca', 'es-ar'];

    locales.forEach(locale => {
      pages.forEach(page => {
        sitemap.write({
          url: `/${locale}${page}`,
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString()
        });
      });
    });

    // Spaces individuales
    const spaces = [
      'nexora-ai-chat',
      'nexora-image-gen',
      'nexora-voice-ai',
      'nexora-code-helper'
    ];

    spaces.forEach(space => {
      sitemap.write({
        url: `/spaces/${space}`,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString()
      });
    });

    sitemap.end();

    streamToPromise(sitemap)
      .then(() => {
        console.log('✅ Sitemap generado exitosamente');
        resolve();
      })
      .catch(reject);
  });
}

// Generar sitemap al ejecutar
if (require.main === module) {
  generateSitemap()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Error generando sitemap:', err);
      process.exit(1);
    });
}

module.exports = { generateSitemap };

