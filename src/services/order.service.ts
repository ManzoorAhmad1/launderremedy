import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const orderService = {
  // Get available collection times
  getCollectionTimes: async (date: string) => {
    try {
      const response = await axios.get(`${API_URL}/orders/collection-times`, {
        params: { date },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get available delivery times
  getDeliveryTimes: async (date: string) => {
    try {
      const response = await axios.get(`${API_URL}/orders/delivery-times`, {
        params: { date },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get categories list
  getCategoriesList: async () => {
    try {
      const response = await axios.get(`${API_URL}/services/categories`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new order
  createOrder: async (orderData: any) => {
    try {
      const response = await axios.post(`${API_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update existing order
  updateOrder: async (orderData: any) => {
    try {
      const response = await axios.put(`${API_URL}/orders/${orderData.order_id}`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user orders
  getUserOrders: async (userId: string) => {
    try {
      const response = await axios.get(`${API_URL}/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (orderId: string) => {
    try {
      const response = await axios.put(`${API_URL}/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;