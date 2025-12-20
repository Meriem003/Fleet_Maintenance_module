import api from './api';

export const vehicleService = {
  async getAll() {
    const response = await api.get('/vehicles');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/vehicles/${id}`);
    return response.data.data;
  },

  async create(data) {
    const response = await api.post('/vehicles', data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`/vehicles/${id}`, data);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/vehicles/${id}`);
    return response.data;
  },
};
