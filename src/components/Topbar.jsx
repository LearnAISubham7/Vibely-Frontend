import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function TopBar() {
  const { user, loading } = useUser();

  const navigate = useNavigate();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="fixed top-0 left-0 w-full z-50  
            backdrop-blur-md bg-white dark:bg-gray-900  
            shadow-sm px-4  py-3 flex items-center justify-between"
    >
      <Link
        to="/"
        className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
      >
        MyApp
      </Link>

      <input
        type="text"
        placeholder="Search..."
        className="w-full max-w-md px-4 py-2 mx-6 rounded-2xl
                  border border-gray-400/30 dark:border-gray-700/60
                  bg-white dark:bg-gray-900
                  text-gray-800 dark:text-gray-200
                  placeholder-gray-400 dark:placeholder-gray-500
                  focus:ring-2 focus:ring-indigo-500 
                  focus:outline-none transition-all duration-300"
      />
      <div className="flex gap-3">
        {user ? (
          <img
            src={user.data.avater}
            alt="avater"
            className="w-10 h-10 rounded-full object-cover shrink-0 cursor-pointer"
            onClick={() => navigate(`/${user.data.username}`)}
          />
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 rounded-2xl font-medium 
                     border border-gray-500/40 dark:border-gray-400/30 
                     bg-white dark:bg-gray-900 
                     text-gray-800 dark:text-gray-200
                     hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 rounded-2xl font-medium 
                     bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                     text-white shadow-md hover:shadow-lg 
                     hover:scale-105 active:scale-95
                     transition-all duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
