import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slice";
import movies from "../images/movie.png";
function NavBar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => ({
    user: state.watchList.user,
    isAuthenticated: state.watchList.isAuthenticated
  }));

  const handleLogout = () => {
    dispatch(logoutUser());
    setShowUserMenu(false);
  };

  return (
    <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm text-xl font-bold flex border-black space-x-10 items-center justify-between pl-4 py-5">
      <div className="flex items-center space-x-10">
        <img src={movies} className="w-[60px]" alt="Movielogo" />

        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          Movies
        </Link>
        <Link to="/watchlist" className="text-blue-400 hover:text-blue-300 transition-colors">
          Watchlist
        </Link>
        <Link to="/Celebritylist" className="text-blue-400 hover:text-blue-300 transition-colors">
          Celebrities
        </Link>
        <Link to="/streaming-history" className="text-blue-400 hover:text-blue-300 transition-colors">
          History
        </Link>
      </div>

      {/* Authentication Section */}
      <div className="flex items-center space-x-4 pr-6">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 text-white hover:text-gray-300 transition-colors"
            >
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=random&color=fff`}
                alt={user?.name}
                className="w-10 h-10 rounded-full border-2 border-blue-400"
              />
              <span className="hidden md:block">{user?.name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg border border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm text-gray-300">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-400/10"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2 rounded-lg transition-all transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
