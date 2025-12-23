// Mock user data for admin panel
export interface MockUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at?: string;
  total_orders: number;
  total_spent: number;
  address?: {
    street: string;
    city: string;
    postcode: string;
  };
  bundles?: any[];
}

export const mockUsers: MockUser[] = [
  {
    _id: '1',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    phone_number: '+44 7700 900123',
    role: 'user',
    status: 'active',
    created_at: '2024-01-15T10:30:00Z',
    total_orders: 45,
    total_spent: 1250.50,
    bundles: []
  },
  {
    _id: '2',
    first_name: 'Emma',
    last_name: 'Johnson',
    email: 'emma.johnson@example.com',
    phone_number: '+44 7700 900124',
    role: 'user',
    status: 'active',
    created_at: '2024-02-20T14:20:00Z',
    total_orders: 32,
    total_spent: 890.75,
    bundles: []
  },
  {
    _id: '3',
    first_name: 'Michael',
    last_name: 'Williams',
    email: 'michael.williams@example.com',
    phone_number: '+44 7700 900125',
    role: 'user',
    status: 'active',
    created_at: '2024-03-10T09:15:00Z',
    total_orders: 28,
    total_spent: 675.25,
    bundles: []
  },
  {
    _id: '4',
    first_name: 'Sophie',
    last_name: 'Brown',
    email: 'sophie.brown@example.com',
    phone_number: '+44 7700 900126',
    role: 'user',
    status: 'inactive',
    created_at: '2024-01-05T16:45:00Z',
    total_orders: 15,
    total_spent: 420.00,
    bundles: []
  },
  {
    _id: '5',
    first_name: 'David',
    last_name: 'Jones',
    email: 'david.jones@example.com',
    phone_number: '+44 7700 900127',
    role: 'user',
    status: 'active',
    created_at: '2024-04-12T11:30:00Z',
    total_orders: 52,
    total_spent: 1580.90,
    bundles: []
  },
  {
    _id: '6',
    first_name: 'Olivia',
    last_name: 'Taylor',
    email: 'olivia.taylor@example.com',
    phone_number: '+44 7700 900128',
    role: 'user',
    status: 'active',
    created_at: '2024-02-28T13:00:00Z',
    total_orders: 38,
    total_spent: 980.50,
    bundles: []
  },
  {
    _id: '7',
    first_name: 'James',
    last_name: 'Davies',
    email: 'james.davies@example.com',
    phone_number: '+44 7700 900129',
    role: 'user',
    status: 'suspended',
    created_at: '2023-12-10T10:00:00Z',
    total_orders: 8,
    total_spent: 185.00,
    bundles: []
  },
  {
    _id: '8',
    first_name: 'Isabella',
    last_name: 'Wilson',
    email: 'isabella.wilson@example.com',
    phone_number: '+44 7700 900130',
    role: 'user',
    status: 'active',
    created_at: '2024-05-01T15:30:00Z',
    total_orders: 22,
    total_spent: 615.75,
    bundles: []
  },
  {
    _id: '9',
    first_name: 'Thomas',
    last_name: 'Evans',
    email: 'thomas.evans@example.com',
    phone_number: '+44 7700 900131',
    role: 'user',
    status: 'active',
    created_at: '2024-03-22T08:45:00Z',
    total_orders: 41,
    total_spent: 1125.00,
    bundles: []
  },
  {
    _id: '10',
    first_name: 'Charlotte',
    last_name: 'Thomas',
    email: 'charlotte.thomas@example.com',
    phone_number: '+44 7700 900132',
    role: 'user',
    status: 'active',
    created_at: '2024-01-30T12:15:00Z',
    total_orders: 36,
    total_spent: 895.50,
    bundles: []
  },
  {
    _id: 'admin1',
    first_name: 'Admin',
    last_name: 'User',
    email: 'admin@launderremedy.com',
    phone_number: '+44 7700 900100',
    role: 'admin',
    status: 'active',
    created_at: '2023-11-01T09:00:00Z',
    total_orders: 0,
    total_spent: 0,
    bundles: []
  }
];

// Utility functions for mock data manipulation
export const mockUserAPI = {
  getAllUsers: (page: number = 1, pageSize: number = 10, search: string = '', statusFilter: string = '') => {
    let filtered = [...mockUsers];
    
    // Filter by search (email, name)
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(user => 
        user.email.toLowerCase().includes(searchLower) ||
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }
    
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
  
  getUserById: (id: string) => {
    return mockUsers.find(user => user._id === id) || null;
  },
  
  updateUser: (id: string, updates: Partial<MockUser>) => {
    const index = mockUsers.findIndex(user => user._id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...updates };
      return { success: true, data: mockUsers[index] };
    }
    return { success: false, message: 'User not found' };
  },
  
  deleteUser: (id: string) => {
    const index = mockUsers.findIndex(user => user._id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return { success: true, message: 'User deleted successfully' };
    }
    return { success: false, message: 'User not found' };
  }
};
