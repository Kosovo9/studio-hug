import { useState, useEffect } from 'react';
import { Copy, DollarSign, Users, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Affiliates() {
  const [affiliateCode, setAffiliateCode] = useState('');
  const [stats, setStats] = useState({ totalEarnings: 0, totalConversions: 0, pendingPayment: 0 });

  useEffect(() => {
    loadAffiliateData();
  }, []);

  const loadAffiliateData = async () => {
    const code = localStorage.getItem('affiliateCode');
    if (code) {
      setAffiliateCode(code);
      const { data } = await axios.get(`/api/affiliates/stats/${code}`);
      setStats(data);
    }
  };

  const createAffiliateCode = async () => {
    const { data } = await axios.post('/api/affiliates/create', {
      userId: localStorage.getItem('userId') || 'user123',
      name: 'Mi Código'
    });
    setAffiliateCode(data.affiliateCode);
    localStorage.setItem('affiliateCode', data.affiliateCode);
    loadAffiliateData();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`https://nexora-hug.com/?ref=${affiliateCode}`);
    alert('¡Link copiado!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">💰 Programa de Afiliados</h1>
        
        {!affiliateCode ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={createAffiliateCode}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-xl"
          >
            🚀 Activar Programa de Afiliados (20% comisión)
          </motion.button>
        ) : (
          <>
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 mb-8">
              <p className="text-gray-400 mb-2">Tu link de afiliado:</p>
              <div className="flex gap-4">
                <input 
                  type="text" 
                  value={`https://nexora-hug.com/?ref=${affiliateCode}`}
                  readOnly
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-xl"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyLink}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <Copy size={20} /> Copiar
                </motion.button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard icon={<DollarSign size={24} />} label="Ganancias Totales" value={`$${stats.totalEarnings.toFixed(2)} MXN`} color="green" />
              <StatCard icon={<Users size={24} />} label="Conversiones" value={stats.totalConversions} color="blue" />
              <StatCard icon={<TrendingUp size={24} />} label="Pago Pendiente" value={`$${stats.pendingPayment.toFixed(2)} MXN`} color="purple" />
            </div>
            <div className="mt-8 bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">📅 Próximo Pago: Lunes 9:00 AM</h2>
              <p className="text-gray-400">Mínimo para cobrar: $500 MXN</p>
              <p className="text-green-400 font-bold mt-2">Pagos automáticos vía Wise cada lunes</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = { green: 'from-green-500 to-emerald-600', blue: 'from-blue-500 to-cyan-600', purple: 'from-purple-500 to-pink-600' };
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors[color]} flex items-center justify-center mb-4 text-white`}>
        {icon}
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </motion.div>
  );
}

