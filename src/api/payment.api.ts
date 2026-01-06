import apiClient from './client';

export interface ProcessPaymentPayload {
  token: string;
  amount: number;
  description: string;
  id: string; // user_id
}

export interface CreatePaymentIntentPayload {
  amount: number;
  description: string;
  payment_method_id: string;
  user_id: string;
  id: string; // order_id
  type: 'payment' | 'prepaid';
}

export interface AddCardPayload {
  token: string;
  email: string;
}

const paymentApi = {
  // Get Stripe configuration
  getStripeConfig: async () => {
    return await apiClient.get('/payment/v1/stripe-config');
  },

  // Process payment (deprecated)
  processPayment: async (payload: ProcessPaymentPayload) => {
    return await apiClient.post('/payment/v1/process-payment', payload);
  },

  // Create payment intent
  createPaymentIntent: async (payload: CreatePaymentIntentPayload) => {
    return await apiClient.post('/payment/v1/create-payment-intent', payload);
  },

  // Add card to customer
  addCard: async (payload: AddCardPayload) => {
    return await apiClient.post('/payment/v1/add-card', payload);
  },

  // Get customer's saved cards
  getCustomerCards: async (userId: string) => {
    return await apiClient.get(`/payment/v1/get-customers-cards/${userId}`);
  },

  // Create SetupIntent to save card without charging
  createSetupIntent: async () => {
    return await apiClient.post('/payment/v1/create-setup-intent');
  },

  // Charge saved payment method when admin approves
  chargeSavedCard: async (payload: { order_id: string; payment_method_id: string; amount: number }) => {
    return await apiClient.post('/payment/v1/charge-saved-card', payload);
  },
};

export default paymentApi;
