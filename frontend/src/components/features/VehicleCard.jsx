import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Car, Calendar, AlertTriangle, Edit, Trash2, Eye } from 'lucide-react';

export const VehicleCard = ({ vehicle, onDelete }) => {
  const navigate = useNavigate();

  return (
    <Card hoverable className="cursor-pointer group">
      <div onClick={() => navigate(`/vehicles/${vehicle.id}`)}>
        {/* Header with Status Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              {vehicle.plate_number}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{vehicle.model}</p>
          </div>
          <Badge variant={vehicle.status === 'active' ? 'success' : 'danger'}>
            {vehicle.status}
          </Badge>
        </div>

        {/* Vehicle Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Year: {vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Car className="w-4 h-4" />
            <span>{vehicle.maintenances_count || 0} maintenance records</span>
          </div>
        </div>

        {/* Alert Banner */}
        {vehicle.has_overdue_maintenance && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-red-700 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">Overdue Maintenance</span>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4 border-t border-gray-100">
        <button
          onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          className="flex-1 px-3 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/vehicles/${vehicle.id}/edit`);
          }}
          className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(vehicle.id);
          }}
          className="flex-1 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </Card>
  );
};
