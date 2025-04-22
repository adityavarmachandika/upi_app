import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const EditProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editFormData, setEditFormData] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });
  const [updateStatus, setUpdateStatus] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data
    fetch('http://localhost:6969/api/v1/user/getdata', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setEditFormData({
          firstname: data.firstname || '',
          lastname: data.lastname || '',
          email: data.email || ''
        });
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching user data:', err);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateStatus(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:6969/api/v1/user/editDetails', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });

      const result = await response.json();
      
      if (result.error) {
        setUpdateStatus({ success: false, message: result.error });
      } else {
        // Update user data in state
        setUserData({
          ...userData,
          ...editFormData
        });
        setUpdateStatus({ success: true, message: 'Profile updated successfully!' });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setUpdateStatus({ success: false, message: 'An error occurred while updating your profile.' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/home" className="text-2xl font-bold text-blue-600">UPI Money Transfer</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/home"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Edit Your Profile</h2>
                  <p className="text-blue-100 mt-1">Update your personal information</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-6">
              {updateStatus && (
                <div className={`mb-6 p-4 rounded-md ${updateStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {updateStatus.success ? (
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{updateStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="firstname"
                        value={editFormData.firstname}
                        onChange={(e) => setEditFormData({...editFormData, firstname: e.target.value})}
                        className="block w-full pl-10 pr-4 py-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="lastname"
                        value={editFormData.lastname}
                        onChange={(e) => setEditFormData({...editFormData, lastname: e.target.value})}
                        className="block w-full pl-10 pr-4 py-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                      className="block w-full pl-10 pr-4 py-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-3">
                  <Link
                    to="/home"
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile; 