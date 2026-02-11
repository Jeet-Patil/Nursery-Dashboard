import API from './axios';

// Auth
export const authAPI = {
  login: (data: { username: string; password: string }) => API.post('/auth/login', data),
  register: (data: { username: string; password: string }) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),
};

// Generic CRUD factory
function createCRUD(endpoint: string) {
  return {
    getAll: () => API.get(endpoint),
    getOne: (id: string) => API.get(`${endpoint}/${id}`),
    create: (data: any) => API.post(endpoint, data),
    update: (id: string, data: any) => API.put(`${endpoint}/${id}`, data),
    delete: (id: string) => API.delete(`${endpoint}/${id}`),
  };
}

export const usersAPI = createCRUD('/users');
export const plantsAPI = createCRUD('/plants');
export const purchasesAPI = createCRUD('/purchases');
export const sellsAPI = createCRUD('/sells');
export const damagesAPI = createCRUD('/damages');
export const suppliersAPI = createCRUD('/suppliers');
export const inventoryAPI = {
  ...createCRUD('/inventory'),
  getLowStock: () => API.get('/inventory/low-stock'),
  getByPlantId: (plantId: string) => API.get(`/inventory/plant/${plantId}`),
};
export const expensesAPI = {
  ...createCRUD('/expenses'),
  getByCategory: (category: string) => API.get(`/expenses/category/${category}`),
};
