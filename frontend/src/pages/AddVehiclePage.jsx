import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicles';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const AddVehiclePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    plate_number: '',
    model: '',
    year: new Date().getFullYear(),
    status: 'active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await vehicleService.create(formData);
      toast.success('Véhicule ajouté avec succès');
      navigate('/vehicles');
    } catch (error) {
      const validationErrors = error.response?.data?.errors || {};
      setErrors(validationErrors);
      toast.error(error.response?.data?.message || 'Échec de l\'ajout du véhicule');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Back Button */}
      <button
        onClick={() => navigate('/vehicles')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour aux Véhicules
      </button>

      {/* Form Card */}
      <Card>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Ajouter un Nouveau Véhicule</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Numéro de Plaque"
            name="plate_number"
            placeholder="ABC-1234"
            value={formData.plate_number}
            onChange={handleChange}
            error={errors.plate_number?.[0]}
            required
          />

          <Input
            label="Modèle"
            name="model"
            placeholder="Toyota Camry"
            value={formData.model}
            onChange={handleChange}
            error={errors.model?.[0]}
            required
          />

          <Input
            label="Année"
            name="year"
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={handleChange}
            error={errors.year?.[0]}
            required
          />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Statut
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-white border border-gray-300 focus:border-blue-500 hover:border-gray-400 rounded-xl text-gray-900 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 hover:bg-gray-50 cursor-pointer"
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="font-medium">⚠</span> {errors.status[0]}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="flex-1"
            >
              Ajouter le Véhicule
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/vehicles')}
              className="flex-1"
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
