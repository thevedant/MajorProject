import React, { useState } from 'react';
import NavBar from '../components/NavBar';
// import {useNavigate} from 'react-router-dom';
import axios from 'axios'



function NewCustomer() {
  const [formData, setFormData] = useState({
    hashAddress: '',
    name: '',
    email: '',
    phone: '',
    aadhar: '',
    pan: '',
    address: '',
  });
  const [loading , setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/users/register', formData);
      
      if (response.status === 201) {
        alert("User created successfully! Redirecting to login...");
        
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
    <NavBar/>
    <div className="w-screen h-screen flex items-center justify-center bg-black-100 pt-45 mb-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl space-y-5"
      >
        <h2 className="text-2xl text-gray-800 font-semibold text-center mb-6">New Customer Form</h2>
  
        {[
          { label: 'HashAddress', name: 'hashAddress', type: 'text' },
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone', type: 'tel' },
          { label: 'Aadhar No.', name: 'aadhar', type: 'text' },
          { label: 'Pan No.', name: 'pan', type: 'text' },
        ].map((field) => (
          <div className="flex items-center gap-4" key={field.name}>
            <label className="w-32 text-sm font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border border-black rounded-full text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
  
        <div className="flex items-start gap-4">
          <label className="w-32 text-sm font-medium text-gray-700 mt-2">Address</label>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border border-black rounded-xl text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
  
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition"
        >
          Sign Up
        </button>
      </form>
    </div>
    </div>
  );
  
}

export default NewCustomer;
