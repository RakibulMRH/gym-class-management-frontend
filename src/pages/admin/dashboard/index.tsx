import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchTrainers } from '@/redux/slices/trainerSlice';
import { fetchClassSchedules } from '@/redux/slices/classScheduleSlice';
import DashboardLayout from '@/components/DashboardLayout';
import TrainerList from '@/components/admin/TrainerList';
import ClassScheduleList from '@/components/admin/ClassScheduleList';

const AdminDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { trainers } = useSelector((state: RootState) => state.trainers);
  const { schedules } = useSelector((state: RootState) => state.classSchedule);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchClassSchedules());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Trainers</h2>
          <TrainerList trainers={trainers} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Class Schedules</h2>
          <ClassScheduleList schedules={schedules} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;