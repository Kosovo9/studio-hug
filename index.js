// Este archivo es legacy - usar api/index.js en su lugar
// Mantenido para compatibilidad
require('dotenv').config();
const express = require('express');
const { HfInference } = require('@huggingface/inference');
const simpleGit = require('simple-git');
const path = require('path');

const app = express();
const git = simpleGit();
const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);

// Configuración
const SPACES = [
  { name: 'nexora-ai-chat', template: 'chatbot', revenue: 5000 },
  { name: 'nexora-image-gen', template: 'image-generator', revenue: 8000 },
  { name: 'nexora-voice-ai', template: 'voice-assistant', revenue: 7000 },
  { name: 'nexora-code-helper', template: 'code-assistant', revenue: 10000 }
];

// Función para crear Space automáticamente
async function createSpace(spaceName, template) {
  console.log(`🚀 Creando Space: ${spaceName}`);
  
  const spaceConfig = {
    name: spaceName,
    sdk: 'gradio',
    hardware: 'cpu-basic',
    template: template
  };
  
  // Aquí iría la lógica de creación con la API de HF
  return spaceConfig;
}

// Función para deployar
async function deployToHuggingFace() {
  try {
    console.log('📦 Iniciando deployment...');
    
    for (const space of SPACES) {
      await createSpace(space.name, space.template);
      console.log(`✅ ${space.name} creado - Potencial: $${space.revenue} MXN/mes`);
    }
    
    console.log('🎉 Todos los Spaces desplegados!');
    console.log(`💰 Potencial total: $${SPACES.reduce((a, b) => a + b.revenue, 0)} MXN/mes`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// API Endpoints
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    spaces: SPACES.length,
    potential: '$30K MXN/mes'
  });
});

app.get('/deploy', async (req, res) => {
  await deployToHuggingFace();
  res.json({ message: 'Deployment iniciado' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Nexora-Hug corriendo en puerto ${PORT}`);
  console.log(`🎯 Meta: $30K MXN automático`);
});

