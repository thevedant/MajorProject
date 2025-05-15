import React from 'react';
import NavBar from '../components/NavBar';
import mainBg from '../assets/mainBg.png'; // Import your image
import Login from '../components/HashPopup';
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div >
      {/* Fixed Navbar at top */}
      <NavBar />
      
      {/* Image container with text overlay */}
      <div className="relative w-full h-[600px]"> {/* Container with relative positioning and fixed height */}
        <img 
          src={mainBg}
          alt="Main page banner"
          className="w-full h-full object-cover object-center brightness-50"
        />
        
        {/* Text overlay centered over the image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to KYC Chain
            </h1>
            <p className="text-xl md:text-2xl text-white opacity-90">
              Your one stop solution for KYC verification across all organisations
            </p>
          </div>
        </div>
      </div>

            
      {/* Additional page content would go here */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* New Customer Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Customer</h2>
          <p className="text-gray-600 mb-6">
            Sign up as a new customer to quickly complete your KYC process and gain access to various services.
          </p>
          <Link
            to="/new-customer"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>

        {/* New Organisation Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Organisation</h2>
          <p className="text-gray-600 mb-6">
            Register your organisation to manage and verify multiple KYC processes for your clients.
          </p>
          <Link
            to="/new-organisation"
            className="inline-block px-6 py-3 bg-green-500 text-white rounded-md font-medium hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
      
    </div>
  );
}

export default HomePage;