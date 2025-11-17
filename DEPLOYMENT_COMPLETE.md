# 🚀 Guía Completa de Deployment - Nexora-Hug

## 📋 Resumen de Deployment

Este proyecto se despliega en **3 plataformas**:

1. **Supabase** → Base de datos PostgreSQL
2. **Railway** → Backend API (Node.js/Express)
3. **Vercel** → Frontend React (Vite)

---

## 🗄️ PASO 1: Configurar Supabase

**Tiempo estimado**: 15 minutos

1. Ve a https://supabase.com y crea un proyecto
2. Ejecuta el schema SQL (ver `docs/SUPABASE_SETUP.md`)
3. Obtén las credenciales (URL, anon key, service key)
4. Configura RLS policies básicas

**Documentación completa**: `docs/SUPABASE_SETUP.md`

---

## 🚂 PASO 2: Deploy Backend a Railway

**Tiempo estimado**: 20 minutos

1. Ve a https://railway.app y crea cuenta
2. Conecta repositorio `Kosovo9/studio-hug`
3. Configura root directory: `api`
4. Agrega todas las variables de entorno
5. Agrega Redis (opcional pero recomendado)
6. Configura dominio

**Documentación completa**: `docs/RAILWAY_DEPLOY.md`

**Variables críticas para Railway**:
```env
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_KEY=...
STRIPE_SECRET_KEY=...
JWT_SECRET=...
REDIS_URL=... (auto-generado si usas Redis addon)
```

---

## ▲ PASO 3: Deploy Frontend a Vercel

**Tiempo estimado**: 15 minutos

1. Ve a https://vercel.com y crea cuenta
2. Importa repositorio `Kosovo9/studio-hug`
3. Configura root directory: `client`
4. Agrega variables de entorno (con prefijo `VITE_`)
5. Deploy automático

**Documentación completa**: `docs/VERCEL_DEPLOY.md`

**Variables críticas para Vercel**:
```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_API_URL=https://tu-railway-url.up.railway.app
```

---

## 🔗 PASO 4: Conectar Todo

### 4.1 Actualizar Railway con URL de Vercel

En Railway, agrega:
```env
FRONTEND_URL=https://tu-vercel-url.vercel.app
```

### 4.2 Actualizar Vercel con URL de Railway

En Vercel, agrega:
```env
VITE_API_URL=https://tu-railway-url.up.railway.app
```

### 4.3 Configurar CORS en Railway

En `api/index.js`, el CORS ya está configurado para aceptar cualquier origen. Si quieres restringirlo:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://tu-vercel-url.vercel.app',
  credentials: true
}));
```

---

## ✅ Checklist Final

### Supabase
- [ ] Proyecto creado
- [ ] Schema SQL ejecutado (7 tablas)
- [ ] RLS policies configuradas
- [ ] Credenciales copiadas

### Railway (Backend)
- [ ] Proyecto creado y conectado a GitHub
- [ ] Root directory: `api`
- [ ] Variables de entorno configuradas
- [ ] Redis agregado (opcional)
- [ ] Health check funcionando: `/health`
- [ ] URL copiada

### Vercel (Frontend)
- [ ] Proyecto importado desde GitHub
- [ ] Root directory: `client`
- [ ] Variables de entorno configuradas (con `VITE_`)
- [ ] Deploy completado
- [ ] URL funcionando
- [ ] Navegación verificada

### Integración
- [ ] Railway tiene `FRONTEND_URL` configurado
- [ ] Vercel tiene `VITE_API_URL` configurado
- [ ] CORS funcionando
- [ ] API calls desde frontend funcionan

---

## 🧪 Testing Post-Deployment

### 1. Test Backend (Railway)
```bash
curl https://tu-railway-url.up.railway.app/health
```

**Esperado**:
```json
{
  "status": "healthy",
  "message": "Nexora-Hug API running 🚀",
  "target": "$30K MXN/mes"
}
```

### 2. Test Frontend (Vercel)
- Abre la URL de Vercel
- Verifica que carga el Dashboard
- Navega entre páginas
- Verifica que las llamadas a API funcionan (Network tab)

### 3. Test Supabase
- Ve a Supabase Dashboard
- Verifica que las 7 tablas existen
- Intenta insertar un registro de prueba

---

## 🔧 Troubleshooting Común

### Error: "CORS policy"
- Verifica que `FRONTEND_URL` en Railway sea correcto
- Verifica que `VITE_API_URL` en Vercel sea correcto

### Error: "Environment variable not found"
- Verifica que todas las variables estén configuradas
- Verifica que las variables de Vite empiecen con `VITE_`

### Error: "Database connection failed"
- Verifica `SUPABASE_URL` y `SUPABASE_ANON_KEY`
- Verifica que el proyecto Supabase esté activo

### Error: "Build failed"
- Revisa los logs en Railway/Vercel
- Verifica que todas las dependencias estén en `package.json`

---

## 📊 URLs Finales

Después del deployment, tendrás:

- **Frontend**: `https://tu-vercel-url.vercel.app`
- **Backend API**: `https://tu-railway-url.up.railway.app`
- **Supabase**: `https://tu-proyecto.supabase.co`

---

## 🎯 Próximos Pasos

1. **Configurar Dominios Personalizados** (opcional)
   - `nexora-hug.com` → Vercel
   - `api.nexora-hug.com` → Railway

2. **Configurar Monitoring**
   - Sentry para error tracking
   - Analytics para métricas

3. **Configurar CI/CD**
   - Ya está configurado con GitHub Actions
   - Auto-deploy en cada push a `main`

4. **Desplegar Hugging Face Spaces**
   - Ver `scripts/deploy_spaces.py`

---

**¡Deployment Completo! 🎉**

**Meta: $30K MXN/mes en automático** 🚀💰

