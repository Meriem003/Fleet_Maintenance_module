import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Calendar, Car, ChevronRight, X } from 'lucide-react';
import { maintenanceService } from '../../services/maintenance';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';

export const MaintenanceAlerts = () => {
  const [overdueMaintenances, setOverdueMaintenances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadOverdueMaintenances();
  }, []);

  const loadOverdueMaintenances = async () => {
    try {
      const response = await maintenanceService.getAllOverdue();
      setOverdueMaintenances(response.data || []);
    } catch (error) {
      console.error('Failed to load overdue maintenances:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDaysOverdue = (dateString) => {
    if (!dateString) return 0;
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = today - date;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMaintenanceTypeLabel = (type) => {
    const types = {
      oil_change: "Vidange d'Huile",
      tires: "Pneus",
      inspection: "Inspection",
      brake_service: "Service de Freins",
      battery_replacement: "Remplacement de Batterie",
      other: "Autre"
    };
    return types[type] || type;
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-20 bg-gray-200 rounded"></div>
      </Card>
    );
  }

  if (overdueMaintenances.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-white hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="flex-shrink-0"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </motion.div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">
                  Alertes de Maintenance
                </h3>
                <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-sm">
                  {overdueMaintenances.length}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {overdueMaintenances.length} maintenance{overdueMaintenances.length > 1 ? 's' : ''} en retard nécessit{overdueMaintenances.length > 1 ? 'ent' : 'e'} votre attention
              </p>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    {overdueMaintenances.slice(0, 5).map((maintenance, index) => {
                      const daysOverdue = getDaysOverdue(maintenance.next_maintenance_date);
                      
                      return (
                        <motion.div
                          key={maintenance.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => navigate(`/vehicles/${maintenance.vehicle_id}`)}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-red-200 hover:border-red-400 hover:shadow-md transition-all cursor-pointer group"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <Car className="w-4 h-4 text-red-600" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-gray-900 truncate">
                                {maintenance.vehicle?.plate_number} - {maintenance.vehicle?.model}
                              </p>
                              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
                                {daysOverdue} jour{daysOverdue > 1 ? 's' : ''} de retard
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-600">
                              <span className="font-medium">{getMaintenanceTypeLabel(maintenance.maintenance_type)}</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Prévu: {formatDate(maintenance.next_maintenance_date)}
                              </span>
                            </div>
                          </div>
                          
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors flex-shrink-0" />
                        </motion.div>
                      );
                    })}
                    
                    {overdueMaintenances.length > 5 && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => navigate('/vehicles')}
                        className="w-full text-center py-2 text-sm text-red-600 hover:text-red-700 font-medium hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Voir toutes les alertes ({overdueMaintenances.length - 5} de plus)
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-shrink-0 ml-2 p-2 hover:bg-red-100 rounded-lg transition-colors"
            aria-label={expanded ? "Réduire" : "Développer"}
          >
            <motion.div
              animate={{ rotate: expanded ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.div>
          </button>
        </div>
      </Card>
    </motion.div>
  );
};
