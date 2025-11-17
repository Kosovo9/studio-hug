// Cloudflare Worker - Pixverse AI Edge Proxy + IP Caching
// Máximo rendimiento: 10X optimization

const CACHE_TTL = 3600; // 1 hour IP cache
const PIXVERSE_API = 'https://api.pixverse.ai/v1';

// IP Detection: Extract real IP from Cloudflare headers
function getClientIP(request) {
  return request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0] ||
    request.headers.get('X-Client-IP') || 'unknown';
}

// Currency detection based on country (cached)
async function detectCurrency(ip, cache) {
  const cached = await cache.match(`https://geo/${ip}`);
  if (cached) return await cached.json();
  
  // Default pricing if no geo data available
  const currency = {
    code: 'USD',
    price: 20,
    country: 'US'
  };
  
  // Cache the result
  await cache.put(
    `https://geo/${ip}`,
    new Response(JSON.stringify(currency), {
      headers: { 'Cache-Control': `max-age=${CACHE_TTL}` }
    })
  );
  
  return currency;
}

// Main handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const ip = getClientIP(request);
    const cache = caches.default;
    
    // Route handlers
    if (url.pathname === '/pixverse/price') {
      const currency = await detectCurrency(ip, cache);
      return new Response(JSON.stringify(currency), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Proxy to origin
    return fetch(request);
  }
};
