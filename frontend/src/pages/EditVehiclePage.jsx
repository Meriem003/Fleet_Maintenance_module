import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { vehicleService } from '../services/vehicles';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    plate_number: '',
    model: '',
    year: '',
    status: 'active',
  });

  useEffect(() => {
    loadVehicle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadVehicle = async () => {
    try {
      const data = await vehicleService.getById(id);
      setFormData({
        plate_number: data.plate_number,
        model: data.model,
        year: data.year,
        status: data.status,
      });
    } catch (error) {
      toast.error('Échec du chargement du véhicule');
      navigate('/vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      await vehicleService.update(id, formData);
      toast.success('Véhicule mis à jour avec succès');
      navigate(`/vehicles/${id}`);
    } catch (error) {
      const validationErrors = error.response?.data?.errors || {};
      setErrors(validationErrors);
      toast.error(error.response?.data?.message || 'Échec de la mise à jour du véhicule');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Chargement du véhicule..." />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <button
        onClick={() => navigate(`/vehicles/${id}`)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour aux Détails du Véhicule
      </button>

      <Card>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Modifier le Véhicule</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Numéro de Plaque"
            name="plate_number"
            value={formData.plate_number}
            onChange={handleChange}
            error={errors.plate_number?.[0]}
            required
          />

          <Input
            label="Modèle"
            name="model"
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

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">
              Statut
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input-field"
            >
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status[0]}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={submitting}
              className="flex-1"
            >
              Mettre à Jour le Véhicule
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/vehicles/${id}`)}
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
