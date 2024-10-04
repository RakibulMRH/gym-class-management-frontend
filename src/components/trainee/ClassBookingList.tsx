import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { bookClass, cancelBooking } from '@/redux/slices/bookingSlice';
import { Button } from '../ui/button';

interface ClassSchedule {
  id: string;
  date: string;
  time: string;
  duration: number;
}

interface Booking {
  id: string;
  classScheduleId: string;
}

interface ClassBookingListProps {
  schedules: ClassSchedule[];
  bookings: Booking[];
}

const ClassBookingList: React.FC<ClassBookingListProps> = ({ schedules, bookings }) => {
  const dispatch = useDispatch<AppDispatch>();

  const isBooked = (scheduleId: string) => {
    return bookings.some(booking => booking.classScheduleId === scheduleId);
  };

  const handleBooking = (scheduleId: string) => {
    dispatch(bookClass(scheduleId));
  };

  const handleCancellation = (bookingId: string) => {
    dispatch(cancelBooking(bookingId));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {schedules.map((schedule) => {
            const booking = bookings.find(b => b.classScheduleId === schedule.id);
            return (
              <tr key={schedule.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{schedule.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{schedule.time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{schedule.duration} hours</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {isBooked(schedule.id) ? (
                    <Button variant="destructive" size="sm" onClick={() => handleCancellation(booking!.id)}>Cancel Booking</Button>
                  ) : (
                    <Button variant="default" size="sm" onClick={() => handleBooking(schedule.id)}>Book Class</Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ClassBookingList;