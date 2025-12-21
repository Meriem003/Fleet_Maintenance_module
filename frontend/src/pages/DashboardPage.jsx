import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicles';
import { StatCard } from '../components/common/StatCard';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { Button } from '../components/common/Button';
import { 
  Car, Plus, AlertTriangle, CheckCircle, Activity,
  TrendingUp, Calendar, Wrench, Eye, XCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    overdueMaintenances: 0,
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    loadVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadVehicles = async () => {
    try {
      const data = await vehicleService.getAll();
      const vehiclesList = data.data || [];

      // Calculate stats
      const active = vehiclesList.filter(v => v.status === 'active').length;
      const inactive = vehiclesList.filter(v => v.status === 'inactive').length;
      const overdue = vehiclesList.filter(v => v.has_overdue_maintenance).length;

      setStats({
        total: vehiclesList.length,
        active,
        inactive,
        overdueMaintenances: overdue,
      });
    } catch (error) {
      toast.error('Failed to load vehicles', {
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Animated Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="page-title text-gray-900">
            Fleet Management Dashboard
          </h1>
          <p className="page-subtitle flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Real-time monitoring and analytics
          </p>
        </div>
        <Button
          onClick={() => navigate('/vehicles')}
          icon={Car}
        >
          View All Vehicles
        </Button>
      </motion.div>

      {/* Stats Grid with Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard
              title="Total Vehicles"
              value={stats.total}
              icon={Car}
              color="blue"
              trend="up"
              trendValue="+12%"
              delay={0}
            />
            
            <StatCard
              title="Active Vehicles"
              value={stats.active}
              icon={CheckCircle}
              color="green"
              trend="up"
              trendValue="+5%"
              delay={0.1}
            />
            
            <StatCard
              title="Inactive Vehicles"
              value={stats.inactive}
              icon={XCircle}
              color="purple"
              delay={0.2}
            />
            
            <StatCard
              title="Overdue Maintenance"
              value={stats.overdueMaintenances}
              icon={AlertTriangle}
              color="red"
              trend={stats.overdueMaintenances > 0 ? "down" : "up"}
              trendValue={stats.overdueMaintenances > 0 ? "Needs attention" : "All good"}
              delay={0.3}
            />
          </>
        )}
      </div>

      {/* Alert Section - Enhanced */}
      {!loading && stats.overdueMaintenances > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="alert alert-danger mb-8"
        >
          <AlertTriangle className="w-6 h-6 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">
              Attention Required
            </h3>
            <p className="mb-3">
              You have <span className="font-bold">{stats.overdueMaintenances}</span> vehicle(s) with overdue maintenance. 
              Please check and schedule maintenance as soon as possible to avoid potential issues.
            </p>
            <Button
              variant="danger"
              size="sm"
              onClick={() => navigate('/vehicles')}
              icon={Eye}
            >
              View Overdue Vehicles
            </Button>
          </div>
        </motion.div>
      )}

      {/* Quick Actions - Premium Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-slate-700" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/vehicles/new')}
            className="card card-hover p-8 text-left group relative overflow-hidden"
          >
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Plus className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Add New Vehicle</h3>
              <p className="text-sm text-gray-600">Register a new vehicle to your fleet management system</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/vehicles')}
            className="card card-hover p-8 text-left group relative overflow-hidden"
          >
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Car className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">View All Vehicles</h3>
              <p className="text-sm text-gray-600">Browse, search, and manage all vehicles in your fleet</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/vehicles')}
            className="card card-hover p-8 text-left group relative overflow-hidden"
          >
            {/* Gradient Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Maintenance Schedule</h3>
              <p className="text-sm text-gray-600">Check and manage upcoming maintenance schedules</p>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Additional Info Section */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Fleet Health */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Fleet Health</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Rate</span>
                <span className="text-sm font-bold text-slate-700">
                  {stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-slate-700 to-slate-900 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.active / stats.total) * 100 : 0}%` }}
                />
              </div>
              
              <div className="pt-2 flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-slate-700" />
                <span>{stats.active} active of {stats.total} total vehicles</span>
              </div>
            </div>
          </div>

          {/* Maintenance Status */}
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Maintenance Status</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Overdue Items</span>
                <span className="text-sm font-bold text-rose-600">
                  {stats.overdueMaintenances}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-rose-500 to-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${stats.total > 0 ? (stats.overdueMaintenances / stats.total) * 100 : 0}%` 
                  }}
                />
              </div>
              
              <div className="pt-2 flex items-center gap-2 text-sm text-gray-600">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>
                  {stats.overdueMaintenances > 0 
                    ? `${stats.overdueMaintenances} vehicle${stats.overdueMaintenances > 1 ? 's' : ''} need attention`
                    : 'All maintenance up to date'
                  }
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
