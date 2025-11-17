import { useState } from 'react';
import { Save, Key, CreditCard, Bell, Shield, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function Settings() {
  const [settings, setSettings] = useState({
    email: 'usuario@ejemplo.com',
    paymentEmail: 'pagos@ejemplo.com',
    paymentName: 'Tu Nombre',
    notifications: true,
    apiKey: 'sk_live_****'
  });

  const handleSave = async () => {
    alert('✅ Configuración guardada');
  };

  const sections = [
    { icon: Globe, title: 'Perfil', description: 'Información personal' },
    { icon: CreditCard, title: 'Pagos', description: 'Métodos de pago' },
    { icon: Bell, title: 'Notificaciones', description: 'Alertas y notificaciones' },
    { icon: Key, title: 'Seguridad', description: 'Claves y autenticación' },
    { icon: Shield, title: 'Privacidad', description: 'Control de datos' }
  ];

  return (
    <>
      <SEOHead locale="es-mx" />
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f35] to-[#0f1419] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent mb-4">
              ⚙️ Configuración
            </h1>
            <p className="text-gray-300 text-lg">Administra tu cuenta y preferencias</p>
          </motion.div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map((section, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-purple-500/30 cursor-pointer transition-all"
              >
                <section.icon className="text-purple-400 mb-4 group-hover:text-pink-400 transition-colors" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
                <p className="text-gray-400 text-sm">{section.description}</p>
                <div className="mt-4 text-purple-400 text-sm group-hover:text-pink-400 transition-colors">
                  Editar →
                </div>
              </motion.div>
            ))}
          </div>

          {/* Email Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">✉️ Email Principal</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Save size={20} />
                Guardar cambios
              </button>
            </div>
          </motion.div>

          {/* API Key */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-b from-blue-900/20 to-cyan-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">🔐 Clave API</h2>
            <p className="text-gray-300 mb-4">Tu clave secreta para integraciones</p>
            <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono text-sm text-gray-400 break-all">
              {settings.apiKey}
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-all">
              Regenerar clave
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
