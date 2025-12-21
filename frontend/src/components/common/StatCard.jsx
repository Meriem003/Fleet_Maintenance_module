import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  color = 'blue',
  delay = 0 
}) => {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-emerald-500 to-teal-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-amber-500',
    red: 'from-red-500 to-rose-500',
  };

  const bgColors = {
    blue: 'bg-blue-50',
    green: 'bg-emerald-50',
    purple: 'bg-purple-50',
    orange: 'bg-orange-50',
    red: 'bg-rose-50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-3">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-600" />
              )}
              <span className={`text-sm font-semibold ${
                trend === 'up' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {trendValue}
              </span>
              <span className="text-sm text-gray-500">vs mois dernier</span>
            </div>
          )}
        </div>

        <div className={`
          w-14 h-14 rounded-2xl ${bgColors[color]}
          flex items-center justify-center
          group-hover:scale-110 transition-transform duration-300
        `}>
          <div className={`
            w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]}
            flex items-center justify-center
            shadow-lg
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
