import api from './api';

export const maintenanceService = {
  async getByVehicle(vehicleId) {
    const response = await api.get(`/vehicles/${vehicleId}/maintenance`);
    return response.data;
  },

  async create(vehicleId, data) {
    const response = await api.post(`/vehicles/${vehicleId}/maintenance`, data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/maintenance/${id}`, data);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/maintenance/${id}`);
    return response.data;
  },
};
