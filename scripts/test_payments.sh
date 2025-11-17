#!/bin/bash

# Script para probar el sistema de pagos

echo "🧪 Testing Payment System..."

# Test Stripe
echo "Testing Stripe..."
curl -X POST http://localhost:3000/api/payments/stripe/create-checkout \
  -H "Content-Type: application/json" \
  -d '{"priceId":"price_test","userId":"user123","plan":"basic"}'

# Test Mercado Pago
echo "Testing Mercado Pago..."
curl -X POST http://localhost:3000/api/payments/mercadopago/create-preference \
  -H "Content-Type: application/json" \
  -d '{"amount":99,"title":"Plan Basic","userId":"user123","plan":"basic"}'

# Test Affiliates
echo "Testing Affiliates..."
curl -X POST http://localhost:3000/api/affiliates/create \
  -H "Content-Type: application/json" \
  -d '{"userId":"user123","name":"Test Affiliate"}'

echo "✅ Tests completados"

