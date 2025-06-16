import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginSignup from "../pages/LoginSignup";
import { useAuth } from "../context/AuthContext";
import Cookies from "universal-cookie";

const Navbar = () => {
  const { userDetails, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("token");
    logout(); 
    navigate("/");
  };

  const displayName = userDetails?.name || userDetails?.username || "User";

  return (
    <>
      <div className="navbar fixed z-10 justify-between bg-base-100 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {!userDetails ? (
                <li>
                  <button className="btn" onClick={() => setShowModal(true)}>Login</button>
                </li>
              ) : (
                <>
                  <li className="text-sm p-2">Hi, {displayName}</li>
                  <li>
                    <button className="btn btn-error" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            AI Resume Builder
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {!userDetails ? (
                <li>
                  <button className="btn" onClick={() => setShowModal(true)}>Login</button>
                </li>
              ) : (
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center space-x-2 bg-gray-800 p-1 rounded-full focus:outline-none"
                    onClick={() => setShowDropdown(prev => !prev)}
                  >
                    <img
                      src={userDetails.picture || "https://randomuser.me/api/portraits/lego/5.jpg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 dark:bg-gray-700">
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{userDetails.name}</div>
                        <div className="truncate text-gray-500 dark:text-gray-400">{userDetails.email}</div>
                      </div>
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li><Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Dashboard</Link></li>
                        <li><Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</Link></li>
                        <li><button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Sign out</button></li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
          </ul>
        </div>
      </div>

      {/* Modal Overlay for Login */}
      {showModal && (
        <div className="fixed inset-0 z-50 mt-[-20px] flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-gray-800 rounded-md p-2 max-w-2xl w-full h-[90vh]">
            <button
              className="absolute top-2 right-4 text-xl font-bold text-gray-400 hover:text-white cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <LoginSignup />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
