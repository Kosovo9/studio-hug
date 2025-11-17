# 🚀 Guía de Deployment - Nexora-Hug

## Pre-requisitos

1. Node.js 18+
2. Python 3.9+
3. Cuentas configuradas:
   - Hugging Face
   - Supabase
   - Stripe
   - Wise
   - PayPal (opcional)
   - Lemon Squeezy (opcional)

## Paso 1: Configurar Variables de Entorno

```bash
cp .env.example .env
```

Editar `.env` con tus tokens reales:

```env
HUGGINGFACE_TOKEN=tu_token_real
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_key_real
STRIPE_SECRET_KEY=sk_live_...
# ... etc
```

## Paso 2: Instalar Dependencias

```bash
# Instalar todas las dependencias
npm run install:all
```

## Paso 3: Configurar Supabase

1. Crear proyecto en Supabase
2. Ejecutar el schema SQL:

```bash
# En Supabase SQL Editor, ejecutar:
cat supabase/schema.sql
```

3. Configurar RLS (Row Level Security) policies

## Paso 4: Desplegar Backend API

### Opción A: Railway

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Deploy
railway up
```

### Opción B: Render

1. Conectar repositorio GitHub
2. Seleccionar `api/` como root directory
3. Build command: `npm install`
4. Start command: `node index.js`

## Paso 5: Desplegar Frontend

### Opción A: Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel
```

### Opción B: Netlify

1. Conectar repositorio
2. Build directory: `client/dist`
3. Build command: `cd client && npm run build`

## Paso 6: Desplegar Hugging Face Spaces

```bash
# Opción 1: Automático con script
python scripts/deploy_spaces.py

# Opción 2: Manual
cd spaces/nexora-ai-chat
git init
git remote add origin https://huggingface.co/spaces/nexora/nexora-ai-chat
git add .
git commit -m "Initial commit"
git push origin main
```

Repetir para cada space.

## Paso 7: Configurar CI/CD

1. Agregar secrets en GitHub:
   - `HUGGINGFACE_TOKEN`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `STRIPE_SECRET_KEY`
   - etc.

2. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente en cada push a `main`.

## Paso 8: Configurar Pagos Automáticos

1. Configurar cuenta Wise Business
2. Obtener API key
3. Configurar cron job (ya incluido en `api/jobs/weeklyPayments.js`)

## Paso 9: Verificar Deployment

```bash
# Health check
curl https://tu-api.railway.app/health

# Frontend
curl https://tu-frontend.vercel.app
```

## Troubleshooting

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Supabase connection failed"
- Verificar `SUPABASE_URL` y `SUPABASE_ANON_KEY`
- Verificar que el proyecto esté activo en Supabase

### Error: "Stripe webhook failed"
- Verificar `STRIPE_WEBHOOK_SECRET`
- Configurar webhook en Stripe Dashboard

## Monitoreo

- **API Health**: `/health` endpoint
- **Logs**: Railway/Render dashboard
- **Analytics**: Dashboard en `/analytics`

## Próximos Pasos

1. Configurar dominio personalizado
2. Habilitar SSL/HTTPS
3. Configurar backups automáticos
4. Setup monitoring (Sentry, etc.)

---

**¡Listo para generar $30K MXN/mes! 🚀💰**

