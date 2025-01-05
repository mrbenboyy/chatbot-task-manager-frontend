import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaColumns,
  FaUser,
  FaTasks,
  FaChevronDown,
  FaSignOutAlt,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../images/logo.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Vérifie si une route est active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gray-900 text-white fixed inset-x-0 top-0 z-50 shadow-xl backdrop-blur-lg py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Link to={"/"} className="flex items-center gap-2">
            <img className="h-12" src={logo} alt="logo" />
            <span className="text-xl font-bold text-white">TaskMate</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to={"/"}
            className={`text-lg font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20 ${isActive("/") ? "text-yellow-400 font-semibold" : "text-white"
              }`}
          >
            <FaHome className="inline-block text-xl mr-2" />
            Accueil
          </Link>

          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`text-lg font-medium px-4 py-2 flex items-center gap-2 rounded-lg hover:bg-white/20 ${isActive("/dashboard") || isActive("/profile") ? "text-yellow-400 font-semibold" : "text-white"
                  }`}
              >
                <FaColumns className="text-xl" />
                Tableau de bord <FaChevronDown className="ml-2" />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
              >
                <Link
                  to={"/profile"}
                  className={`px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-200 block ${isActive("/profile") ? "text-yellow-400 font-semibold" : "text-gray-900"
                    }`}
                >
                  <FaUser className="inline-block mr-2" />
                  Profil
                </Link>
                <Link
                  to={"/dashboard"}
                  className={`px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-200 block ${isActive("/dashboard") ? "text-yellow-400 font-semibold" : "text-gray-900"
                    }`}
                >
                  <FaTasks className="inline-block mr-2" />
                  Tâches
                </Link>
              </div>
            </div>
          )}

          <Link
            to={"/aboutus"}
            className={`text-lg font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20 ${isActive("/aboutus") ? "text-yellow-400 font-semibold" : "text-white"
              }`}
          >
            <FaInfoCircle className="inline-block text-xl mr-2" />
            À propos
          </Link>

          <Link
            to={"/contact"}
            className={`text-lg font-medium transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/20 ${isActive("/contact") ? "text-yellow-400 font-semibold" : "text-white"
              }`}
          >
            <FaPhoneAlt className="inline-block text-xl mr-2" />
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <Link
              to={"/register"}
              className="inline-flex items-center justify-center rounded-full bg-yellow-400 text-white px-6 py-2 text-sm font-semibold shadow-lg hover:bg-yellow-300 transition-all duration-300"
            >
              S'inscrire
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center rounded-full bg-red-600 text-white px-6 py-2 text-sm font-semibold shadow-lg hover:bg-red-500 transition-all duration-300"
            >
              <FaSignOutAlt className="mr-2 text-lg" />
              Déconnexion
            </button>
          )}

          {!isAuthenticated && (
            <Link
              to={"/login"}
              className={`inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-6 py-2 text-sm font-semibold shadow-lg hover:bg-blue-500 transition-all duration-300 ${isActive("/login") ? "ring-2 ring-blue-300" : ""
                }`}
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
