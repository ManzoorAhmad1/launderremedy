// Admin service layer - wraps mock data APIs to simulate real backend behavior
import { mockUserAPI, MockUser } from '@/lib/mockData/users';
import { mockServiceAPI, MockService } from '@/lib/mockData/services';
import { mockOrderAPI, MockOrder } from '@/lib/mockData/orders';
import { mockPaymentAPI, MockPayment } from '@/lib/mockData/payments';

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

const adminService = {
  // ============ USER MANAGEMENT ============
  users: {
    getAll: async (page: number = 1, pageSize: number = 10, search: string = '', statusFilter: string = '') => {
      await delay();
      return mockUserAPI.getAllUsers(page, pageSize, search, statusFilter);
    },
    
    getById: async (id: string) => {
      await delay();
      return mockUserAPI.getUserById(id);
    },
    
    update: async (id: string, updates: Partial<MockUser>) => {
      await delay();
      return mockUserAPI.updateUser(id, updates);
    },
    
    delete: async (id: string) => {
      await delay();
      return mockUserAPI.deleteUser(id);
    },
  },

  // ============ SERVICE MANAGEMENT ============
  services: {
    getAll: async (page: number = 1, pageSize: number = 10, search: string = '', statusFilter: string = '', categoryFilter: string = '') => {
      await delay();
      return mockServiceAPI.getAllServices(page, pageSize, search, statusFilter, categoryFilter);
    },
    
    getById: async (id: string) => {
      await delay();
      return mockServiceAPI.getServiceById(id);
    },
    
    create: async (service: Omit<MockService, '_id' | 'created_at' | 'updated_at' | 'total_orders'>) => {
      await delay();
      return mockServiceAPI.createService(service);
    },
    
    update: async (id: string, updates: Partial<MockService>) => {
      await delay();
      return mockServiceAPI.updateService(id, updates);
    },
    
    delete: async (id: string) => {
      await delay();
      return mockServiceAPI.deleteService(id);
    },
    
    getCategories: async () => {
      await delay();
      return mockServiceAPI.getCategories();
    },
  },

  // ============ ORDER MANAGEMENT ============
  orders: {
    getAll: async (
      page: number = 1,
      pageSize: number = 10,
      search: string = '',
      statusFilter: string = '',
      paymentStatusFilter: string = ''
    ) => {
      await delay();
      return mockOrderAPI.getAllOrders(page, pageSize, search, statusFilter, paymentStatusFilter);
    },
    
    getById: async (id: string) => {
      await delay();
      return mockOrderAPI.getOrderById(id);
    },
    
    updateStatus: async (id: string, status: MockOrder['status']) => {
      await delay();
      return mockOrderAPI.updateOrderStatus(id, status);
    },
    
    getStats: async () => {
      await delay();
      return mockOrderAPI.getOrderStats();
    },
  },

  // ============ PAYMENT MANAGEMENT ============
  payments: {
    getAll: async (
      page: number = 1,
      pageSize: number = 10,
      search: string = '',
      statusFilter: string = '',
      methodFilter: string = ''
    ) => {
      await delay();
      return mockPaymentAPI.getAllPayments(page, pageSize, search, statusFilter, methodFilter);
    },
    
    getById: async (id: string) => {
      await delay();
      return mockPaymentAPI.getPaymentById(id);
    },
    
    getStats: async () => {
      await delay();
      return mockPaymentAPI.getPaymentStats();
    },
    
    getUserPayments: async (userId: string) => {
      await delay();
      return mockPaymentAPI.getUserPayments(userId);
    },
  },

  // ============ DASHBOARD STATS ============
  dashboard: {
    getStats: async () => {
      await delay();
      
      const orderStats = mockOrderAPI.getOrderStats();
      const paymentStats = mockPaymentAPI.getPaymentStats();
      
      return {
        totalUsers: mockUserAPI.getAllUsers(1, 1000).total,
        totalOrders: orderStats.total,
        totalRevenue: paymentStats.totalRevenue,
        activeServices: mockServiceAPI.getAllServices(1, 1000, '', 'active').total,
        pendingOrders: orderStats.pending,
        processingOrders: orderStats.processing,
        completedOrders: orderStats.completed,
        pendingPayments: paymentStats.pending,
        successPayments: paymentStats.success,
        failedPayments: paymentStats.failed,
      };
    },
  },
};

export default adminService;
