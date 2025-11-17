# Guía de Deployment: Vercel + Cloudflare - www.studio-nexora.com

## 🚀 RESUMEN EJECUTIVO

**Objetivos:**
- Deploy a producción: 1.5 horas
- Dominio: www.studio-nexora.com
- Infraestructura: Vercel (API + Frontend) + Cloudflare (DNS/CDN)
- Monetización: PayPal, Stripe, Lemon, Wise, MercadoPago

---

## ⌨️ FASE 1: PREPARACIÓN (15 min)

### 1.1 Clonar repositorio localmente

```bash
git clone https://github.com/Kosovo9/studio-hug.git
cd studio-hug
npm install
```

### 1.2 Variables de Entorno (`.env.production`)

Crea un archivo `.env.production` en el root:

```env
# Server
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://www.studio-nexora.com
SITE_URL=https://www.studio-nexora.com

# Supabase
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_KEY=tu_service_key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_BASIC=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# PayPal
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...
PAYPAL_MODE=live

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=...
MERCADOPAGO_PUBLIC_KEY=...

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=...

# Wise
WISE_API_KEY=...
WISE_PROFILE_ID=...

# Email
EMAIL_USER=...
EMAIL_PASSWORD=...

# JWT
JWT_SECRET=tu_secret_seguro_aqui_min_32_caracteres
```

---

## 📑 FASE 2: CONFIGURAR VERCEL (20 min)

### 2.1 Crear Proyecto Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Clickear **New Project**
3. Seleccionar repositorio `studio-hug`
4. Seleccionar framework: **Next.js** (o Node.js si usas Express)
5. Clickear **Deploy**

### 2.2 Agregar Variables de Entorno en Vercel

1. En el proyecto Vercel, ir a **Settings** → **Environment Variables**
2. Copiar TODAS las variables del `.env.production`
3. Asegurarse que estén disponibles en:
   - Production
   - Preview
   - Development

### 2.3 Configurar Vercel.json (opcional)

Crea `vercel.json` en el root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "regions": ["cdg1", "iad1", "sjc1"],
  "public": true
}
```

---

## 🌐 FASE 3: CLOUDFLARE DNS (25 min)

### 3.1 Configurar Nameservers

1. Ir a [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Seleccionar tu dominio `studio-nexora.com`
3. Ir a **DNS** → **Nameservers**
4. Copiar los nameservers de Cloudflare
5. Ir a tu registrador de dominios (Namecheap, GoDaddy, etc.)
6. Cambiar los nameservers a los de Cloudflare

**Esperar 24-48 horas** para propagación completa (verificar: `nslookup studio-nexora.com`)

### 3.2 Crear Record A en Cloudflare

1. En **DNS Records**, clickear **+ Add Record**
2. Tipo: **CNAME**
3. Nombre: `www`
4. Target: `cname.vercel-dns.com.`
5. TTL: **Auto**
6. Proxy Status: **Proxied** (nube naranja)
7. Clickear **Save**

### 3.3 Crear Redirect (Raiz → www)

1. En **Rules** → **Page Rules**
2. URL: `studio-nexora.com/*`
3. Forwarding URL: **Forwarding URL (Permanent - 301)**
4. Destino: `https://www.studio-nexora.com/$1`

### 3.4 SSL/TLS

1. Ir a **SSL/TLS** → **Overview**
2. Seleccionar: **Full** (not strict - compatible con Vercel)
3. Ir a **Edge Certificates**
4. Habilitar: **Always Use HTTPS**
5. Habilitar: **Automatic HTTPS Rewrites**

### 3.5 Cloudflare Workers (Opcional pero Recomendado)

Para optimización de cache y seguridad:

```javascript
// wrangler.toml
name = "studio-nexora-worker"
type = "javascript"
account_id = "tu_account_id"
workers_dev = true
route = "*studio-nexora.com/*"
zone_id = "tu_zone_id"

// worker.js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Cache por 1 hora
  const cache = caches.default
  let response = await cache.match(request)
  
  if (!response) {
    response = await fetch(request)
    const cacheControl = new Headers(response.headers)
    cacheControl.set('Cache-Control', 'public, max-age=3600')
    response = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: cacheControl
    })
  }
  return response
}
```

---

## 🔍 FASE 4: VERIFICACIÓN (15 min)

### 4.1 Tests de Conectividad

```bash
# Verificar DNS
nslookup www.studio-nexora.com
nslookup studio-nexora.com

# Verificar SSL
curl -I https://www.studio-nexora.com

# Verificar Redirect
curl -I http://studio-nexora.com
```

### 4.2 Test de Pagos

```javascript
// Test en /test/payment-test.js
const mercadopagoService = require('../api/services/mercadopagoService');
const stripeService = require('../api/services/stripeService');
const paypalService = require('../api/services/paypalService');

// Test MercadoPago
const mpLink = mercadopagoService.getFlexibleLink();
console.log('MercadoPago Link:', mpLink);

// Test Stripe
const paymentIntent = await stripeService.createPaymentIntent(100);
console.log('Stripe Intent:', paymentIntent.id);

// Test PayPal
const order = await paypalService.createOrder({
  referenceId: 'TEST-001',
  amount: 50,
  currency: 'USD'
});
console.log('PayPal Order:', order.id);
```

### 4.3 Verificar en Navegador

1. Abrir https://www.studio-nexora.com
2. Verificar:
   - ✅ Carga sin errores
   - ✅ SSL/HTTPS activo (candado verde)
   - ✅ Performance (Lighthouse score > 80)
   - ✅ Botones de pago funcionan

---

## 💪 OPTIMIZACIONES PARA MONETIZACIÓN 10X

### Performance

```javascript
// Enable Compression en Vercel
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Accept-Encoding",
          "value": "gzip, deflate, br"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Security Headers

```javascript
// Cloudflare Page Rule
URL: *studio-nexora.com/*
Headers:
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

---

## 🔐 TROUBLESHOOTING

| Problema | Solución |
|----------|----------|
| DNS no resuelve | Esperar 24h o revalidar nameservers |
| SSL error | Cambiar Cloudflare a "Full" en SSL/TLS |
| 404 en rutas | Configurar vercel.json correctly |
| Variables no cargadas | Redeployar proyecto en Vercel |
| Pagos no funcionan | Verificar credenciales en .env |

---

## 🌟 CHECKLIST FINAL

- [ ] Variables de entorno configuradas
- [ ] Proyecto en Vercel deployado
- [ ] Dominio en Cloudflare
- [ ] DNS propagado (wait 24h)
- [ ] SSL/HTTPS funcionando
- [ ] Todos los pagos testados
- [ ] Performance > 80 Lighthouse
- [ ] Webhooks configurados
- [ ] Backups activados
- [ ] Monitoring habilitado

---

## 🚀 LANZAMIENTO: 30K MXN EN 24H

**Estrategia de Monetización:**

1. **Landing Page Premium** - $2,000 MXN conversación
2. **Link Flexible MercadoPago** - Montos variables
3. **Suscripción Mensual** - $1,500/mes (Stripe)
4. **Affiliate Links** - Comisión 20%
5. **Email Automation** - 3 seguimientos/conversiones

**Meta 24h:** 15 sales x $2,000 = **$30,000 MXN** ✅
