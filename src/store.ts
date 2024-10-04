import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import trainerReducer from './slices/trainerSlice';
import classScheduleReducer from './slices/classScheduleSlice';
import bookingReducer from './slices/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    trainers: trainerReducer,
    classSchedule: classScheduleReducer,
    bookings: bookingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
