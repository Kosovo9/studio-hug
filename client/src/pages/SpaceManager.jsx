import { useState, useEffect } from 'react';
import { Plus, Trash2, Settings, Play, Pause, Lock, Unlock, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function SpaceManager() {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSpaceName, setNewSpaceName] = useState('');

  useEffect(() => {
    loadSpaces();
  }, []);

  const loadSpaces = async () => {
    try {
      const response = await fetch('/api/spaces');
      const data = await response.json();
      setSpaces(data);
    } catch (error) {
      console.error('Error loading spaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const createNewSpace = async () => {
    if (!newSpaceName.trim()) return;
    try {
      const response = await fetch('/api/spaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newSpaceName }),
      });
      const newSpace = await response.json();
      setSpaces([...spaces, newSpace]);
      setNewSpaceName('');
    } catch (error) {
      console.error('Error creating space:', error);
    }
  };

  const deleteSpace = async (id) => {
    if (confirm('¿Deseas eliminar este espacio?')) {
      try {
        await fetch(`/api/spaces/${id}`, { method: 'DELETE' });
        setSpaces(spaces.filter(s => s.id !== id));
      } catch (error) {
        console.error('Error deleting space:', error);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <>
      <SEOHead title="Space Manager" description="Create and manage your AI spaces" />
      <div className="min-h-screen bg-gradient-to-br from-blue-900/10 via-slate-900 to-blue-900/5 relative overflow-hidden">
        {/* Animated background blobs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              🌐 Gestor de Espacios
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Crea y administra tus espacios IA con máximo control
            </p>
          </motion.div>

          {/* Create New Space */}
          <motion.div
            className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-blue-500/30 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Plus className="w-7 h-7 text-blue-400" />
              Crear Nuevo Espacio
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
                placeholder="Nombre del nuevo espacio"
                className="flex-1 bg-black/30 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && createNewSpace()}
              />
              <button
                onClick={createNewSpace}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap hover:shadow-lg hover:shadow-blue-500/40"
              >
                <Plus className="w-5 h-5" />
                Crear
              </button>
            </div>
          </motion.div>

          {/* Spaces Grid */}
          {loading ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-400 text-lg">Cargando espacios...</p>
            </motion.div>
          ) : spaces.length === 0 ? (
            <motion.div
              className="text-center py-16 bg-gradient-to-br from-slate-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg">No tienes espacios aún. ¡Crea uno para empezar!</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {spaces.map((space) => (
                <motion.div
                  key={space.id}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-slate-800/40 to-blue-900/30 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 group"
                  whileHover={{ y: -5 }}
                >
                  {/* Space Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                        {space.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        ID: <span className="font-mono text-blue-300">{space.id.slice(0, 8)}</span>
                      </p>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                      <Globe className="w-6 h-6 text-blue-300" />
                    </div>
                  </div>

                  {/* Space Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-blue-500/10">
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Estado</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <p className="text-sm font-semibold text-white">Activo</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Usar</p>
                      <p className="text-sm font-semibold text-yellow-300">Disponible</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600/40 to-green-500/30 hover:from-green-600/60 hover:to-green-500/50 text-green-300 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-green-500/30 hover:border-green-400/50">
                      <Play className="w-4 h-4" />
                      <span className="hidden sm:inline">Usar</span>
                    </button>
                    <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-600/40 to-amber-500/30 hover:from-amber-600/60 hover:to-amber-500/50 text-amber-300 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-amber-500/30 hover:border-amber-400/50">
                      <Settings className="w-4 h-4" />
                      <span className="hidden sm:inline">Config</span>
                    </button>
                    <button
                      onClick={() => deleteSpace(space.id)}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600/40 to-red-500/30 hover:from-red-600/60 hover:to-red-500/50 text-red-300 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-red-500/30 hover:border-red-400/50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Borrar</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
