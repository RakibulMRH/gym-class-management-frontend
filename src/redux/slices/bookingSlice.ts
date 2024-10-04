import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';  // <-- Import isAxiosError
import apiClient from '../../pages/api/apiClient';

interface Booking {
  id: string;
  classScheduleId: string;
  traineeId: string;
}

interface BookingState {
  bookings: Booking[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  status: 'idle',
  error: null,
};

// Define response and error types
interface BookingResponse {
  bookings: Booking[];
}

interface BookingError {
  message: string;
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

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Failed to fetch bookings';
      })
      .addCase(bookClass.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;
