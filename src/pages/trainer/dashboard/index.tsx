import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchClassSchedules } from '@/redux/slices/classScheduleSlice';
import DashboardLayout from '@/components/DashboardLayout';
import TrainerClassList from '@/components/trainer/TrainerClassList';

const TrainerDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { schedules } = useSelector((state: RootState) => state.classSchedule);

  useEffect(() => {
    dispatch(fetchClassSchedules());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Trainer Dashboard</h1>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Classes</h2>
        <TrainerClassList schedules={schedules} />
      </div>
    </DashboardLayout>
  );
};

export default TrainerDashboard;