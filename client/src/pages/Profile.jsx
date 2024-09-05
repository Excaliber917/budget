import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';
import { useUpdateUser } from '../hooks/useUpdateUser';

function Profile() {
  const { user } = useAuthContext(); // Fetch current user data from context
  const { updateUser } = useUpdateUser()
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
    income: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        userName: user.userName,
        email: user.email,
        password: '', // Keep the password empty, fill if the user wants to change it
        income: user.income,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Perform the update logic here
     
      updateUser(formData)
    }
    setIsEditing(!isEditing);
  };

  const { logout } = useLogout();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-700  p-6 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300 ${isEditing ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300 ${isEditing ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300 ${isEditing ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-300 ${isEditing ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
              placeholder="Enter new password if you want to change"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} dark:bg-blue-500 dark:hover:bg-blue-600`}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
            <button
              type="button"
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
