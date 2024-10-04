import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';  // <-- Import isAxiosError
import apiClient from '../pages/api/apiClient';

interface ClassSchedule {
  id: string;
  date: string;
  time: string;
  duration: number;
}

interface ClassScheduleState {
  schedules: ClassSchedule[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClassScheduleState = {
  schedules: [],
  status: 'idle',
  error: null,
};

// Define response and error types
interface ClassScheduleResponse {
  schedules: ClassSchedule[];
}

interface ClassScheduleError {
  message: string;
}

// Fetch class schedules
export const fetchClassSchedules = createAsyncThunk<ClassSchedule[], void, { rejectValue: ClassScheduleError }>(
  'classSchedule/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ClassScheduleResponse>('/class-schedule/list');
      return response.data.schedules;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as ClassScheduleError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Create a class schedule
export const createClassSchedule = createAsyncThunk<ClassSchedule, { date: string; time: string; duration: number }, { rejectValue: ClassScheduleError }>(
  'classSchedule/create',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<ClassSchedule>('/class-schedule/create', scheduleData);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as ClassScheduleError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Delete a class schedule
export const deleteClassSchedule = createAsyncThunk<string, string, { rejectValue: ClassScheduleError }>(
  'classSchedule/delete',
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/class-schedule/delete/${id}`);
      return id;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as ClassScheduleError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const classScheduleSlice = createSlice({
  name: 'classSchedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassSchedules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClassSchedules.fulfilled, (state, action) => {
        state.schedules = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchClassSchedules.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Failed to fetch schedules';
      })
      .addCase(createClassSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload);
      })
      .addCase(deleteClassSchedule.fulfilled, (state, action) => {
        state.schedules = state.schedules.filter(schedule => schedule.id !== action.payload);
      });
  },
});

export default classScheduleSlice.reducer;
