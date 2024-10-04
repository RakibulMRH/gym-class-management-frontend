import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import apiClient from '../../pages/api/apiClient';

interface Booking {
  id: string;
  classScheduleId: string;
  traineeId: string;
}

interface TraineeProfile {
  id: number;
  name: string; 
}

interface TraineeState {
  bookings: Booking[];
  profile: TraineeProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: TraineeState = {
  bookings: [],
  profile: null,
  loading: false,
  error: null,
};

// Define response and error types
interface BookingResponse {
  bookings: Booking[];
}

interface BookingError {
  message: string;
}

interface TraineeProfileResponse {
  profile: TraineeProfile;
}

interface TraineeProfileError {
  message: string;
}

interface UpdateProfileRequest { 
  name: string; 
}

interface UpdateProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    fullName: string;
  };
}

interface UpdateProfileError {
  message: string;
  errorDetails?: {
    field: string;
    message: string;
  };
}

// Fetch trainee bookings
export const fetchBookings = createAsyncThunk<Booking[], void, { rejectValue: BookingError }>(
  'bookings/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<BookingResponse>('/trainee/bookings');
      return response.data.bookings;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as BookingError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Book a class
export const bookClass = createAsyncThunk<Booking, string, { rejectValue: BookingError }>(
  'bookings/bookClass',
  async (classScheduleId, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<Booking>('/trainee/book-class', { classScheduleId });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as BookingError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Cancel a booking
export const cancelBooking = createAsyncThunk<string, string, { rejectValue: BookingError }>(
  'bookings/cancelBooking',
  async (bookingId, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/trainee/cancel-booking/${bookingId}`);
      return bookingId;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as BookingError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Fetch trainee profile
export const fetchTraineeProfile = createAsyncThunk<TraineeProfile, number, { rejectValue: TraineeProfileError }>(
  'trainee/fetchProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<TraineeProfileResponse>(`/trainee/profile/${id}`);
      return response.data.profile;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as TraineeProfileError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

// Update trainee profile
export const updateTraineeProfile = createAsyncThunk<UpdateProfileResponse, UpdateProfileRequest, { rejectValue: UpdateProfileError }>(
  'trainee/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await apiClient.put<UpdateProfileResponse>('/trainee/update-profile', {
        fullName: profileData.name, 
      });
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as UpdateProfileError);
      } else {
        return rejectWithValue({ message: 'An unknown error occurred' });
      }
    }
  }
);

const traineeSlice = createSlice({
  name: 'trainee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch bookings';
      })
      .addCase(bookClass.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
        state.loading = false;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : 'Failed to cancel booking';
        state.loading = false;
      })
      .addCase(fetchTraineeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTraineeProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchTraineeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch profile';
      })
      .addCase(updateTraineeProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTraineeProfile.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.name = action.payload.data.fullName;
        }
        state.loading = false;
      })
      .addCase(updateTraineeProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to update profile';
      });
  },
});

export default traineeSlice.reducer;