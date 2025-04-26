import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { userService } from '../../api/userService';

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const response = await userService.profileInfo();
      setUser(response);
    } catch (error) {
      console.error('Failed to fetch profile', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      {user ? (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
