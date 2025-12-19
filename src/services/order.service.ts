import { Fetch } from '@/utils/fetchWrapper';

const orderService = {
  _PREFIX: '/order/v1',
  _PREFIX2: '/service/v1',

  // Create new order
  async createOrder(payload: any) {
    try {
      const res = await Fetch.post(`${this._PREFIX}/create-order`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Order creation failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Update existing order
  async updateOrder(payload: any) {
    try {
      const res = await Fetch.post(`${this._PREFIX}/update-order`, payload);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Order update failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Delete/Cancel order
  async deleteOrder(id: string, type: 'cancel' | 'complete') {
    try {
      const endpoint = type === 'cancel' ? '/cancel-order/' : '/complete-order/';
      const res = await Fetch.put(`${this._PREFIX}${endpoint}${id}`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Operation failed');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get orders count
  async getOrdersCount() {
    try {
      const res = await Fetch.get(`${this._PREFIX}/get-orders-count`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get orders count');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get all services/categories
  async getCategoriesList() {
    try {
      const res = await Fetch.get(`${this._PREFIX2}/get-all-services`);
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get categories');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get all orders of user with pagination and filters
  async getAllOrdersOfUser({
    page = 1,
    pageSize = 10,
    status = '',
    searchText = '',
  }: {
    page?: number;
    pageSize?: number;
    status?: string;
    searchText?: string;
  }) {
    try {
      const res = await Fetch.post(
        `${this._PREFIX}/get-all-orders?itemPerPage=${pageSize}&page=${page}&status=${status}&searchText=${searchText}`
      );
      if (res.success) {
        return {
          orders: res.data.items,
          totalItems: res.data.totalItems,
        };
      }
      throw new Error(res.message ?? 'Failed to get orders');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get collection time slots
  async getSelectionDetails(date: string) {
    try {
      const res = await Fetch.get(
        `${this._PREFIX}/get-collection-slots?date=${date}`
      );
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get collection slots');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  // Get delivery time slots
  async getDeliveryDetails(date: string) {
    try {
      const res = await Fetch.get(
        `${this._PREFIX}/get-delivery-slots?date=${date}`
      );
      if (res.success) {
        return res;
      }
      throw new Error(res.message ?? 'Failed to get delivery slots');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },
};

export default orderService;