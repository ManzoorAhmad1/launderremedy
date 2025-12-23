// Mock service/category data for admin panel
export interface MockService {
  _id: string;
  title: string;
  description: string;
  price: number;
  perItemPrice: number;
  category: string;
  status: 'active' | 'inactive';
  icon?: string;
  image?: string;
  turnaround_time?: string;
  created_at: string;
  updated_at: string;
  total_orders: number;
  prepaidTotalItems?: number;
  subcategories?: any[];
  priceList?: Array<{
    title: string;
    price: number;
    description?: string;
    subCategory?: any[];
  }>;
}

export const mockServices: MockService[] = [
  {
    _id: 's1',
    title: 'Wash & Fold',
    description: 'Professional washing and folding service for everyday clothes',
    price: 15.99,
    perItemPrice: 2.50,
    category: 'Washing',
    status: 'active',
    icon: 'Shirt',
    created_at: '2023-11-01T10:00:00Z',
    updated_at: '2024-06-15T14:30:00Z',
    total_orders: 456
  },
  {
    _id: 's2',
    title: 'Dry Cleaning',
    description: 'Premium dry cleaning for delicate and formal wear',
    price: 12.99,
    perItemPrice: 8.50,
    category: 'Dry Cleaning',
    status: 'active',
    icon: 'ShirtOff',
    created_at: '2023-11-01T10:00:00Z',
    updated_at: '2024-05-20T11:00:00Z',
    total_orders: 389
  },
  {
    _id: 's3',
    title: 'Ironing',
    description: 'Expert ironing service for crisp, wrinkle-free clothes',
    price: 8.99,
    perItemPrice: 1.50,
    category: 'Ironing',
    status: 'active',
    icon: 'Zap',
    created_at: '2023-11-01T10:00:00Z',
    updated_at: '2024-06-01T09:15:00Z',
    total_orders: 312
  },
  {
    _id: 's4',
    title: 'Shirt Service',
    description: 'Specialized care for shirts - wash, iron, and fold',
    price: 3.99,
    perItemPrice: 3.99,
    category: 'Shirts',
    status: 'active',
    icon: 'User',
    created_at: '2023-11-01T10:00:00Z',
    updated_at: '2024-06-10T16:45:00Z',
    total_orders: 523
  },
  {
    _id: 's5',
    title: 'Duvet Cleaning',
    description: 'Deep cleaning for duvets, comforters, and bed linens',
    price: 25.99,
    perItemPrice: 25.99,
    category: 'Bedding',
    status: 'active',
    icon: 'Bed',
    created_at: '2023-11-01T10:00:00Z',
    updated_at: '2024-05-28T13:20:00Z',
    total_orders: 178
  },
  {
    _id: 's6',
    title: 'Curtain Cleaning',
    description: 'Professional curtain and drape cleaning service',
    price: 35.99,
    perItemPrice: 35.99,
    category: 'Home',
    status: 'active',
    icon: 'Home',
    created_at: '2023-11-01T10:00:00Z',
    updated_at: '2024-06-05T10:30:00Z',
    total_orders: 95
  },
  {
    _id: 's7',
    title: 'Alterations',
    description: 'Expert tailoring and alteration services',
    price: 15.99,
    perItemPrice: 15.99,
    category: 'Alterations',
    status: 'active',
    icon: 'Scissors',
    created_at: '2023-12-01T10:00:00Z',
    updated_at: '2024-05-15T14:00:00Z',
    total_orders: 142
  },
  {
    _id: 's8',
    title: 'Express Service',
    description: 'Same-day express laundry service',
    price: 29.99,
    perItemPrice: 5.00,
    category: 'Express',
    status: 'active',
    icon: 'Zap',
    created_at: '2023-12-15T10:00:00Z',
    updated_at: '2024-06-18T15:30:00Z',
    total_orders: 267
  },
  {
    _id: 's9',
    title: 'Leather Care',
    description: 'Specialized cleaning for leather garments and accessories',
    price: 45.99,
    perItemPrice: 45.99,
    category: 'Premium',
    status: 'inactive',
    icon: 'Award',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-03-20T12:00:00Z',
    total_orders: 34
  },
  {
    _id: 's10',
    title: 'Wedding Dress Care',
    description: 'Premium care for wedding dresses and formal wear',
    price: 89.99,
    perItemPrice: 89.99,
    category: 'Premium',
    status: 'active',
    icon: 'Heart',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-06-01T11:30:00Z',
    total_orders: 28
  }
];

// Utility functions for mock service manipulation
export const mockServiceAPI = {
  getAllServices: (page: number = 1, pageSize: number = 10, search: string = '', statusFilter: string = '', categoryFilter: string = '') => {
    let filtered = [...mockServices];
    
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by status
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(service => service.status === statusFilter);
    }
    
    // Filter by category
    if (categoryFilter && categoryFilter !== 'all') {
      filtered = filtered.filter(service => service.category === categoryFilter);
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
  
  getServiceById: (id: string) => {
    return mockServices.find(service => service._id === id) || null;
  },
  
  createService: (service: Omit<MockService, '_id' | 'created_at' | 'updated_at' | 'total_orders'>) => {
    const newService: MockService = {
      ...service,
      _id: `s${mockServices.length + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      total_orders: 0
    };
    mockServices.push(newService);
    return { success: true, data: newService };
  },
  
  updateService: (id: string, updates: Partial<MockService>) => {
    const index = mockServices.findIndex(service => service._id === id);
    if (index !== -1) {
      mockServices[index] = {
        ...mockServices[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      return { success: true, data: mockServices[index] };
    }
    return { success: false, message: 'Service not found' };
  },
  
  deleteService: (id: string) => {
    const index = mockServices.findIndex(service => service._id === id);
    if (index !== -1) {
      mockServices.splice(index, 1);
      return { success: true, message: 'Service deleted successfully' };
    }
    return { success: false, message: 'Service not found' };
  },
  
  getCategories: () => {
    const categories = Array.from(new Set(mockServices.map(s => s.category)));
    return categories;
  }
};
