// Mock order data for admin panel
export interface MockOrder {
  _id: string;
  order_number: string;
  user_id: string;
  user_name: string;
  user_email: string;
  phone_number?: string;
  services: {
    service_id: string;
    service_name: string;
    quantity: number;
    price: number;
  }[];
  collection: {
    date: string;
    time: string;
    address: string;
  };
  collection_address?: {
    street: string;
    city: string;
    postcode: string;
  };
  collection_time?: string;
  delivery: {
    date: string;
    time: string;
    address: string;
  };
  delivery_address?: {
    street: string;
    city: string;
    postcode: string;
  };
  delivery_time?: string;
  delivery_fee?: number;
  status: 'pending' | 'collected' | 'processing' | 'out_for_delivery' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  total_amount: number;
  special_instructions?: string;
  created_at: string;
  updated_at: string;
}

export const mockOrders: MockOrder[] = [
  {
    _id: 'o1',
    order_number: 'LR-2024-001',
    user_id: '1',
    user_name: 'John Smith',
    user_email: 'john.smith@example.com',
    services: [
      { service_id: 's1', service_name: 'Wash & Fold', quantity: 2, price: 31.98 },
      { service_id: 's3', service_name: 'Ironing', quantity: 1, price: 8.99 }
    ],
    collection: {
      date: '2024-06-20',
      time: '09:00 - 11:00',
      address: '123 High Street, London, SW1A 1AA'
    },
    delivery: {
      date: '2024-06-22',
      time: '14:00 - 16:00',
      address: '123 High Street, London, SW1A 1AA'
    },
    status: 'completed',
    payment_status: 'paid',
    total_amount: 40.97,
    created_at: '2024-06-19T10:30:00Z',
    updated_at: '2024-06-22T15:45:00Z'
  },
  {
    _id: 'o2',
    order_number: 'LR-2024-002',
    user_id: '2',
    user_name: 'Emma Johnson',
    user_email: 'emma.johnson@example.com',
    services: [
      { service_id: 's2', service_name: 'Dry Cleaning', quantity: 3, price: 38.97 }
    ],
    collection: {
      date: '2024-06-21',
      time: '10:00 - 12:00',
      address: '45 Baker Street, London, W1U 3AA'
    },
    delivery: {
      date: '2024-06-24',
      time: '09:00 - 11:00',
      address: '45 Baker Street, London, W1U 3AA'
    },
    status: 'out_for_delivery',
    payment_status: 'paid',
    total_amount: 38.97,
    created_at: '2024-06-20T14:20:00Z',
    updated_at: '2024-06-24T08:30:00Z'
  },
  {
    _id: 'o3',
    order_number: 'LR-2024-003',
    user_id: '3',
    user_name: 'Michael Williams',
    user_email: 'michael.williams@example.com',
    services: [
      { service_id: 's4', service_name: 'Shirt Service', quantity: 5, price: 19.95 }
    ],
    collection: {
      date: '2024-06-22',
      time: '11:00 - 13:00',
      address: '78 Oxford Street, London, W1D 1BS'
    },
    delivery: {
      date: '2024-06-25',
      time: '10:00 - 12:00',
      address: '78 Oxford Street, London, W1D 1BS'
    },
    status: 'processing',
    payment_status: 'paid',
    total_amount: 19.95,
    created_at: '2024-06-21T09:15:00Z',
    updated_at: '2024-06-23T11:00:00Z'
  },
  {
    _id: 'o4',
    order_number: 'LR-2024-004',
    user_id: '5',
    user_name: 'David Jones',
    user_email: 'david.jones@example.com',
    services: [
      { service_id: 's5', service_name: 'Duvet Cleaning', quantity: 1, price: 25.99 },
      { service_id: 's1', service_name: 'Wash & Fold', quantity: 1, price: 15.99 }
    ],
    collection: {
      date: '2024-06-23',
      time: '14:00 - 16:00',
      address: '12 Regent Street, London, SW1Y 4PE'
    },
    delivery: {
      date: '2024-06-26',
      time: '15:00 - 17:00',
      address: '12 Regent Street, London, SW1Y 4PE'
    },
    status: 'collected',
    payment_status: 'paid',
    total_amount: 41.98,
    created_at: '2024-06-22T11:30:00Z',
    updated_at: '2024-06-23T14:30:00Z'
  },
  {
    _id: 'o5',
    order_number: 'LR-2024-005',
    user_id: '6',
    user_name: 'Olivia Taylor',
    user_email: 'olivia.taylor@example.com',
    services: [
      { service_id: 's8', service_name: 'Express Service', quantity: 1, price: 29.99 }
    ],
    collection: {
      date: '2024-06-23',
      time: '08:00 - 10:00',
      address: '56 Park Lane, London, W1K 1QX'
    },
    delivery: {
      date: '2024-06-23',
      time: '18:00 - 20:00',
      address: '56 Park Lane, London, W1K 1QX'
    },
    status: 'processing',
    payment_status: 'paid',
    total_amount: 29.99,
    created_at: '2024-06-22T13:00:00Z',
    updated_at: '2024-06-23T09:00:00Z'
  },
  {
    _id: 'o6',
    order_number: 'LR-2024-006',
    user_id: '1',
    user_name: 'John Smith',
    user_email: 'john.smith@example.com',
    services: [
      { service_id: 's2', service_name: 'Dry Cleaning', quantity: 2, price: 25.98 }
    ],
    collection: {
      date: '2024-06-24',
      time: '10:00 - 12:00',
      address: '123 High Street, London, SW1A 1AA'
    },
    delivery: {
      date: '2024-06-27',
      time: '14:00 - 16:00',
      address: '123 High Street, London, SW1A 1AA'
    },
    status: 'pending',
    payment_status: 'paid',
    total_amount: 25.98,
    created_at: '2024-06-23T16:45:00Z',
    updated_at: '2024-06-23T16:45:00Z'
  },
  {
    _id: 'o7',
    order_number: 'LR-2024-007',
    user_id: '8',
    user_name: 'Isabella Wilson',
    user_email: 'isabella.wilson@example.com',
    services: [
      { service_id: 's10', service_name: 'Wedding Dress Care', quantity: 1, price: 89.99 }
    ],
    collection: {
      date: '2024-06-25',
      time: '11:00 - 13:00',
      address: '34 Chelsea Manor Street, London, SW3 5RL'
    },
    delivery: {
      date: '2024-07-02',
      time: '10:00 - 12:00',
      address: '34 Chelsea Manor Street, London, SW3 5RL'
    },
    status: 'pending',
    payment_status: 'pending',
    total_amount: 89.99,
    created_at: '2024-06-23T15:30:00Z',
    updated_at: '2024-06-23T15:30:00Z'
  },
  {
    _id: 'o8',
    order_number: 'LR-2024-008',
    user_id: '9',
    user_name: 'Thomas Evans',
    user_email: 'thomas.evans@example.com',
    services: [
      { service_id: 's3', service_name: 'Ironing', quantity: 2, price: 17.98 },
      { service_id: 's4', service_name: 'Shirt Service', quantity: 3, price: 11.97 }
    ],
    collection: {
      date: '2024-06-24',
      time: '09:00 - 11:00',
      address: '89 Piccadilly, London, W1J 8HS'
    },
    delivery: {
      date: '2024-06-27',
      time: '09:00 - 11:00',
      address: '89 Piccadilly, London, W1J 8HS'
    },
    status: 'cancelled',
    payment_status: 'refunded',
    total_amount: 29.95,
    created_at: '2024-06-22T08:45:00Z',
    updated_at: '2024-06-23T10:00:00Z'
  }
];

// Utility functions for mock order manipulation
export const mockOrderAPI = {
  getAllOrders: (
    page: number = 1,
    pageSize: number = 10,
    search: string = '',
    statusFilter: string = '',
    paymentStatusFilter: string = ''
  ) => {
    let filtered = [...mockOrders];
    
    // Filter by search (order number, user name, user email)
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(order => 
        order.order_number.toLowerCase().includes(searchLower) ||
        order.user_name.toLowerCase().includes(searchLower) ||
        order.user_email.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Filter by payment status
    if (paymentStatusFilter && paymentStatusFilter !== 'all') {
      filtered = filtered.filter(order => order.payment_status === paymentStatusFilter);
    }
    
    // Sort by created date (newest first)
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    // Pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filtered.slice(startIndex, endIndex);
    
    return {
      data: paginatedData,
      total: filtered.length,
      page,
      pageSize,
      totalPages: Math.ceil(filtered.length / pageSize)
    };
  },
  
  getOrderById: (id: string) => {
    return mockOrders.find(order => order._id === id) || null;
  },
  
  updateOrderStatus: (id: string, status: MockOrder['status']) => {
    const index = mockOrders.findIndex(order => order._id === id);
    if (index !== -1) {
      mockOrders[index] = {
        ...mockOrders[index],
        status,
        updated_at: new Date().toISOString()
      };
      return { success: true, data: mockOrders[index] };
    }
    return { success: false, message: 'Order not found' };
  },
  
  getOrderStats: () => {
    const total = mockOrders.length;
    const pending = mockOrders.filter(o => o.status === 'pending').length;
    const processing = mockOrders.filter(o => o.status === 'processing').length;
    const completed = mockOrders.filter(o => o.status === 'completed').length;
    const cancelled = mockOrders.filter(o => o.status === 'cancelled').length;
    
    return { total, pending, processing, completed, cancelled };
  }
};
