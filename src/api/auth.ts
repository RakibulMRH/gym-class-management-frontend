import apiClient from './apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, fullName: string) => {
  const response = await apiClient.post('/auth/register', { email, password, fullName });
  return response.data;
};

// Add other auth-related functions if needed
