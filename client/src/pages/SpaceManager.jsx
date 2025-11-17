import { useState, useEffect } from 'react';
import { Plus, Trash2, Settings, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function SpaceManager() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSpaces();
  }, []);

  async function loadSpaces() {
    try {
      const response = await fetch('/api/spaces');
      const data = await response.json();
      setSpaces(data);
    } catch (error) {
      console.error('Error loading spaces:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createNewSpace() {
    const name = prompt('Nombre del Space:');
    if (!name) return;
    
    const template = prompt('Template (chatbot/image-gen/voice/code):');
    
    const response = await fetch('/api/spaces/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, template, userId: localStorage.getItem('userId') || 'user123' })
    });
    
    if (response.ok) {
      loadSpaces();
      alert('Space creado! Desplegando a HuggingFace...');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">🚀 Mis Spaces</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createNewSpace}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            <Plus size={20} />
            Crear Nuevo Space
          </motion.button>
        </div>
        {loading ? (
          <div className="text-center text-white">Cargando...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space, index) => (
              <SpaceCard key={space.id} space={space} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SpaceCard({ space, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{space.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          space.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
        }`}>
          {space.status}
        </span>
      </div>
      <p className="text-gray-400 mb-4">Revenue: ${space.revenue?.toLocaleString()} MXN/mes</p>
      <div className="flex gap-2">
        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
          <Settings size={16} className="inline mr-2" />
          Config
        </button>
        <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm">
          <Trash2 size={16} className="inline mr-2" />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

