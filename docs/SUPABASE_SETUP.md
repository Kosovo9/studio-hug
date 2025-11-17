# 🗄️ Configuración de Supabase - Nexora-Hug

## Paso 1: Crear Proyecto en Supabase

1. Ve a https://supabase.com
2. Inicia sesión o crea una cuenta
3. Click en "New Project"
4. Configura:
   - **Name**: `nexora-hug`
   - **Database Password**: (guarda esta contraseña)
   - **Region**: Elige la más cercana (US East, US West, etc.)
   - **Pricing Plan**: Free tier es suficiente para empezar

## Paso 2: Ejecutar Schema SQL

1. Ve a tu proyecto en Supabase Dashboard
2. Click en "SQL Editor" en el menú lateral
3. Click en "New Query"
4. Copia y pega el contenido completo de `supabase/schema.sql`
5. Click en "Run" o presiona `Ctrl+Enter`
6. Verifica que aparezca: "Success. No rows returned"

### Schema SQL Completo:

```sql
-- ESTE ARCHIVO ES PARA REFERENCIA - YO (COMET) LO CONFIGURARÉ EN SUPABASE
-- Pero Cursor debe crear la estructura local

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  subscription_tier TEXT DEFAULT 'free',
  total_revenue DECIMAL(10,2) DEFAULT 0
);

CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  hf_space_id TEXT UNIQUE,
  template_type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  monthly_revenue DECIMAL(10,2) DEFAULT 0,
  visitors_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  space_id UUID REFERENCES spaces(id),
  date DATE NOT NULL,
  visitors INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  conversions INTEGER DEFAULT 0
);

CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  service TEXT NOT NULL,
  encrypted_key TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE affiliates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  affiliate_code TEXT UNIQUE NOT NULL,
  name TEXT,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  pending_payment DECIMAL(10,2) DEFAULT 0,
  wise_email TEXT,
  paypal_email TEXT,
  payment_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE payment_schedule (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID REFERENCES affiliates(id),
  amount_mxn DECIMAL(10,2),
  payment_date DATE,
  status TEXT DEFAULT 'pending',
  wise_transfer_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE conversions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_code TEXT,
  user_id UUID REFERENCES users(id),
  amount DECIMAL(10,2),
  commission DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Paso 3: Obtener Credenciales

1. En Supabase Dashboard, ve a "Settings" → "API"
2. Copia las siguientes credenciales:

### Credenciales Necesarias:

- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJhbGc...` (clave pública)
- **service_role key**: `eyJhbGc...` (clave secreta - NO compartir)

## Paso 4: Configurar Row Level Security (RLS)

1. Ve a "Authentication" → "Policies"
2. Para cada tabla, crea políticas básicas:

### Política para `users`:
```sql
-- Permitir lectura a usuarios autenticados
CREATE POLICY "Users can read own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Permitir inserción a usuarios autenticados
CREATE POLICY "Users can insert own data"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);
```

### Política para `spaces`:
```sql
-- Permitir lectura pública
CREATE POLICY "Spaces are viewable by everyone"
ON spaces FOR SELECT
USING (true);

-- Permitir inserción a usuarios autenticados
CREATE POLICY "Users can create spaces"
ON spaces FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

### Política para `affiliates`:
```sql
-- Permitir lectura a usuarios autenticados
CREATE POLICY "Users can read own affiliates"
ON affiliates FOR SELECT
USING (auth.uid() = user_id);

-- Permitir inserción a usuarios autenticados
CREATE POLICY "Users can create affiliates"
ON affiliates FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

## Paso 5: Configurar Variables de Entorno

Agrega estas variables a tu `.env`:

```env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu-anon-key-aqui
SUPABASE_SERVICE_KEY=tu-service-key-aqui
```

## Paso 6: Verificar Conexión

Ejecuta este comando para verificar:

```bash
cd api
node -e "require('dotenv').config(); const { createClient } = require('@supabase/supabase-js'); const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY); console.log('✅ Supabase conectado:', process.env.SUPABASE_URL);"
```

## ✅ Checklist

- [ ] Proyecto creado en Supabase
- [ ] Schema SQL ejecutado (7 tablas creadas)
- [ ] RLS policies configuradas
- [ ] Credenciales copiadas
- [ ] Variables de entorno configuradas
- [ ] Conexión verificada

---

**¡Supabase configurado! 🎉**

