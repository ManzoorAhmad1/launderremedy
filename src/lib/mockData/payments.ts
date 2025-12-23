// Mock payment/transaction data for admin panel
export interface MockPayment {
  _id: string;
  transaction_id: string;
  order_id: string;
  order_number: string;
  user_id: string;
  user_name: string;
  user_email: string;
  amount: number;
  currency: string;
  payment_method: 'card' | 'cash' | 'prepaid_bundle';
  payment_status: 'pending' | 'success' | 'failed' | 'refunded';
  card_last4?: string;
  card_brand?: string;
  stripe_payment_id?: string;
  failure_message?: string;
  created_at: string;
  updated_at: string;
}

export const mockPayments: MockPayment[] = [
  {
    _id: 'p1',
    transaction_id: 'TXN-2024-001',
    order_id: 'o1',
    order_number: 'LR-2024-001',
    user_id: '1',
    user_name: 'John Smith',
    user_email: 'john.smith@example.com',
    amount: 40.97,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'success',
    card_last4: '4242',
    card_brand: 'Visa',
    stripe_payment_id: 'pi_1234567890',
    created_at: '2024-06-19T10:30:00Z',
    updated_at: '2024-06-19T10:31:00Z'
  },
  {
    _id: 'p2',
    transaction_id: 'TXN-2024-002',
    order_id: 'o2',
    order_number: 'LR-2024-002',
    user_id: '2',
    user_name: 'Emma Johnson',
    user_email: 'emma.johnson@example.com',
    amount: 38.97,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'success',
    card_last4: '5555',
    card_brand: 'Mastercard',
    stripe_payment_id: 'pi_0987654321',
    created_at: '2024-06-20T14:20:00Z',
    updated_at: '2024-06-20T14:21:00Z'
  },
  {
    _id: 'p3',
    transaction_id: 'TXN-2024-003',
    order_id: 'o3',
    order_number: 'LR-2024-003',
    user_id: '3',
    user_name: 'Michael Williams',
    user_email: 'michael.williams@example.com',
    amount: 19.95,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'success',
    card_last4: '1234',
    card_brand: 'Visa',
    stripe_payment_id: 'pi_1122334455',
    created_at: '2024-06-21T09:15:00Z',
    updated_at: '2024-06-21T09:16:00Z'
  },
  {
    _id: 'p4',
    transaction_id: 'TXN-2024-004',
    order_id: 'o4',
    order_number: 'LR-2024-004',
    user_id: '5',
    user_name: 'David Jones',
    user_email: 'david.jones@example.com',
    amount: 41.98,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'success',
    card_last4: '6789',
    card_brand: 'American Express',
    stripe_payment_id: 'pi_5566778899',
    created_at: '2024-06-22T11:30:00Z',
    updated_at: '2024-06-22T11:31:00Z'
  },
  {
    _id: 'p5',
    transaction_id: 'TXN-2024-005',
    order_id: 'o5',
    order_number: 'LR-2024-005',
    user_id: '6',
    user_name: 'Olivia Taylor',
    user_email: 'olivia.taylor@example.com',
    amount: 29.99,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'success',
    card_last4: '9876',
    card_brand: 'Mastercard',
    stripe_payment_id: 'pi_9988776655',
    created_at: '2024-06-22T13:00:00Z',
    updated_at: '2024-06-22T13:01:00Z'
  },
  {
    _id: 'p6',
    transaction_id: 'TXN-2024-006',
    order_id: 'o6',
    order_number: 'LR-2024-006',
    user_id: '1',
    user_name: 'John Smith',
    user_email: 'john.smith@example.com',
    amount: 25.98,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'success',
    card_last4: '4242',
    card_brand: 'Visa',
    stripe_payment_id: 'pi_1357924680',
    created_at: '2024-06-23T16:45:00Z',
    updated_at: '2024-06-23T16:46:00Z'
  },
  {
    _id: 'p7',
    transaction_id: 'TXN-2024-007',
    order_id: 'o7',
    order_number: 'LR-2024-007',
    user_id: '8',
    user_name: 'Isabella Wilson',
    user_email: 'isabella.wilson@example.com',
    amount: 89.99,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'pending',
    card_last4: '2468',
    card_brand: 'Visa',
    stripe_payment_id: 'pi_2468135790',
    created_at: '2024-06-23T15:30:00Z',
    updated_at: '2024-06-23T15:30:00Z'
  },
  {
    _id: 'p8',
    transaction_id: 'TXN-2024-008',
    order_id: 'o8',
    order_number: 'LR-2024-008',
    user_id: '9',
    user_name: 'Thomas Evans',
    user_email: 'thomas.evans@example.com',
    amount: 29.95,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'refunded',
    card_last4: '3579',
    card_brand: 'Mastercard',
    stripe_payment_id: 'pi_3579246801',
    created_at: '2024-06-22T08:45:00Z',
    updated_at: '2024-06-23T10:00:00Z'
  },
  {
    _id: 'p9',
    transaction_id: 'TXN-2024-009',
    order_id: 'o9',
    order_number: 'LR-2024-009',
    user_id: '10',
    user_name: 'Charlotte Thomas',
    user_email: 'charlotte.thomas@example.com',
    amount: 55.50,
    currency: 'GBP',
    payment_method: 'card',
    payment_status: 'failed',
    card_last4: '8642',
    card_brand: 'Visa',
    stripe_payment_id: 'pi_8642097531',
    created_at: '2024-06-23T17:00:00Z',
    updated_at: '2024-06-23T17:01:00Z'
  }
];

// Utility functions for mock payment manipulation
export const mockPaymentAPI = {
  getAllPayments: (
    page: number = 1,
    pageSize: number = 10,
    search: string = '',
    statusFilter: string = '',
    methodFilter: string = ''
  ) => {
    let filtered = [...mockPayments];
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(payment => 
        payment.transaction_id.toLowerCase().includes(searchLower) ||
        payment.order_number.toLowerCase().includes(searchLower) ||
        payment.user_name.toLowerCase().includes(searchLower) ||
        payment.user_email.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by payment status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.payment_status === statusFilter);
    }
    
    // Filter by payment method
    if (methodFilter && methodFilter !== 'all') {
      filtered = filtered.filter(payment => payment.payment_method === methodFilter);
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
  
  getPaymentById: (id: string) => {
    return mockPayments.find(payment => payment._id === id) || null;
  },
  
  getPaymentStats: () => {
    const total = mockPayments.length;
    const totalRevenue = mockPayments
      .filter(p => p.payment_status === 'success')
      .reduce((sum, p) => sum + p.amount, 0);
    const pending = mockPayments.filter(p => p.payment_status === 'pending').length;
    const success = mockPayments.filter(p => p.payment_status === 'success').length;
    const failed = mockPayments.filter(p => p.payment_status === 'failed').length;
    const refunded = mockPayments.filter(p => p.payment_status === 'refunded').length;
    
    return { total, totalRevenue, pending, success, failed, refunded };
  },
  
  getUserPayments: (userId: string) => {
    return mockPayments.filter(payment => payment.user_id === userId);
  }
};
