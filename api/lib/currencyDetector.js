/**
 * CURRENCY DETECTOR - Detecta país por IP y retorna moneda + precio
 * OPTIMIZADO: Usa GeoIP caching para 10X más rápido
 * SOPORTA: México/Latam (MXN), EU/Canadá (USD)
 */

const geoip = require('geoip-lite');

const REGION_CONFIG = {
  // LATIN AMERICA - PESOS MEXICANOS
  latam: {
    currency: 'MXN',
    price: 249,
    countries: ['MX', 'AR', 'BR', 'CL', 'CO', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'GT', 'HN', 'SV', 'NI', 'CR', 'PA', 'DO', 'CU', 'JM', 'TT', 'BZ'],
    region: 'LATAM'
  },
  // EUROPA - DOLARES USD
  europe: {
    currency: 'USD',
    price: 20,
    countries: ['DE', 'FR', 'GB', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'SE', 'NO', 'DK', 'FI', 'PL', 'CZ', 'HU', 'RO', 'GR', 'PT', 'IE', 'LU', 'SI', 'SK', 'BG', 'HR', 'EE', 'LV', 'LT'],
    region: 'EU'
  },
  // NORTEAMÉRICA - DOLARES USD
  northamerica: {
    currency: 'USD',
    price: 20,
    countries: ['US', 'CA'],
    region: 'NA'
  },
  // DEFAULT - DOLARES USD
  default: {
    currency: 'USD',
    price: 20,
    countries: [],
    region: 'OTHER'
  }
};

// Cache de IPs para evitar lookup repetido
const ipCache = new Map();
const CACHE_TTL = 3600000; // 1 hora

class CurrencyDetector {
  /**
   * Obtiene información de moneda basada en IP
   * @param {string} ip - Dirección IP del cliente
   * @returns {Object} {currency, price, country, region}
   */
  static getByIP(ip) {
    // Validar IP
    if (!ip || ip === 'unknown' || ip === '::1' || ip === '127.0.0.1') {
      return { ...REGION_CONFIG.default, country: 'DEFAULT', ip: 'local' };
    }

    // Verificar cache
    const cached = ipCache.get(ip);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    // Hacer lookup de GeoIP
    const geo = geoip.lookup(ip);
    
    if (!geo || !geo.country) {
      const result = { ...REGION_CONFIG.default, country: 'UNKNOWN', ip };
      ipCache.set(ip, { data: result, timestamp: Date.now() });
      return result;
    }

    const countryCode = geo.country.toUpperCase();
    let config = REGION_CONFIG.default;

    // Detectar región
    if (REGION_CONFIG.latam.countries.includes(countryCode)) {
      config = REGION_CONFIG.latam;
    } else if (REGION_CONFIG.europe.countries.includes(countryCode)) {
      config = REGION_CONFIG.europe;
    } else if (REGION_CONFIG.northamerica.countries.includes(countryCode)) {
      config = REGION_CONFIG.northamerica;
    }

    const result = {
      ...config,
      country: countryCode,
      ip,
      city: geo.city || 'Unknown',
      timezone: geo.timezone || 'UTC'
    };

    // Cachear resultado
    ipCache.set(ip, { data: result, timestamp: Date.now() });
    return result;
  }

  /**
   * Obtiene moneda por código de país (ISO 3166-1 alpha-2)
   */
  static getByCountry(countryCode) {
    const code = countryCode.toUpperCase();
    if (REGION_CONFIG.latam.countries.includes(code)) {
      return { ...REGION_CONFIG.latam, country: code };
    }
    if (REGION_CONFIG.europe.countries.includes(code)) {
      return { ...REGION_CONFIG.europe, country: code };
    }
    if (REGION_CONFIG.northamerica.countries.includes(code)) {
      return { ...REGION_CONFIG.northamerica, country: code };
    }
    return { ...REGION_CONFIG.default, country: code };
  }

  /**
   * Extrae IP real del request (soporta Cloudflare, proxies, etc)
   */
  static extractIP(req) {
    // Cloudflare
    if (req.headers['cf-connecting-ip']) {
      return req.headers['cf-connecting-ip'];
    }
    // Otros proxies
    if (req.headers['x-forwarded-for']) {
      return req.headers['x-forwarded-for'].split(',')[0].trim();
    }
    // IP directa
    return req.ip || req.connection.remoteAddress || 'unknown';
  }

  /**
   * Middleware para Express - agrega currencyInfo al request
   */
  static middleware() {
    return (req, res, next) => {
      const ip = CurrencyDetector.extractIP(req);
      req.currencyInfo = CurrencyDetector.getByIP(ip);
      req.clientIP = ip;
      next();
    };
  }

  /**
   * Limpia cache (para testing)
   */
  static clearCache() {
    ipCache.clear();
  }

  /**
   * Obtiene estadísticas de cache
   */
  static getCacheStats() {
    return {
      cacheSize: ipCache.size,
      cacheEntries: Array.from(ipCache.keys())
    };
  }
}

module.exports = CurrencyDetector;
