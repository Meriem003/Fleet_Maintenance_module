import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicles';
import { Card } from '../components/common/Card';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Car, Plus, AlertTriangle, CheckCircle } from 'lucide-react';
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
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your fleet management</p>
        </div>
        <button
          onClick={() => navigate('/vehicles')}
          className="btn-primary flex items-center gap-2"
        >
          <Car className="w-5 h-5" />
          View All Vehicles
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Vehicles</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Inactive</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.inactive}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <Car className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Overdue Maintenances</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.overdueMaintenances}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Alert Section */}
      {stats.overdueMaintenances > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">
                Attention Required
              </h3>
              <p className="text-red-700 mt-1">
                You have {stats.overdueMaintenances} vehicle(s) with overdue maintenance. 
                Please check and schedule maintenance as soon as possible.
              </p>
              <button
                onClick={() => navigate('/vehicles')}
                className="mt-3 text-sm font-medium text-red-700 hover:text-red-900 underline"
              >
                View vehicles with overdue maintenance →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/vehicles/new')}
            className="p-6 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-left group"
          >
            <Plus className="w-8 h-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Add New Vehicle</h3>
            <p className="text-sm text-gray-600 mt-1">Register a new vehicle to your fleet</p>
          </button>

          <button
            onClick={() => navigate('/vehicles')}
            className="p-6 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-left group"
          >
            <Car className="w-8 h-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">View All Vehicles</h3>
            <p className="text-sm text-gray-600 mt-1">Browse and manage your vehicles</p>
          </button>

          <button
            onClick={() => navigate('/vehicles')}
            className="p-6 bg-white rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-left group"
          >
            <AlertTriangle className="w-8 h-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Maintenance Alerts</h3>
            <p className="text-sm text-gray-600 mt-1">Check vehicles needing attention</p>
          </button>
        </div>
      </div>
    </div>
  );
};
