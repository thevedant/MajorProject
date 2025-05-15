import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';

function NewBank() {
  const [formData, setFormData] = useState({
    organizationName: '',
    hashAddress: '',
    email: '',
    helplineNo: '',
  });

  const [loading , setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/org/register', formData);
      
      if (response.status === 201) {
        alert("User created successfully! Redirecting to login...");
        
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
    console.log('Submitted:', formData);
  };

  return (

    <div>
        <NavBar/>
    <div className="w-screen h-screen flex items-center justify-center bg-black-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl space-y-5"
      >
        <h2 className="text-2xl text-gray-800 font-semibold text-center mb-6">
          New Organization Registration
        </h2>

        {[
          { label: 'Organization Name', name: 'organizationName', type: 'text' },
          { label: 'Hash Address', name: 'hashAddress', type: 'text' },
          { label: 'Official Email', name: 'email', type: 'email' },
          { label: 'Helpline No.', name: 'helplineNo', type: 'tel' },
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

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-medium transition"
        >
          Register Organisation
        </button>
      </form>
    </div>
    </div>
  );
}

export default NewBank;
