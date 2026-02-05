import apiClient from './client';

export interface CreateOrderPayload {
  user_id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: any;
  postcode: string;
  collection_date: string;
  collection_time: string;
  delivery_date: string;
  delivery_time: string;
  selected_services: Array<{
    category: string;
    subcategory: string;
    quantity: number;
    price: number;
  }>;
  bundles?: any[];
  totalPrice: number;
  payment_done?: boolean;
  payment_id?: string;
  status?: string;
  notes?: string;
}

export interface UpdateOrderPayload extends Partial<CreateOrderPayload> {
  order_id: string;
}

export interface GetOrdersParams {
  page?: number;
  itemPerPage?: number;
  status?: string;
  searchText?: string;
}

const orderApi = {
  // Create new order
  createOrder: async (payload: CreateOrderPayload) => {
    return await apiClient.post('/order/v1/create-order', payload);
  },

  // Update order
  updateOrder: async (payload: UpdateOrderPayload) => {
    return await apiClient.post('/order/v1/update-order', payload);
  },

  // Delete order (admin only)
  deleteOrder: async (orderId: string) => {
    return await apiClient.delete(`/order/v1/delete-order/${orderId}`);
  },

  // Cancel order
  cancelOrder: async (orderId: string) => {
    return await apiClient.put(`/order/v1/cancel-order/${orderId}`);
  },

  // Complete order (admin)
  completeOrder: async (orderId: string) => {
    return await apiClient.put(`/order/v1/complete-order/${orderId}`);
  },

  // Get order details
  getOrderDetails: async (orderId: string) => {
    return await apiClient.get(`/order/v1/order-details/${orderId}`);
  },

  // Get my orders (user)
  getMyOrders: async (params: GetOrdersParams = {}) => {
    const { page = 1, itemPerPage = 10, status = '', searchText = '' } = params;
    return await apiClient.get(
      `/order/v1/get-my-orders?page=${page}&itemPerPage=${itemPerPage}&status=${status}&searchText=${searchText}`
    );
  },

  // Approve order and charge payment
  approveOrder: async (orderId: string) => {
    const response = await apiClient.put(`/order/v1/approve-order/${orderId}`);
    return response;
  },

  // Get all orders (admin)
  getAllOrders: async (params: GetOrdersParams = {}) => {
    const { page = 1, itemPerPage = 10, status = '', searchText = '' } = params;
    return await apiClient.post(
      `/order/v1/get-all-orders?page=${page}&itemPerPage=${itemPerPage}&status=${status}&searchText=${searchText}`
    );
  },

  // Get orders count by status
  getOrdersCount: async () => {
    return await apiClient.get('/order/v1/get-orders-count');
  },

  // Get total revenue
  getTotalRevenue: async () => {
    return await apiClient.get('/order/v1/get-total-revenue');
  },

  // Get collection time slots
  getCollectionSlots: async (date: string) => {
    return await apiClient.get(`/order/v1/get-collection-slots?date=${date}`);
  },

  // Get delivery time slots
  getDeliverySlots: async (date: string) => {
    return await apiClient.get(`/order/v1/get-delivery-slots?date=${date}`);
  },

  // Add time slot (admin)
  addTimeSlot: async (payload: { date: string; range: Array<{ start: string; end: string }> }) => {
    return await apiClient.post('/order/v1/add-time-slot', payload);
  },

  // Update time slot (admin)
  updateTimeSlot: async (id: string, payload: { range: Array<{ start: string; end: string }> }) => {
    return await apiClient.post(`/order/v1/update-time-slot/${id}`, payload);
  },

  // Add yearly time slots (admin)
  addYearlyTimeSlots: async (payload: { year: number; range: Array<{ start: string; end: string }> }) => {
    return await apiClient.post('/order/v1/add-yearly-slot', payload);
  },
};

export default orderApi;
