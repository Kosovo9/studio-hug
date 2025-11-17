const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');

const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Rate limiter general
const generalLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:general:'
  }),
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por ventana
  message: 'Demasiadas solicitudes, intenta más tarde',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter para pagos
const paymentLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:payment:'
  }),
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // 10 intentos de pago por hora
  message: 'Demasiados intentos de pago, intenta más tarde',
});

// Rate limiter para creación de spaces
const spaceLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:space:'
  }),
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 5, // 5 spaces por hora
  message: 'Límite de creación de spaces alcanzado',
});

module.exports = {
  generalLimiter,
  paymentLimiter,
  spaceLimiter
};

