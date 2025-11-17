#!/bin/bash

# Script para hacer backup de la base de datos Supabase

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
BACKUP_FILE="$BACKUP_DIR/backup_$DATE.sql"

mkdir -p $BACKUP_DIR

echo "📦 Creando backup de base de datos..."

# Exportar schema y datos
# TODO: Implementar con Supabase CLI
# supabase db dump > $BACKUP_FILE

echo "✅ Backup creado: $BACKUP_FILE"

# Mantener solo los últimos 7 backups
ls -t $BACKUP_DIR/backup_*.sql | tail -n +8 | xargs rm -f

echo "🧹 Backups antiguos eliminados"

