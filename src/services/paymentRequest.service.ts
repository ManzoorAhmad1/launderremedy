import { Fetch } from '@/utils/fetchWrapper';

const paymentRequestService = {
  _PREFIX: '/payment/v1',

  // Create payment request
  async createPaymentRequest(accountDetails: {
    account_holder_name: string;
    bank_name: string;
    account_number: string;
    sort_code?: string;
    iban?: string;
    swift_code?: string;
    additional_info?: string;
  }) {
    try {
      const res = await Fetch.post(`${this._PREFIX}/request`, {
        account_details: accountDetails,
      });
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to create payment request');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get user's payment requests
  async getMyPaymentRequests() {
    try {
      const res = await Fetch.get(`${this._PREFIX}/my-requests`);
      if (res.code === 200) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get payment requests');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get all payment requests (Admin)
  async getAllPaymentRequests(status?: string) {
    try {
      const url = status
        ? `${this._PREFIX}/requests?status=${status}`
        : `${this._PREFIX}/requests`;
      const res = await Fetch.get(url);
      if (res.code === 200) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get payment requests');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Process payment request (Admin)
  async processPaymentRequest(id: string, amount: number, description?: string) {
    try {
      const res = await Fetch.post(`${this._PREFIX}/process-request/${id}`, {
        amount,
        description,
      });
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to process payment');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Update payment request status (Admin)
  async updatePaymentRequestStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected' | 'processed',
    admin_notes?: string
  ) {
    try {
      const res = await Fetch.put(`${this._PREFIX}/request-status/${id}`, {
        status,
        admin_notes,
      });
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to update status');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },
};

export default paymentRequestService;
