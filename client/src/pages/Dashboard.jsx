import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Zap, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    spaces: 0,
    visitors: 0,
    growth: 0
  });

  useEffect(() => {
    fetch('/api/analytics/dashboard/user123')
      .then(res => res.json())
      .then(data => {
        setStats({
          revenue: data.totalRevenue || 0,
          spaces: data.totalSpaces || 0,
          visitors: data.totalVisitors || 0,
          growth: data.growth || 0
        });
      })
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <>
      <SEOHead locale="es-mx" />
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f35] to-[#0f1419] relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 sm:mb-16 lg:mb-20"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-yellow-300 bg-clip-text text-transparent mb-4 sm:mb-6">
              📊 Dashboard de Éxito
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl">
              Impulsa tu negocio al siguiente nivel con nuestras herramientas IA de última generación
            </p>
          </motion.div>

          {/* STATS CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <StatCard
              icon={<DollarSign size={28} />}
              label="Revenue Mensual"
              value={`$${(stats.revenue || 0).toLocaleString()}`}
              color="green"
              delay={0}
            />
            <StatCard
              icon={<Zap size={28} />}
              label="Spaces Activos"
              value={stats.spaces || 0}
              color="purple"
              delay={0.1}
            />
            <StatCard
              icon={<Users size={28} />}
              label="Visitantes"
              value={(stats.visitors || 0).toLocaleString()}
              color="blue"
              delay={0.2}
            />
            <StatCard
              icon={<TrendingUp size={28} />}
              label="Crecimiento"
              value={`+${stats.growth || 0}%`}
              color="yellow"
              delay={0.3}
            />
          </div>

          {/* GOAL SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl border border-blue-500/30 p-6 sm:p-8 mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">🎯 Meta: $30K MXN/mes</h2>
                <p className="text-gray-300">Avance hacia tu objetivo financiero</p>
              </div>
              <div className="w-full sm:w-auto">
                <div className="w-full sm:w-48 h-2 bg-black/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-yellow-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <ActionButtonLink to="/spaces" label="✨ Crear Nuevo Space" color="purple" delay={0.5} />
            <ActionButtonLink to="/analytics" label="📈 Ver Analytics" color="blue" delay={0.6} />
            <ActionButtonLink to="/pricing" label="💰 Optimizar Revenue" color="green" delay={0.7} />
          </div>

          {/* TESTIMONIAL SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 sm:mt-16 bg-gradient-to-r from-yellow-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl border border-yellow-500/20 p-6 sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div>
                <p className="text-gray-200 text-sm sm:text-base mb-4">
                  "Con NEXORA aumenté mis ingresos un 150% en solo 3 meses. Las herramientas IA son increíbles y el soporte es excepcional."
                </p>
                <p className="text-gray-400 text-sm">— Sarah Chen, Founder de Shopify Editions</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon, label, value, color, delay }) {
  const colors = {
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-pink-600',
    blue: 'from-blue-500 to-cyan-600',
    yellow: 'from-yellow-500 to-orange-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-blue-500/30 transition-all duration-300">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colors[color]} flex items-center justify-center mb-4 text-white shadow-lg`}>
          {icon}
        </div>
        <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
        <p className="text-3xl sm:text-4xl font-bold text-white">{value}</p>
        <div className="mt-4 text-xs text-gray-500">+12% vs last month</div>
      </div>
    </motion.div>
  );
}

function ActionButtonLink({ to, label, color, delay }) {
  const colorClasses = {
    purple: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
    blue: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
    green: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <Link to={to}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full bg-gradient-to-r ${colorClasses[color]} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg transition-shadow duration-300 hover:shadow-2xl`}
        >
          {label}
          <ArrowRight size={20} />
        </motion.button>
      </Link>
    </motion.div>
  );
}
