import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/profile' } });
      return;
    }

    // Fetch user profile
    fetch('https://peertrade-backend.onrender.com/api/users/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    fetch('https://peertrade-backend.onrender.com/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then(data => {
        setProfile(data);
        setIsEditing(false);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-error mb-4">{error}</p>
        <button 
          onClick={() => navigate('/')} 
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-success/20 text-success rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
                  required
                />
              ) : (
                <p className="p-3 bg-neutral-light/20 dark:bg-neutral-dark/20 rounded">{profile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <p className="p-3 bg-neutral-light/20 dark:bg-neutral-dark/20 rounded">{profile.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone || ''}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
                />
              ) : (
                <p className="p-3 bg-neutral-light/20 dark:bg-neutral-dark/20 rounded">{profile.phone || 'Not provided'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">College</label>
              {isEditing ? (
                <input
                  type="text"
                  name="college"
                  value={profile.college || ''}
                  onChange={handleChange}
                  className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
                />
              ) : (
                <p className="p-3 bg-neutral-light/20 dark:bg-neutral-dark/20 rounded">{profile.college || 'Not provided'}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio || ''}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 rounded border border-neutral-light dark:border-neutral-dark bg-white dark:bg-surface-dark"
                ></textarea>
              ) : (
                <p className="p-3 bg-neutral-light/20 dark:bg-neutral-dark/20 rounded min-h-[100px]">
                  {profile.bio || 'No bio provided'}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-neutral-light dark:border-neutral-dark rounded hover:bg-neutral-light/20 dark:hover:bg-neutral-dark/20 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;