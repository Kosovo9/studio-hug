require('dotenv').config();

module.exports = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Supabase
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceKey: process.env.SUPABASE_SERVICE_KEY
  },

  // Stripe
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    prices: {
      basic: process.env.STRIPE_PRICE_BASIC,
      pro: process.env.STRIPE_PRICE_PRO,
      enterprise: process.env.STRIPE_PRICE_ENTERPRISE
    }
  },

  // Wise
  wise: {
    apiKey: process.env.WISE_API_KEY,
    profileId: process.env.WISE_PROFILE_ID
  },

  // PayPal
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    mode: process.env.PAYPAL_MODE || 'sandbox'
  },

  // Lemon Squeezy
  lemonSqueezy: {
    apiKey: process.env.LEMON_SQUEEZY_API_KEY
  },

  // Hugging Face
  huggingface: {
    token: process.env.HUGGINGFACE_TOKEN
  },

  // Redis
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: '7d'
  },

  // Affiliates
  affiliates: {
    commissionRate: 0.20, // 20%
    minPayment: 500, // $500 MXN
    paymentDay: 1, // Lunes (0 = Domingo, 1 = Lunes)
    paymentHour: 9 // 9 AM
  },

  // Site
  site: {
    url: process.env.SITE_URL || 'https://nexora-hug.com'
  }
};

