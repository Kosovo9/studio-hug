import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function Analytics() {
  const [data, setData] = useState({
    revenue: [],
    visitors: [],
    conversion: [],
    spaces: []
  });

  useEffect(() => {
    const mockData = {
      revenue: Array.from({ length: 12 }, (_, i) => ({ name: `M${i+1}`, value: Math.random() * 3000 })),
      visitors: Array.from({ length: 7 }, (_, i) => ({ name: `D${i+1}`, value: Math.random() * 500 })),
      conversion: [
        { name: 'Conversión', value: 65 },
        { name: 'Pendiente', value: 35 }
      ],
      spaces: [
        { name: 'Activos', value: 8 },
        { name: 'Inactivos', value: 2 }
      ]
    };
    setData(mockData);
  }, []);

  return (
    <>
      <SEOHead locale="es-mx" />
      <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a1f35] to-[#0f1419] relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-4">
              📊 Analytics Avanzados
            </h1>
            <p className="text-gray-300 text-lg">Visualiza tu desempeño en tiempo real</p>
          </motion.div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {[
              { icon: DollarSign, label: 'Revenue', value: '$24.5K', trend: '+12%' },
              { icon: Users, label: 'Visitantes', value: '3,241', trend: '+8%' },
              { icon: Zap, label: 'Conversión', value: '3.2%', trend: '+0.5%' },
              { icon: TrendingUp, label: 'Growth', value: '+156%', trend: 'YoY' }
            ].map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-blue-500/30 transition-all"
              >
                <kpi.icon className="text-blue-400 mb-4" size={28} />
                <p className="text-gray-400 text-sm">{kpi.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{kpi.value}</p>
                <p className="text-green-400 text-xs mt-2">{kpi.trend}</p>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Revenue Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Revenue por Mes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.revenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1f35', border: 'none', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Visitors Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Visitantes por Día</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.visitors}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip contentStyle={{ backgroundColor: '#1a1f35', border: 'none', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-8">
            {/* Conversion Pie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Tasa de Conversión</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data.conversion} cx="50%" cy="50%" outerRadius={70} fill="#8884d8" dataKey="value">
                    <Cell fill="#3b82f6" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Spaces Pie */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Estado de Spaces</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={data.spaces} cx="50%" cy="50%" outerRadius={70} fill="#8884d8" dataKey="value">
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
