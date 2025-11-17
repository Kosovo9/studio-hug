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

