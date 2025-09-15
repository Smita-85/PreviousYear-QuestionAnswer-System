import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Menu, X, Heart, User, LogOut } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function PrivateNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // ✅ use logout from context

  const handleLogout = () => {
    logout();   // ✅ clears user + token in context and localStorage
    navigate("/"); // ✅ go back to landing page
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link to="/student/dashboard" className="text-2xl font-bold text-purple-400">
            Student Dashboard
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/student/favourites" className="flex items-center gap-2 hover:text-purple-400">
              <Heart className="w-5 h-5" /> Favourites
            </Link>
            <Link to="/student/profile" className="flex items-center gap-2 hover:text-purple-400">
              <User className="w-5 h-5" /> Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-400"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-3">
          <Link to="/student/favourites" className="flex items-center gap-2 hover:text-purple-400">
            <Heart className="w-5 h-5" /> Favourites
          </Link>
          <Link to="/student/profile" className="flex items-center gap-2 hover:text-purple-400">
            <User className="w-5 h-5" /> Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
