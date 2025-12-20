import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicles';
import { maintenanceService } from '../services/maintenance';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { MaintenanceList } from '../components/features/MaintenanceList';
import { AddMaintenanceModal } from '../components/features/AddMaintenanceModal';
import { ArrowLeft, Edit, Trash2, Plus, Calendar, DollarSign, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const VehicleDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [vehicle, setVehicle] = useState(null);
  const [maintenances, setMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    loadVehicleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadVehicleData = async () => {
    try {
      const [vehicleData, maintenanceData] = await Promise.all([
        vehicleService.getById(id),
        maintenanceService.getByVehicle(id),
      ]);
      
      setVehicle(vehicleData);
      setMaintenances(maintenanceData.data || []);
    } catch (error) {
      toast.error('Failed to load vehicle details');
      navigate('/vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      return;
    }

    try {
      await vehicleService.delete(id);
      toast.success('Vehicle deleted successfully');
      navigate('/vehicles');
    } catch (error) {
      toast.error('Failed to delete vehicle');
    }
  };

  const handleMaintenanceAdded = () => {
    loadVehicleData();
    setShowAddModal(false);
    toast.success('Maintenance record added successfully');
  };

  const handleMaintenanceDeleted = async (maintenanceId) => {
    if (!window.confirm('Are you sure you want to delete this maintenance record?')) {
      return;
    }

    try {
      await maintenanceService.delete(maintenanceId);
      toast.success('Maintenance record deleted');
      loadVehicleData();
    } catch (error) {
      toast.error('Failed to delete maintenance record');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading vehicle details..." />;
  }

  if (!vehicle) {
    return null;
  }

  const totalMaintenanceCost = maintenances.reduce((sum, m) => sum + parseFloat(m.cost), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Back Button */}
      <button
        onClick={() => navigate('/vehicles')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Vehicles
      </button>

      {/* Vehicle Header */}
      <Card>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{vehicle.plate_number}</h1>
              <Badge variant={vehicle.status === 'active' ? 'success' : 'danger'}>
                {vehicle.status}
              </Badge>
              {vehicle.has_overdue_maintenance && (
                <Badge variant="warning">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Overdue Maintenance
                </Badge>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-600">Model</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Year</p>
                <p className="text-lg font-semibold text-gray-900">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Maintenance Cost</p>
                <p className="text-lg font-semibold text-gray-900">${totalMaintenanceCost.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/vehicles/${id}/edit`)}
              className="btn-secondary flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn-danger flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      </Card>

      {/* Maintenance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Maintenances</p>
              <p className="text-2xl font-bold text-gray-900">{maintenances.length}</p>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${totalMaintenanceCost.toFixed(2)}</p>
            </div>
          </div>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Cost</p>
              <p className="text-2xl font-bold text-gray-900">
                ${maintenances.length > 0 ? (totalMaintenanceCost / maintenances.length).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Maintenance History */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Maintenance History</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Maintenance
          </button>
        </div>

        <MaintenanceList
          maintenances={maintenances}
          onDelete={handleMaintenanceDeleted}
        />
      </Card>

      {/* Add Maintenance Modal */}
      <AddMaintenanceModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        vehicleId={id}
        onSuccess={handleMaintenanceAdded}
      />
    </div>
  );
};
