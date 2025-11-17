require('dotenv').config();

const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'PORT'
];

const optionalEnvVars = [
  'STRIPE_SECRET_KEY',
  'WISE_API_KEY',
  'PAYPAL_CLIENT_ID',
  'JWT_SECRET',
  'REDIS_URL',
  'HUGGINGFACE_TOKEN'
];

function validateEnv() {
  const missing = [];
  const warnings = [];

  // Check required
  requiredEnvVars.forEach(varName => {
    if (!process.env[varName] || process.env[varName].trim() === '') {
      missing.push(varName);
    }
  });

  // Check optional (warnings)
  optionalEnvVars.forEach(varName => {
    if (!process.env[varName] || process.env[varName].includes('placeholder')) {
      warnings.push(varName);
    }
  });

  if (missing.length > 0) {
    console.error('❌ ERROR: Missing required environment variables:');
    missing.forEach(v => console.error(`   - ${v}`));
    console.error('\n💡 Add them to your .env file');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.warn('⚠️  WARNING: Optional environment variables not configured:');
    warnings.forEach(v => console.warn(`   - ${v}`));
    console.warn('   Some features may not work correctly\n');
  }

  console.log('✅ Environment variables validated');
}

module.exports = { validateEnv };

