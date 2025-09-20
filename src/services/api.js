// API configuration and base functions
const API_BASE_URL = 'https://peertrade-backend.onrender.com/api';

// Mock data for development
const MOCK_ITEMS = [
  {
    _id: '1',
    title: 'MacBook Pro 2021',
    description: 'Excellent condition, barely used. M1 Pro chip, 16GB RAM, 512GB SSD.',
    price: 1200,
    category: 'electronics',
    condition: 'like-new',
    images: ['https://via.placeholder.com/300'],
    seller: {
      _id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    createdAt: '2023-09-15T10:30:00Z'
  },
  {
    _id: '2',
    title: 'Calculus Textbook',
    description: 'Calculus: Early Transcendentals, 8th Edition. Some highlighting but otherwise in good condition.',
    price: 45,
    category: 'books',
    condition: 'good',
    images: ['https://via.placeholder.com/300'],
    seller: {
      _id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    createdAt: '2023-09-10T14:20:00Z'
  },
  {
    _id: '3',
    title: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with multiple brightness settings and USB charging port.',
    price: 25,
    category: 'furniture',
    condition: 'excellent',
    images: ['https://via.placeholder.com/300'],
    seller: {
      _id: 'user1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    createdAt: '2023-09-05T09:15:00Z'
  }
];

// Helper function for making API requests - now returns mock data
const fetchApi = async (endpoint, options = {}) => {
  console.log(`Mock API call to ${endpoint}`, options);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return mock data based on endpoint
  if (endpoint.startsWith('/items')) {
    if (endpoint === '/items') {
      return { items: MOCK_ITEMS };
    } else {
      const id = endpoint.split('/')[2];
      const item = MOCK_ITEMS.find(item => item._id === id);
      if (item) return item;
      throw new Error('Item not found');
    }
  }
  
  // For other endpoints, just return success
  return { success: true, message: 'Operation completed successfully' };
};

// Auth API services
export const authApi = {
  login: async (credentials) => {
    return fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  register: async (userData) => {
    return fetchApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// Auth API services direct exports
export const login = authApi.login;
export const register = authApi.register;

// Items API services
export const itemsApi = {
  getAllItems: async () => {
    return fetchApi('/items');
  },
  
  getItemById: async (id) => {
    return fetchApi(`/items/${id}`);
  },
  
  getItem: async (id) => {
    return fetchApi(`/items/${id}`);
  },
  
  createItem: async (itemData) => {
    return fetchApi('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },
  
  updateItem: async (id, itemData) => {
    return fetchApi(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },
  
  deleteItem: async (id) => {
    return fetchApi(`/items/${id}`, {
      method: 'DELETE',
    });
  },
};

// Items API services direct exports
export const getItem = itemsApi.getItem;
export const getItems = itemsApi.getAllItems;

export default {
  auth: authApi,
  items: itemsApi,
};