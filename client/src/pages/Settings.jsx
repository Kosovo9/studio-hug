import { useState } from 'react';
import { Save, Key, CreditCard, Bell, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const [settings, setSettings] = useState({
    email: '',
    paymentEmail: '',
    paymentName: '',
    notifications: true,
    apiKey: ''
  });

  async function saveSettings() {
    const response = await fetch('/api/users/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    
    if (response.ok) {
      alert('✅ Configuración guardada!');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">⚙️ Configuración</h1>
        <div className="space-y-6">
          {/* Cuenta */}
          <SettingSection icon={<Shield size={24} />} title="Información de Cuenta">
            <Input 
              label="Email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({...settings, email: e.target.value})}
            />
          </SettingSection>
          {/* Pagos */}
          <SettingSection icon={<CreditCard size={24} />} title="Información de Pago (Para Afiliados)">
            <Input 
              label="Email de Wise/PayPal"
              type="email"
              value={settings.paymentEmail}
              onChange={(e) => setSettings({...settings, paymentEmail: e.target.value})}
              placeholder="tu-email@ejemplo.com"
            />
            <Input 
              label="Nombre Completo"
              type="text"
              value={settings.paymentName}
              onChange={(e) => setSettings({...settings, paymentName: e.target.value})}
              placeholder="Juan Pérez"
            />
            <p className="text-gray-400 text-sm mt-2">
              💡 Necesario para recibir pagos de afiliados cada lunes
            </p>
          </SettingSection>
          {/* API Keys */}
          <SettingSection icon={<Key size={24} />} title="API Keys">
            <div className="bg-gray-900/50 p-4 rounded-xl">
              <p className="text-gray-400 text-sm mb-2">Tu API Key:</p>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={settings.apiKey || 'nxr_xxxxxxxxxxxxxxxxx'}
                  readOnly
                  className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg font-mono text-sm"
                />
                <button 
                  onClick={() => navigator.clipboard.writeText(settings.apiKey)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                >
                  Copiar
                </button>
              </div>
            </div>
          </SettingSection>
          {/* Notificaciones */}
          <SettingSection icon={<Bell size={24} />} title="Notificaciones">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                className="w-6 h-6 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-white">Recibir notificaciones de nuevos pagos y conversiones</span>
            </label>
          </SettingSection>
          {/* Guardar */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={saveSettings}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
          >
            <Save size={24} />
            Guardar Cambios
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function SettingSection({ icon, title, children }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function Input({ label, type, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-gray-400 text-sm mb-2 block">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none transition-all" 
      />
    </div>
  );
}

