import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TransactionHistory from '../components/TransactionHistory';

const Homepage = () => {
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch user data
        const userdata = await fetch('http://localhost:6969/api/v1/user/getdata', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userdata.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userdata.json();
        setUserData(userData);

        // Fetch balance
        const balancedata = await fetch('http://localhost:6969/api/v1/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!balancedata.ok) {
          throw new Error('Failed to fetch balance');
        }
        
        const balanceData = await balancedata.json();
        setBalance(balanceData.balance);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.message.includes('user data')) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

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
                <span className="text-2xl font-bold text-blue-600">UPI Money Transfer</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  onClick={handleLogout}
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Profile and Balance */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Welcome, {userData?.firstname || 'User'}</h2>
                  <p className="text-blue-100 mt-1">{userData?.email}</p>
                </div>
                <Link
                  to="/edit-profile"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
            
            <div className="px-6 py-6 border-b border-gray-200">
              <div className="flex items-end">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-500">Available Balance</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-1">₹{balance ? balance.toFixed(2) : '0.00'}</p>
                </div>
                <Link
                  to="/transfer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Transfer Money
                </Link>
              </div>
            </div>

            <div className="px-6 py-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>
              {userData && <TransactionHistory userId={userData._id} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;