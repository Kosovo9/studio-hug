import { useState, useEffect } from 'react';
import { Copy, TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function Affiliates() {
  const [affiliateCode, setAffiliateCode] = useState('');
  const [stats, setStats] = useState({ totalEarnings: 0, totalConversions: 0, pendingPayment: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadAffiliateData();
  }, []);

  const loadAffiliateData = async () => {
    const code = localStorage.getItem('affiliateCode');
    if (code) {
      setAffiliateCode(code);
      const { data } = await fetch(`/api/affiliates/stats/${code}`).then(r => r.json());
      setStats(data);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(affiliateCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <SEOHead title="Affiliates Program" description="Join our affiliate program and earn commissions" />
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
              🚀 Programa de Afiliados
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
              Gana comisiones generosas compartiendo Studio HUG con tu audiencia
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Total Earnings */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-900/40 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-300" />
                </div>
                <span className="text-green-400 text-sm font-semibold">↑ 12%</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Ingresos Totales</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">${stats.totalEarnings || '0'}</p>
            </motion.div>

            {/* Total Conversions */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-purple-900/40 to-purple-900/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-300" />
                </div>
                <span className="text-green-400 text-sm font-semibold">↑ 8%</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Conversiones</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">{stats.totalConversions || '0'}</p>
            </motion.div>

            {/* Pending Payment */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-cyan-900/40 to-cyan-900/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-cyan-500/20 p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-cyan-300" />
                </div>
                <span className="text-yellow-400 text-sm font-semibold">⏳ Pendiente</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">Pago Pendiente</p>
              <p className="text-2xl sm:text-3xl font-bold text-white">${stats.pendingPayment || '0'}</p>
            </motion.div>
          </motion.div>

          {/* Affiliate Code Section */}
          <motion.div
            className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-blue-500/30 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-blue-400" />
              Tu Código de Afiliado
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-black/30 border border-blue-500/30 rounded-lg px-4 py-3 font-mono text-blue-300 break-all">
                {affiliateCode || 'Cargando...'}
              </div>
              <button
                onClick={copyCode}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white'
                }`}
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </motion.div>

          {/* Commission Structure */}
          <motion.div
            className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-xl rounded-2xl p-8 sm:p-10 border border-purple-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-2">
              <Zap className="w-7 h-7 text-purple-400" />
              Estructura de Comisiones
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { tier: 'Básico', commission: '15%', description: 'Hasta 10 referencias' },
                { tier: 'Profesional', commission: '20%', description: '11-50 referencias' },
                { tier: 'Premium', commission: '25%', description: '50+ referencias' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="bg-black/20 border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-400/40 transition-all"
                  whileHover={{ y: -5 }}
                >
                  <p className="text-gray-400 text-sm mb-2">{item.tier}</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
                    {item.commission}
                  </p>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
