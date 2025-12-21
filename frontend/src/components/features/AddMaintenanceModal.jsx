import { useState } from 'react';
import { maintenanceService } from '../../services/maintenance';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import toast from 'react-hot-toast';

export const AddMaintenanceModal = ({ isOpen, onClose, vehicleId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    maintenance_type: 'oil_change',
    maintenance_date: new Date().toISOString().split('T')[0],
    next_maintenance_date: '',
    cost: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await maintenanceService.create(vehicleId, formData);
      setFormData({
        maintenance_type: 'oil_change',
        maintenance_date: new Date().toISOString().split('T')[0],
        next_maintenance_date: '',
        cost: '',
        notes: '',
      });
      onSuccess();
    } catch (error) {
      const validationErrors = error.response?.data?.errors || {};
      setErrors(validationErrors);
      toast.error(error.response?.data?.message || 'Échec de l\'ajout de la maintenance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un Enregistrement de Maintenance">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Type de Maintenance
          </label>
          <select
            name="maintenance_type"
            value={formData.maintenance_type}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="oil_change">Vidange d'Huile</option>
            <option value="tires">Pneus</option>
            <option value="inspection">Inspection</option>
            <option value="brake_service">Service de Freins</option>
            <option value="battery_replacement">Remplacement de Batterie</option>
            <option value="other">Autre</option>
          </select>
          {errors.maintenance_type && (
            <p className="text-sm text-red-600">{errors.maintenance_type[0]}</p>
          )}
        </div>

        <Input
          label="Date de Maintenance"
          name="maintenance_date"
          type="date"
          value={formData.maintenance_date}
          onChange={handleChange}
          error={errors.maintenance_date?.[0]}
          required
        />

        <Input
          label="Prochaine Date de Maintenance (Optionnel)"
          name="next_maintenance_date"
          type="date"
          value={formData.next_maintenance_date}
          onChange={handleChange}
          error={errors.next_maintenance_date?.[0]}
        />

        <Input
          label="Coût"
          name="cost"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={formData.cost}
          onChange={handleChange}
          error={errors.cost?.[0]}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Notes (Optionnel)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="input-field resize-none"
            placeholder="Notes supplémentaires à propos de cette maintenance..."
          />
          {errors.notes && (
            <p className="text-sm text-red-600">{errors.notes[0]}</p>
          )}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="flex-1"
          >
            Ajouter la Maintenance
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Annuler
          </Button>
        </div>
      </form>
    </Modal>
  );
};
