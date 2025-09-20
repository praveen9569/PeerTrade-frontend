// API configuration and base functions
const API_BASE_URL = 'https://peertrade-backend.onrender.com/api';

// Helper function for making API requests
const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
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