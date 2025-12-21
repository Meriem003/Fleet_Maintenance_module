import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicles';
import { VehicleCard } from '../components/features/VehicleCard';
import { SkeletonCard } from '../components/common/SkeletonCard';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Button } from '../components/common/Button';
import { Plus, Search, Filter, X, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export const VehiclesListPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [maintenanceFilter, setMaintenanceFilter] = useState('all');
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, vehicleId: null });
  
  const navigate = useNavigate();

  useEffect(() => {
    loadVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadVehicles = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await vehicleService.getAll();
      setVehicles(data.data || []);
      if (isRefresh) {
        toast.success('Véhicules actualisés !', {
          icon: '🔄',
          style: {
            borderRadius: '12px',
            background: '#10b981',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('Échec du chargement des véhicules', {
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDeleteVehicle = async (id) => {
    try {
      await vehicleService.delete(id);
      toast.success('Véhicule supprimé avec succès !', {
        style: {
          borderRadius: '12px',
          background: '#10b981',
          color: '#fff',
        },
      });
      loadVehicles();
    } catch (error) {
      toast.error('Échec de la suppression du véhicule', {
        style: {
          borderRadius: '12px',
          background: '#ef4444',
          color: '#fff',
        },
      });
    }
  };

  // Filter vehicles
  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = 
      vehicle.plate_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || vehicle.status === statusFilter;
    
    const matchesMaintenance = 
      maintenanceFilter === 'all' ||
      (maintenanceFilter === 'overdue' && vehicle.has_overdue_maintenance) ||
      (maintenanceFilter === 'ok' && !vehicle.has_overdue_maintenance);

    return matchesSearch && matchesStatus && matchesMaintenance;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setMaintenanceFilter('all');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || maintenanceFilter !== 'all';

  return (
    <div className="page-container">
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="page-title gradient-text">
            Flotte de Véhicules
          </h1>
          <p className="page-subtitle">
            {loading ? 'Chargement...' : `${filteredVehicles.length} sur ${vehicles.length} véhicules`}
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => loadVehicles(true)}
            variant="secondary"
            icon={RefreshCw}
            disabled={refreshing}
            size="sm"
          >
            {refreshing ? 'Actualisation...' : 'Actualiser'}
          </Button>
          <Button
            onClick={() => navigate('/vehicles/new')}
            icon={Plus}
          >
            Ajouter un Véhicule
          </Button>
        </div>
      </motion.div>

      {/* Premium Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card mb-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Filtres</h3>
            <p className="text-sm text-gray-600">Affiner votre recherche</p>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Effacer
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher par plaque ou modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field appearance-none cursor-pointer"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Maintenance Filter */}
          <div className="relative">
            <select
              value={maintenanceFilter}
              onChange={(e) => setMaintenanceFilter(e.target.value)}
              className="input-field appearance-none cursor-pointer"
            >
              <option value="all">Toutes les maintenances</option>
              <option value="overdue">En retard</option>
              <option value="ok">À jour</option>
            </select>
            <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Vehicles Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : filteredVehicles.length === 0 ? (
        <EmptyState
          icon={vehicles.length === 0 ? Plus : Search}
          title={vehicles.length === 0 ? "Aucun véhicule" : "Aucun véhicule trouvé"}
          description={
            vehicles.length === 0
              ? "Commencez par ajouter votre premier véhicule à la flotte"
              : "Essayez d'ajuster vos filtres ou critères de recherche"
          }
          action={vehicles.length === 0 ? () => navigate('/vehicles/new') : clearFilters}
          actionLabel={vehicles.length === 0 ? "Ajouter votre premier véhicule" : "Effacer les filtres"}
          actionIcon={vehicles.length === 0 ? Plus : X}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <VehicleCard
                vehicle={vehicle}
                onDelete={(id) => setDeleteDialog({ isOpen: true, vehicleId: id })}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, vehicleId: null })}
        onConfirm={() => handleDeleteVehicle(deleteDialog.vehicleId)}
        title="Supprimer le véhicule ?"
        message="Êtes-vous sûr de vouloir supprimer ce véhicule ? Cette action est irréversible et supprimera tous les enregistrements de maintenance associés."
        confirmText="Supprimer le véhicule"
        cancelText="Annuler"
        variant="danger"
      />
    </div>
  );
};
