import React, { useState } from 'react';

const HashPopup = ({ showPopup, onClose, onSubmit }) => {
  const [hashAddress, setHashAddress] = useState('');

  const handleChange = (e) => {
    setHashAddress(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(hashAddress);
    onClose();
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 className="text-xl font-semibold mb-4">Enter Hash Address</h2>
        <input 
          type="text" 
          placeholder="Enter hash address" 
          value={hashAddress} 
          onChange={handleChange} 
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-between">
          <button 
            onClick={handleSubmit} 
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
          <button 
            onClick={onClose} 
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HashPopup;
