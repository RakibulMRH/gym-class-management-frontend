import apiClient from './apiClient';

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginCredentials) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, fullName: string) => {
  const response = await apiClient.post('/auth/register', { email, password, fullName });
  return response.data;
};