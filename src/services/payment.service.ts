import { Fetch } from '@/utils/fetchWrapper';

const paymentService = {
  _PREFIX: '/payment/v1',

  // Get Stripe configuration
  getStripeConfig: async () => {
    try {
      const res = await Fetch.get(`${paymentService._PREFIX}/stripe-config`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get Stripe config');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Create payment intent
  createPaymentIntent: async (payload: {
    amount: number;
    currency?: string;
    orderId?: string;
  }) => {
    try {
      const res = await Fetch.post(
        `${paymentService._PREFIX}/create-payment-intent`,
        payload
      );
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to create payment intent');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Create setup intent
  createSetupIntent: async () => {
    try {
      const res = await Fetch.post(`${paymentService._PREFIX}/create-setup-intent`, {});
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to create setup intent');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },
};

export default paymentService;