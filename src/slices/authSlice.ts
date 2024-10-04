import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  { isAxiosError } from 'axios';   
import apiClient from '../pages/api/apiClient';

interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

// Define the response type for login and register
interface AuthResponse {
  token: string;
}

interface AuthError {
  message: string;
}

// Async thunk for login
export const loginUser = createAsyncThunk<AuthResponse, { email: string; password: string }, { rejectValue: AuthError }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
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
      await apiClient.post<void>('/auth/register', userData);
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
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
