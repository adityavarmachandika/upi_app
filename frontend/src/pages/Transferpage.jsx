import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Transferpage = () => {
  const [userData, setUserData] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferStatus, setTransferStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
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
        // After getting user data, fetch balance
        return fetch('http://localhost:6969/api/v1/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      })
      .then(res => res.json())
      .then(data => {
        setBalance(data.balance);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [navigate]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:6969/api/v1/user/search?filter=${searchTerm}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Error searching users:', err);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!selectedUser || !transferAmount || parseFloat(transferAmount) <= 0) {
      setTransferStatus({ success: false, message: "Please enter a valid amount and select a recipient" });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:6969/api/v1/account/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          from: userData._id,
          to: selectedUser._id,
          amount: parseFloat(transferAmount)
        })
      });

      const result = await response.text();
      
      if (result === "transaction succesfull") {
        setTransferStatus({ success: true, message: "Transfer successful!" });
        // Refetch balance
        const balanceResponse = await fetch('http://localhost:6969/api/v1/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const balanceData = await balanceResponse.json();
        setBalance(balanceData.balance);
        
        // Reset form
        setTransferAmount('');
      } else {
        setTransferStatus({ success: false, message: result || "Transfer failed. Please try again." });
      }
    } catch (err) {
      console.error('Error transferring funds:', err);
      setTransferStatus({ success: false, message: "An error occurred. Please try again." });
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
                Dashboard
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
                  <h2 className="text-2xl font-bold text-white">Money Transfer</h2>
                  <p className="text-blue-100 mt-1">Current Balance: ₹{balance ? balance.toFixed(2) : '0.00'}</p>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-6">
              {transferStatus && (
                <div className={`mb-6 p-4 rounded-md ${transferStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      {transferStatus.success ? (
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
                      <p className="text-sm font-medium">{transferStatus.message}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* If no recipient is selected, show search form */}
              {!selectedUser ? (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                      Search Recipients
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter name or email"
                      />
                      <button
                        onClick={handleSearch}
                        className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 sm:text-sm hover:bg-gray-100"
                      >
                        Search
                      </button>
                    </div>
                  </div>
                  
                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Results</h4>
                      <div className="max-h-80 overflow-y-auto border border-gray-200 rounded-md divide-y divide-gray-200">
                        {searchResults.map(user => (
                          <div 
                            key={user._id}
                            className="px-4 py-3 cursor-pointer hover:bg-gray-50"
                            onClick={() => setSelectedUser(user)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{user.firstname} {user.lastname}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-md flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Recipient</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        {selectedUser.firstname} {selectedUser.lastname} ({selectedUser.email})
                      </p>
                      <button 
                        className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                        onClick={() => setSelectedUser(null)}
                      >
                        Change recipient
                      </button>
                    </div>
                  </div>
                  
                  <form onSubmit={handleTransfer}>
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount to Transfer
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">₹</span>
                        </div>
                        <input
                          type="number"
                          id="amount"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          min="1"
                          step="0.01"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                          placeholder="0.00"
                          required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">INR</span>
                        </div>
                      </div>
                      {balance && parseFloat(transferAmount) > balance && (
                        <p className="mt-1 text-xs text-red-600">
                          The amount exceeds your current balance (₹{balance.toFixed(2)})
                        </p>
                      )}
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={!transferAmount || isNaN(transferAmount) || parseFloat(transferAmount) <= 0 || (balance && parseFloat(transferAmount) > balance)}
                        className={`w-full inline-flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                          !transferAmount || isNaN(transferAmount) || parseFloat(transferAmount) <= 0 || (balance && parseFloat(transferAmount) > balance)
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        Transfer Now
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transferpage;