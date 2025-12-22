import api from './api';

export const maintenanceService = {
  // Récupérer toutes les maintenances d'un véhicule
  async getByVehicle(vehicleId) {
    const response = await api.get(`/vehicles/${vehicleId}/maintenance`);
    return response.data;
  },

  // Récupérer une maintenance spécifique
  async getById(vehicleId, maintenanceId) {
    const response = await api.get(`/vehicles/${vehicleId}/maintenance/${maintenanceId}`);
    return response.data;
  },

  // Créer une nouvelle maintenance
  async create(vehicleId, data) {
    const response = await api.post(`/vehicles/${vehicleId}/maintenance`, data);
    return response.data;
  },

  // Mettre à jour une maintenance
  async update(id, data) {
    const response = await api.put(`/maintenance/${id}`, data);
    return response.data;
  },

  // Supprimer une maintenance
  async delete(id) {
    const response = await api.delete(`/maintenance/${id}`);
    return response.data;
  },

  // Récupérer les maintenances en retard
  async getOverdue(vehicleId) {
    const response = await api.get(`/vehicles/${vehicleId}/maintenance/overdue`);
    return response.data;
  },

  // Récupérer les statistiques de maintenance
  async getStats(vehicleId) {
    const response = await api.get(`/vehicles/${vehicleId}/maintenance/stats`);
    return response.data;
  },

  // Récupérer toutes les maintenances en retard (tous véhicules)
  async getAllOverdue() {
    const response = await api.get('/maintenance/overdue/all');
    return response.data;
  },

  // Récupérer le résumé des alertes
  async getAlertsSummary() {
    const response = await api.get('/maintenance/alerts/summary');
    return response.data;
  },
};
