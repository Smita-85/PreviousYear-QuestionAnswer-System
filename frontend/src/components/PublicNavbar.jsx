import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            🎓 QnA Portal
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 text-lg">
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
            <Link to="/register" className="hover:text-yellow-300">Register</Link>
            <Link to="/about" className="hover:text-yellow-300">About</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 px-2 pt-2 pb-3 space-y-2">
          <Link to="/login" className="block px-3 py-2 rounded hover:bg-indigo-500">Login</Link>
          <Link to="/register" className="block px-3 py-2 rounded hover:bg-indigo-500">Register</Link>
          <Link to="/about" className="block px-3 py-2 rounded hover:bg-indigo-500">About</Link>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;

