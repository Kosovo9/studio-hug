# ▲ Deployment a Vercel - Frontend React

## Paso 1: Crear Cuenta en Vercel

1. Ve a https://vercel.com
2. Click en "Sign Up"
3. Inicia sesión con GitHub (recomendado)

## Paso 2: Importar Proyecto

1. En Vercel Dashboard, click en "Add New..." → "Project"
2. Selecciona el repositorio: `Kosovo9/studio-hug`
3. Vercel detectará automáticamente que es un proyecto Vite

## Paso 3: Configurar Proyecto

Vercel debería detectar automáticamente:
- **Framework Preset**: Vite
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

Si no detecta automáticamente, configura manualmente:

```
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Paso 4: Configurar Variables de Entorno

En Vercel Dashboard, ve a tu proyecto → "Settings" → "Environment Variables":

### Variables Requeridas:

```env
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-aqui

# API Backend (Railway)
VITE_API_URL=https://tu-railway-url.up.railway.app

# Site
VITE_SITE_URL=https://nexora-hug.com
```

### Variables Opcionales:

```env
# Stripe (para frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_tu_key

# App URL
VITE_APP_URL=https://tu-vercel-url.vercel.app
```

**IMPORTANTE**: Todas las variables de Vite deben empezar con `VITE_`

## Paso 5: Configurar Build Settings

1. Ve a "Settings" → "General"
2. Verifica:
   - **Framework**: Vite
   - **Node.js Version**: 18.x o superior
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

## Paso 6: Deploy

1. Click en "Deploy"
2. Vercel construirá y desplegará automáticamente
3. Espera a que termine (2-3 minutos)
4. Obtendrás una URL: `https://studio-hug-xxxxx.vercel.app`

## Paso 7: Configurar Dominio Personalizado (Opcional)

1. Ve a "Settings" → "Domains"
2. Agrega tu dominio: `nexora-hug.com`
3. Sigue las instrucciones de DNS
4. Vercel configurará SSL automáticamente

## Paso 8: Verificar Deployment

1. Abre la URL de Vercel
2. Deberías ver el Dashboard de Nexora-Hug
3. Verifica que:
   - ✅ Navbar funciona
   - ✅ Navegación entre páginas funciona
   - ✅ API calls funcionan (verifica en Network tab)

## Paso 9: Configurar Auto-Deploy

Vercel automáticamente:
- ✅ Detecta cambios en `main` branch
- ✅ Re-despliega automáticamente
- ✅ Crea preview deployments para PRs

## Paso 10: Configurar Redirects (Opcional)

Crea `client/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://tu-railway-url.up.railway.app/api/:path*"
    }
  ]
}
```

Esto permite hacer llamadas a `/api/...` desde el frontend sin CORS issues.

## ✅ Checklist

- [ ] Cuenta Vercel creada
- [ ] Proyecto importado desde GitHub
- [ ] Root directory configurado: `client`
- [ ] Variables de entorno configuradas (con prefijo `VITE_`)
- [ ] Build settings verificadas
- [ ] Deploy completado
- [ ] URL funcionando
- [ ] Dominio personalizado configurado (opcional)
- [ ] Auto-deploy activado

## 🔧 Troubleshooting

### Error: "Build failed"
- Verifica que todas las dependencias estén en `client/package.json`
- Revisa los logs de build en Vercel Dashboard

### Error: "Environment variables not found"
- Asegúrate de que todas las variables empiecen con `VITE_`
- Verifica que estén en "Production", "Preview" y "Development"

### Error: "API calls failing"
- Verifica `VITE_API_URL` apunta a tu Railway URL
- Verifica CORS en Railway está configurado para permitir tu dominio Vercel

### Error: "404 on refresh"
- Crea `client/public/_redirects`:
```
/*    /index.html   200
```

O configura en `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

**¡Frontend desplegado en Vercel! ▲**

