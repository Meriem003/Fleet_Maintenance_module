import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../common/Badge';
import { Car, Calendar, AlertTriangle, Edit, Trash2, Eye, Gauge } from 'lucide-react';

export const VehicleCard = ({ vehicle, onDelete }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="card card-hover group relative overflow-hidden"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Status Indicator Dot */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`w-3 h-3 rounded-full ${
          vehicle.status === 'active' ? 'bg-emerald-500 shadow-glow-green' : 'bg-gray-400'
        } animate-pulse`} />
      </div>

      <div onClick={() => navigate(`/vehicles/${vehicle.id}`)} className="cursor-pointer relative z-10">
        {/* Header Section */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${
              vehicle.status === 'active' 
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500' 
                : 'bg-gradient-to-br from-gray-400 to-gray-500'
            }`}>
              <Car className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                {vehicle.plate_number}
              </h3>
              <Badge variant={vehicle.status === 'active' ? 'success' : 'gray'} className="mt-1">
                <span className="status-dot mr-1 w-2 h-2 rounded-full bg-current" />
                {vehicle.status === 'active' ? 'Actif' : 'Inactif'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Gauge className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Modèle</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{vehicle.model}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-medium">Année</span>
            </div>
            <span className="text-sm font-bold text-gray-900">{vehicle.year}</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Car className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Maintenance</span>
            </div>
            <span className="text-sm font-bold text-blue-900">
              {vehicle.maintenances_count || 0} enregistrement{(vehicle.maintenances_count || 0) > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Alert Banner */}
        {vehicle.has_overdue_maintenance && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500 rounded-lg mb-4 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, -10, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              </motion.div>
              <span className="text-sm font-bold text-red-800">
                {vehicle.overdue_maintenance_count || 1} maintenance{(vehicle.overdue_maintenance_count || 1) > 1 ? 's' : ''} en retard !
              </span>
            </div>
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              Urgent
            </span>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t-2 border-gray-100 relative z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          className="flex-1 px-3 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Voir
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/vehicles/${vehicle.id}/edit`);
          }}
          className="flex-1 px-3 py-2.5 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Modifier
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(vehicle.id);
          }}
          className="px-3 py-2.5 text-sm font-semibold text-red-600 bg-red-50 border-2 border-red-200 hover:bg-red-100 hover:border-red-300 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
};
