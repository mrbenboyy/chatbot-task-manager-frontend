import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaColumns,
  FaRobot,
  FaUser,
  FaTasks,
  FaChartBar,
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

  // Vérifie si la route actuelle appartient au menu Dashboard
  const isDashboardActive = () => {
    const dashboardRoutes = ["/dashboard", "/profile"];
    return dashboardRoutes.includes(location.pathname);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-xl border-b border-gray-200 bg-white/80 py-3 shadow-lg backdrop-blur-lg md:top-6 md:rounded-3xl">
      <div className="px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0">
            <Link to={"/"} aria-current="page" className="flex items-center">
              <img className="h-14 w-auto" src={logo} alt="logo" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <Link
              to={"/"}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg ${isActive("/") ? "text-blue-600 font-bold" : "text-gray-900"}`}
            >
              <FaHome className="text-lg" />
              Accueil
            </Link>

            {/* Menu déroulant pour Dashboard */}
            {isAuthenticated && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-2 transition-all duration-200 ${isDashboardActive() ? "text-blue-600 font-bold" : "text-gray-900"} hover:bg-gray-100`}
                >
                  <FaColumns className="text-lg" />
                  Tableau de bord <FaChevronDown className="text-lg" />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 transition-all duration-300 ease-in-out transform ${isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
                >
                  <Link
                    to={"/profile"}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 ${isActive("/profile") ? "text-blue-600 font-bold" : "text-gray-900"}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUser />
                    Profil
                  </Link>
                  <Link
                    to={"/dashboard"}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 ${isActive("/dashboard") ? "text-blue-600 font-bold" : "text-gray-900"}`}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaTasks />
                    Tâches
                  </Link>
                </div>
              </div>
            )}

            <Link
              to={"/aboutus"}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg ${isActive("/aboutus") ? "text-blue-600 font-bold" : "text-gray-900"}`}
            >
              <FaInfoCircle className="text-lg" />
              À propos
            </Link>

            <Link
              to={"/contact"}
              className={`inline-flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg ${isActive("/contact") ? "text-blue-600 font-bold" : "text-gray-900"}`}
            >
              <FaPhoneAlt className="text-lg" />
              Contactez-nous
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center justify-end gap-4">
            {!isAuthenticated && (
              <Link
                to={"/register"}
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50"
              >
                S'inscrire
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                <FaSignOutAlt className="mr-2 text-lg" />
                Déconnexion
              </button>
            ) : (
              <Link
                to={"/login"}
                className={`inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 ${isActive("/login") ? "ring-2 ring-blue-300" : ""}`}
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
