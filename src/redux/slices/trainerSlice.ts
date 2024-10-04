import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  { isAxiosError } from 'axios';  // <-- Import isAxiosError
import apiClient from '../../pages/api/apiClient';

interface Trainer {
  id: string;
  name: string;
  email: string;
}

interface TrainerState {
  trainers: Trainer[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TrainerState = {
  trainers: [],
  status: 'idle',
  error: null,
};

// Define response and error types
interface TrainerResponse {
  trainers: Trainer[];
}

interface TrainerError {
  message: string;
}

// Fetch all trainers
export const fetchTrainers = createAsyncThunk<Trainer[], void, { rejectValue: TrainerError }>(
  'trainers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<TrainerResponse>('/trainer/list');
      return response.data.trainers;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as TrainerError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Create a new trainer
export const createTrainer = createAsyncThunk<Trainer, { name: string; email: string }, { rejectValue: TrainerError }>(
  'trainers/create',
  async (trainerData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<Trainer>('/trainer/create', trainerData);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as TrainerError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Update an existing trainer
export const updateTrainer = createAsyncThunk<Trainer, { id: string; trainerData: { name: string; email: string } }, { rejectValue: TrainerError }>(
  'trainers/update',
  async ({ id, trainerData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put<Trainer>(`/trainer/update/${id}`, trainerData);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as TrainerError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Delete a trainer
export const deleteTrainer = createAsyncThunk<string, string, { rejectValue: TrainerError }>(
  'trainers/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/trainer/delete/${id}`);
      return id;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as TrainerError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const trainerSlice = createSlice({
  name: 'trainers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrainers.fulfilled, (state, action) => {
        state.trainers = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTrainers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Failed to fetch trainers';
      })
      .addCase(createTrainer.fulfilled, (state, action) => {
        state.trainers.push(action.payload);
      })
      .addCase(updateTrainer.fulfilled, (state, action) => {
        const index = state.trainers.findIndex(trainer => trainer.id === action.payload.id);
        if (index !== -1) {
          state.trainers[index] = action.payload;
        }
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.trainers = state.trainers.filter(trainer => trainer.id !== action.payload);
      });
  },
});

export default trainerSlice.reducer;
