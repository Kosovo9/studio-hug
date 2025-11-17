#!/bin/bash

# Script para monitorear la salud del sistema

API_URL="http://localhost:3000"
CLIENT_URL="http://localhost:5173"

echo "🏥 Health Check..."

# Check API
if curl -f -s "$API_URL/health" > /dev/null; then
    echo "✅ API: Healthy"
else
    echo "❌ API: Down"
    exit 1
fi

# Check Client
if curl -f -s "$CLIENT_URL" > /dev/null; then
    echo "✅ Client: Healthy"
else
    echo "❌ Client: Down"
    exit 1
fi

echo "🎉 All systems operational"

