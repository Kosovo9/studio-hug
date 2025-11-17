# 🚂 Deployment a Railway - Backend API

## Paso 1: Crear Cuenta en Railway

1. Ve a https://railway.app
2. Click en "Start a New Project"
3. Inicia sesión con GitHub (recomendado)

## Paso 2: Conectar Repositorio

1. En Railway Dashboard, click en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Autoriza Railway a acceder a tus repositorios
4. Selecciona: `Kosovo9/studio-hug`
5. Railway detectará automáticamente el proyecto

## Paso 3: Configurar Proyecto

1. Railway detectará `api/` como directorio
2. Si no, configura manualmente:
   - **Root Directory**: `api`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`

## Paso 4: Configurar Variables de Entorno

En Railway Dashboard, ve a tu proyecto → "Variables":

### Variables Requeridas:

```env
# Server
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://tu-frontend.vercel.app

# Supabase
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_KEY=tu-service-key

# Stripe
STRIPE_SECRET_KEY=sk_live_tu_key_real
STRIPE_PUBLISHABLE_KEY=pk_live_tu_key_real
STRIPE_WEBHOOK_SECRET=whsec_tu_secret
STRIPE_PRICE_BASIC=price_xxxxx
STRIPE_PRICE_PRO=price_xxxxx
STRIPE_PRICE_ENTERPRISE=price_xxxxx

# Wise
WISE_API_KEY=tu_wise_api_key
WISE_PROFILE_ID=tu_wise_profile_id

# PayPal
PAYPAL_CLIENT_ID=tu_paypal_client_id
PAYPAL_CLIENT_SECRET=tu_paypal_secret

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=tu_lemon_key

# JWT
JWT_SECRET=tu-secret-super-seguro-aqui

# Redis (opcional, Railway tiene Redis addon)
REDIS_URL=${{Redis.REDIS_URL}}

# Site
SITE_URL=https://nexora-hug.com

# Email
EMAIL_USER=email@nexora-hug.com
EMAIL_PASSWORD=tu_email_password

# Sentry (opcional)
SENTRY_DSN=tu_sentry_dsn
```

## Paso 5: Agregar Redis (Opcional pero Recomendado)

1. En Railway Dashboard, click en "New" → "Database"
2. Selecciona "Redis"
3. Railway creará automáticamente la variable `REDIS_URL`
4. La variable se inyectará automáticamente

## Paso 6: Configurar Dominio

1. En Railway Dashboard, ve a "Settings" → "Domains"
2. Click en "Generate Domain" o agrega tu dominio personalizado
3. Copia la URL (ej: `https://nexora-hug-api.up.railway.app`)

## Paso 7: Configurar Webhook de Stripe

1. Ve a Stripe Dashboard → "Developers" → "Webhooks"
2. Click en "Add endpoint"
3. URL: `https://tu-railway-url.up.railway.app/api/payments/stripe/webhook`
4. Eventos a escuchar:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `customer.subscription.created`
5. Copia el "Signing secret" y agrégalo a Railway como `STRIPE_WEBHOOK_SECRET`

## Paso 8: Verificar Deployment

1. Railway desplegará automáticamente
2. Ve a "Deployments" para ver el progreso
3. Una vez completado, prueba el endpoint:

```bash
curl https://tu-railway-url.up.railway.app/health
```

Deberías ver:
```json
{
  "status": "healthy",
  "message": "Nexora-Hug API running 🚀",
  "target": "$30K MXN/mes"
}
```

## Paso 9: Configurar Auto-Deploy

Railway automáticamente:
- ✅ Detecta cambios en `main` branch
- ✅ Re-despliega automáticamente
- ✅ Muestra logs en tiempo real

## ✅ Checklist

- [ ] Cuenta Railway creada
- [ ] Repositorio conectado
- [ ] Proyecto configurado (root: `api`)
- [ ] Variables de entorno configuradas
- [ ] Redis agregado (opcional)
- [ ] Dominio configurado
- [ ] Webhook Stripe configurado
- [ ] Health check funcionando
- [ ] Auto-deploy activado

## 🔧 Troubleshooting

### Error: "Module not found"
- Verifica que `api/package.json` tenga todas las dependencias
- Railway debería ejecutar `npm install` automáticamente

### Error: "Port already in use"
- Railway asigna el puerto automáticamente
- Usa `process.env.PORT` (ya configurado en `api/index.js`)

### Error: "Environment variables missing"
- Verifica todas las variables en Railway Dashboard
- Asegúrate de que no tengan espacios extra

---

**¡Backend API desplegado en Railway! 🚂**

