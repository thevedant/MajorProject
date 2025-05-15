import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-300 shadow-md"> {/* Changed to bg-gray-300 */}
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Brand Name */}
          <div className="flex items-center ">
            <span className="text-3xl font-bold  text-gray-800">KYC Chain</span> {/* Changed to dark text */}
          </div>

          {/* Navigation Links */}
          {/* <div className="flex space-x-8">
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600"> 
              Home
            </a>
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600">
              Organisations
            </a>
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600">
              Documents
            </a>
            <a href="#" className="text-gray-800 font-medium hover:text-gray-600">
              Settings
            </a>
          </div> */}

          {/* Login Button */}
          <Link 
            to = "/login"
            className="px-4 py-2 bg-gray-700 text-white rounded-md font-medium hover:bg-gray-800"> {/* Darker grey button */}
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;