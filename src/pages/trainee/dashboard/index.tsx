import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchClassSchedules } from '@/redux/slices/classScheduleSlice';
import { fetchBookings } from '@/redux/slices/bookingSlice';
import DashboardLayout from '@/components/DashboardLayout';
import TraineeProfile from '@/components/trainee/TraineeProfile';
import ClassBookingList from '@/components/trainee/ClassBookingList';

const TraineeDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { schedules } = useSelector((state: RootState) => state.classSchedule);
  const { bookings } = useSelector((state: RootState) => state.bookings);

  useEffect(() => {
    dispatch(fetchClassSchedules());
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Trainee Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <TraineeProfile />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Class Bookings</h2>
          <ClassBookingList schedules={schedules} bookings={bookings} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TraineeDashboard;