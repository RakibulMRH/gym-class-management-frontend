import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { deleteTrainer } from '@/redux/slices/trainerSlice';
import { Button } from '../ui/button';

interface Trainer {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface TrainerListProps {
  trainers: Trainer[];
}

const TrainerList: React.FC<TrainerListProps> = ({ trainers }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id: string) => {
    dispatch(deleteTrainer(id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {trainers.map((trainer) => (
            <tr key={trainer.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{trainer.fullName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{trainer.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button onClick={() => handleDelete(trainer.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainerList;