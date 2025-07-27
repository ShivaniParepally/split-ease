
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface UserData {
  _id?: string;
  id?: string;
  name?: string;
  email: string;
  status?: 'active' | 'pending';
}

export interface AuthResponse {
  token: string;
  user: UserData;
  message: string;
}

export interface GroupData {
  _id?: string;
  name: string;
  description?: string;
  members: { userId: UserData }[];
}

export interface ExpenseData {
  _id?: string;
  title: string;
  amount: number;
  groupId: string;
  paidBy: string | UserData;
  date?: Date;
  splitBetween: { userId: string | UserData; amount: number }[];
}

export interface FinancialSummary {
  totalOwed: number;
  totalOwe: number;
  totalSpent: number;
}

// Create axios instance with interceptor for auth token
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const api = {
  // Auth endpoints
  auth: {
    register: (userData: { name: string; email: string; password: string }) => 
      axios.post<AuthResponse>(`${API_URL}/auth/register`, userData),
    login: (credentials: { email: string; password: string }) => 
      axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials),
    getCurrentUser: () => 
      axiosInstance.get<UserData>(`${API_URL}/auth/me`),
  },
  
  // User endpoints
  users: {
    getAll: () => axiosInstance.get<UserData[]>(`${API_URL}/users`),
    getById: (id: string) => axiosInstance.get<UserData>(`${API_URL}/users/${id}`),
    create: (userData: UserData) => axiosInstance.post<UserData>(`${API_URL}/users`, userData),
    acceptInvitation: (id: string) => axiosInstance.patch<UserData>(`${API_URL}/users/${id}/accept`)
  },
  
  // Group endpoints
  groups: {
    getAll: () => axiosInstance.get<GroupData[]>(`${API_URL}/groups`),
    getById: (id: string) => axiosInstance.get<{group: GroupData, expenses: ExpenseData[]}>(`${API_URL}/groups/${id}`),
    create: (groupData: {name: string, description?: string, memberIds: string[]}) => 
      axiosInstance.post<GroupData>(`${API_URL}/groups`, groupData),
    addMember: (groupId: string, userId: string) => 
      axiosInstance.post<GroupData>(`${API_URL}/groups/${groupId}/members`, { userId })
  },
  
  // Expense endpoints
  expenses: {
    getByGroup: (groupId: string) => 
      axiosInstance.get<ExpenseData[]>(`${API_URL}/expenses/group/${groupId}`),
    create: (expenseData: ExpenseData) => 
      axiosInstance.post<ExpenseData>(`${API_URL}/expenses`, expenseData),
    getUserSummary: (userId: string) => 
      axiosInstance.get<FinancialSummary>(`${API_URL}/expenses/summary/${userId}`)
  }
};

export default api;
