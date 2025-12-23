import apiClient from './client';

export interface Service {
  _id: string;
  title: string;
  image: string;
  description?: string;
  priceList?: Array<{
    title: string;
    price: number;
    description?: string;
    subCategory?: any[];
  }>;
  subcategories?: Array<{
    name: string;
    price: number;
    description?: string;
  }>;
}

export interface CreateServicePayload {
  title: string;
  image: string;
  description?: string;
  priceList?: any[];
  subcategories?: any[];
}

export interface UpdateServicePayload extends Partial<CreateServicePayload> {
  _id?: string;
}

const serviceApi = {
  // Get all services/categories
  getAllServices: async (): Promise<{ code: number; data: Service[] }> => {
    return await apiClient.get('/service/v1/get-all-services');
  },

  // Get single service by ID or title
  getService: async (params: { id?: string; title?: string }) => {
    const query = params.id ? `id=${params.id}` : `title=${params.title}`;
    return await apiClient.get(`/service/v1/get-service?${query}`);
  },

  // Create new service (admin)
  createService: async (payload: CreateServicePayload) => {
    return await apiClient.post('/service/v1/create-service', payload);
  },

  // Update service (admin)
  updateService: async (id: string, payload: UpdateServicePayload) => {
    return await apiClient.patch(`/service/v1/update-service/${id}`, payload);
  },

  // Delete service (admin)
  deleteService: async (id: string) => {
    return await apiClient.delete(`/service/v1/delete-service/${id}`);
  },
};

export default serviceApi;
