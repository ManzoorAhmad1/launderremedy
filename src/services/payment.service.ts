import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const paymentService = {
  // Get Stripe configuration
  getStripeConfig: async () => {
    try {
      const response = await axios.get(`${API_URL}/payment/stripe-config`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create payment intent
  createPaymentIntent: async (orderData: any) => {
    try {
      const response = await axios.post(`${API_URL}/payment/create-intent`, orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Confirm payment
  confirmPayment: async (paymentData: any) => {
    try {
      const response = await axios.post(`${API_URL}/payment/confirm`, paymentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Save payment method
  savePaymentMethod: async (paymentMethodData: any) => {
    try {
      const response = await axios.post(`${API_URL}/payment/save-method`, paymentMethodData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get saved payment methods
  getPaymentMethods: async () => {
    try {
      const response = await axios.get(`${API_URL}/payment/methods`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete payment method
  deletePaymentMethod: async (paymentMethodId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/payment/methods/${paymentMethodId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default paymentService;