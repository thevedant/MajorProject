import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogIn() {
  const [role, setRole] = useState('');
  const [hashAddress, setHashAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || !hashAddress) {
      alert('Please select a role and enter your hash address.');
      return;
    }

    try {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }
    

    // Request access to MetaMask accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Assume the user is entering a hashAddress or it comes from your login form
    const enteredAddress = hashAddress.toLowerCase();

    // Check if entered address is in MetaMask
    const isLinked = accounts.some(acc => acc.toLowerCase() === enteredAddress);

    if (!isLinked) {
      alert("This address is not linked to your MetaMask. Please switch account.");
      return;
    }
  }
  catch (err) {
    alert(err.message);
  }
  
    const endpoint =
      role === 'customer'
        ? 'http://localhost:8000/api/users/login'
        : 'http://localhost:8000/api/org/login';

      console.log(endpoint);  
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ hashAddress }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      // Success: Handle accordingly
      console.log(`${role} logged in:`, data);
      alert("Logged In Successfully");
      if(role === 'customer') navigate(`/user/${hashAddress}`, { state: { user: data.data, role } });
      else navigate(`/org/${hashAddress}` , { state: { user: data.data, role } })
      
  

  
    } catch (error) {
      alert(error.message);
    }
  };
  

  return (
   
      <div className="w-screen h-screen flex items-center justify-center pt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl space-y-6"
        >
          <h2 className="text-2xl text-black font-semibold text-center mb-6">
            Login
          </h2>

          {/* Role Selection */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm font-medium text-black">
              Login as
            </label>
            <div className="flex gap-6 text-black">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={role === 'customer'}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-500"
                  required
                />
                Customer
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="organisation"
                  checked={role === 'organisation'}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-blue-500"
                />
                Organisation
              </label>
            </div>
          </div>

          {/* Hash Address Input */}
          <div className="flex items-center gap-4">
            <label className="w-32 text-sm font-medium text-black">
              Hash Address
            </label>
            <input
              type="text"
              value={hashAddress}
              onChange={(e) => setHashAddress(e.target.value)}
              className="flex-1 px-4 py-2 border border-white rounded-full text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter hash address"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition"
          >
            Log In
          </button>
        </form>
      </div>
  );
}

export default LogIn;
