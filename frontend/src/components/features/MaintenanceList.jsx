import { Badge } from '../common/Badge';
import { Calendar, DollarSign, Wrench, Trash2, Edit } from 'lucide-react';
import { format } from 'date-fns';

const maintenanceTypeLabels = {
  oil_change: 'Vidange d\'Huile',
  tires: 'Pneus',
  inspection: 'Inspection',
  brake_service: 'Service de Freins',
  battery_replacement: 'Remplacement de Batterie',
  other: 'Autre',
};

export const MaintenanceList = ({ maintenances, onDelete, onEdit }) => {
  if (maintenances.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wrench className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun enregistrement de maintenance</h3>
        <p className="text-gray-600">Ajoutez votre premier enregistrement de maintenance pour suivre l'historique du véhicule</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      {maintenances.map((maintenance) => (
        <div
          key={maintenance.id}
          className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="info">
                  {maintenanceTypeLabels[maintenance.maintenance_type] || maintenance.maintenance_type}
                </Badge>
                {maintenance.is_overdue && (
                  <Badge variant="danger">En Retard</Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(maintenance.maintenance_date)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-gray-900">${parseFloat(maintenance.cost).toFixed(2)}</span>
                </div>

                {maintenance.next_maintenance_date && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Prochaine : {formatDate(maintenance.next_maintenance_date)}</span>
                  </div>
                )}
              </div>

              {maintenance.notes && (
                <p className="text-sm text-gray-600 mt-2 italic">{maintenance.notes}</p>
              )}
            </div>

            <div className="flex items-center gap-2 ml-4">
              {onEdit && (
                <button
                  onClick={() => onEdit(maintenance)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Modifier l'enregistrement de maintenance"
                >
                  <Edit className="w-5 h-5" />
                </button>
              )}
              
              <button
                onClick={() => onDelete(maintenance.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Supprimer l'enregistrement de maintenance"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
