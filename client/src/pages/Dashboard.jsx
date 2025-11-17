import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Zap } from 'lucide-react';
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
    // Cargar estadísticas
    fetch('/api/analytics/dashboard/user123')
      .then(res => res.json())
      .then(data => {
        setStats({
          revenue: data.totalRevenue || 0,
          spaces: data.totalSpaces || 0,
          visitors: data.totalVisitors || 0,
          growth: data.growth || 0
        });
      });
  }, []);

  return (
    <>
      <SEOHead locale="es-mx" />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <nav className="bg-black/30 backdrop-blur-xl border-b border-purple-500/20 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              NEXORA-HUG 🚀
            </h1>
            <div className="flex gap-4">
              <Link to="/spaces" className="text-white hover:text-purple-400">Spaces</Link>
              <Link to="/analytics" className="text-white hover:text-purple-400">Analytics</Link>
              <Link to="/affiliates" className="text-white hover:text-purple-400">Afiliados</Link>
              <Link to="/settings" className="text-white hover:text-purple-400">Settings</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard 
              icon={<DollarSign size={24} />}
              label="Revenue Mensual"
              value={`$${stats.revenue.toLocaleString()} MXN`}
              color="green"
            />
            <StatCard 
              icon={<Zap size={24} />}
              label="Spaces Activos"
              value={stats.spaces}
              color="purple"
            />
            <StatCard 
              icon={<Users size={24} />}
              label="Visitantes"
              value={stats.visitors.toLocaleString()}
              color="blue"
            />
            <StatCard 
              icon={<TrendingUp size={24} />}
              label="Crecimiento"
              value={`+${stats.growth}%`}
              color="pink"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Meta: $30K MXN/mes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/spaces">
                <ActionButton label="Crear Nuevo Space" color="purple" />
              </Link>
              <Link to="/analytics">
                <ActionButton label="Ver Analytics" color="blue" />
              </Link>
              <Link to="/pricing">
                <ActionButton label="Optimizar Revenue" color="green" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-pink-600',
    blue: 'from-blue-500 to-cyan-600',
    pink: 'from-pink-500 to-rose-600'
  };

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

function ActionButton({ label, color }) {
  const colorClasses = {
    purple: 'from-purple-500 to-pink-600',
    blue: 'from-blue-500 to-cyan-600',
    green: 'from-green-500 to-emerald-600'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full bg-gradient-to-r ${colorClasses[color]} text-white px-6 py-3 rounded-xl font-semibold`}
    >
      {label}
    </motion.button>
  );
}

