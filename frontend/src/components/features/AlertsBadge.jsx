import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, X } from 'lucide-react';
import { maintenanceService } from '../../services/maintenance';
import { useNavigate } from 'react-router-dom';

export const AlertsBadge = () => {
  const [alertsCount, setAlertsCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [overdueMaintenances, setOverdueMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAlerts();
    // Rafraîchir les alertes toutes les 5 minutes
    const interval = setInterval(loadAlerts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadAlerts = async () => {
    try {
      const [summaryResponse, overdueResponse] = await Promise.all([
        maintenanceService.getAlertsSummary(),
        maintenanceService.getAllOverdue()
      ]);
      
      setAlertsCount(summaryResponse.data.overdue_count);
      setOverdueMaintenances(overdueResponse.data || []);
    } catch (error) {
      console.error('Failed to load alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVehicleClick = (vehicleId) => {
    setShowDropdown(false);
    navigate(`/vehicles/${vehicleId}`);
  };

  if (loading || alertsCount === 0) {
    return null;
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 hover:bg-red-50 rounded-lg transition-colors group"
      >
        <Bell className="w-5 h-5 text-gray-700 group-hover:text-red-600 transition-colors" />
        
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
        >
          {alertsCount > 9 ? '9+' : alertsCount}
        </motion.span>

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-400 rounded-lg opacity-20 group-hover:opacity-30"
        />
      </motion.button>

      <AnimatePresence>
        {showDropdown && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDropdown(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Alertes de Maintenance</h3>
                    <p className="text-white/80 text-sm">{alertsCount} maintenance{alertsCount > 1 ? 's' : ''} en retard</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDropdown(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* List */}
              <div className="max-h-96 overflow-y-auto">
                {overdueMaintenances.slice(0, 10).map((maintenance, index) => {
                  const nextMaintenanceDate = new Date(maintenance.next_maintenance_date);
                  const daysOverdue = Math.ceil(
                    (Date.now() - nextMaintenanceDate.getTime()) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <motion.div
                      key={maintenance.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleVehicleClick(maintenance.vehicle_id)}
                      className="p-4 border-b border-gray-100 hover:bg-red-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {maintenance.vehicle?.plate_number}
                            </p>
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                              {daysOverdue} jour{daysOverdue > 1 ? 's' : ''}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">
                            {maintenance.vehicle?.model}
                          </p>
                          <p className="text-xs text-gray-500">
                            Maintenance prévue: {new Date(maintenance.next_maintenance_date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {overdueMaintenances.length > 10 && (
                  <div className="p-4 text-center bg-gray-50">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/vehicles');
                      }}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Voir toutes les alertes ({overdueMaintenances.length - 10} de plus)
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
