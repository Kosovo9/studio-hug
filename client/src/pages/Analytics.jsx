import { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Zap } from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState({
    revenue: [],
    visitors: [],
    conversion: [],
    spaces: []
  });

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    const response = await fetch('/api/analytics/dashboard/user123');
    const analytics = await response.json();
    setData(analytics);
  }

  const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">📊 Analytics Dashboard</h1>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<DollarSign size={24} />} label="Revenue Total" value="$15,234" color="green" />
          <StatCard icon={<Users size={24} />} label="Total Visitantes" value="45,231" color="blue" />
          <StatCard icon={<Zap size={24} />} label="Conversión Avg" value="3.2%" color="purple" />
          <StatCard icon={<TrendingUp size={24} />} label="Crecimiento" value="+125%" color="pink" />
        </div>
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Revenue por Día">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.revenue || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #8B5CF6' }} />
                <Line type="monotone" dataKey="amount" stroke="#8B5CF6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Visitantes por Space">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.spaces || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #8B5CF6' }} />
                <Bar dataKey="visitors" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
        <ChartCard title="Distribución de Revenue por Space">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data.spaces || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
                dataKey="revenue"
              >
                {(data.spaces || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-pink-600',
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

function ChartCard({ title, children }) {
  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

