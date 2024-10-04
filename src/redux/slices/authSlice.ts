import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { jwtDecode } from "jwt-decode";
import apiClient from '../../pages/api/apiClient';

interface AuthState {
  user: { 
    name: string; 
    role: string; 
    email: string;
  };
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: { 
    name: '', 
    role: '', 
    email: ''
  },
  token: null,
  status: 'idle',
  error: null,
};

// Define the response type for login
interface AuthResponse {
  data: {
    token: string;
  };
  user: {
    name: string;
    role: string;
    email: string;
  };
}

interface AuthError {
  message: string;
}

// Define the type for the decoded token
interface DecodedToken {
  userId: number;
  role: string;
  email: string;
  name: string;
}

// Async thunk for login
export const loginUser = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: AuthError }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<{ data: { token: string } }>('/auth/login', credentials);
      const token = response.data.data.token; // Extract token from response
      
      localStorage.setItem('token', token); // Store the token in local storage
      
      // Decode the token to extract user information
      const decoded: DecodedToken = jwtDecode(token);
      
      return { data: { token }, user: { name: decoded.name, role: decoded.role, email: decoded.email } };
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as AuthError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Async thunk for registering a user
export const registerUser = createAsyncThunk<void, { email: string; password: string; fullName: string }, { rejectValue: AuthError }>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Add the fixed role to the userData
      const dataWithRole = { ...userData, role: 'TRAINEE' };
      
      await apiClient.post<void>('/auth/register', dataWithRole);
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as AuthError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = { name: '', role: '', email: '' };
      localStorage.removeItem('token'); // Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.data.token;
        state.user = action.payload.user;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Login failed';
        state.status = 'failed';
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Registration failed';
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;