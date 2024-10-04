import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchTraineeProfile, updateTraineeProfile } from '@/redux/slices/traineeSlice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const TraineeProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.trainee);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || ''); 

  useEffect(() => {
    if (!profile) {
      dispatch(fetchTraineeProfile(1)); // Replace 1 with the actual trainee ID
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile) {
      setName(profile.name); 
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateTraineeProfile({
        name 
    }));
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
         
          <div className="flex justify-end space-x-2">
            <Button type="submit">Save</Button>
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <div>
          <p className="mb-2"><strong>Name:</strong> {profile?.name}</p> 
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        </div>
      )}
    </div>
  );
};

export default TraineeProfile;