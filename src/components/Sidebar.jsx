import React from "react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 
              bg-white dark:bg-gray-900 
              border-r border-gray-200 dark:border-gray-700 
              shadow-sm flex flex-col p-4 justify-between"
    >
      <div>
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          🏠 Home
        </Link>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          ❤️ Liked Videos
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          📜 History
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          🎥 My Content
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          📂 Collections
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          👥 Subscribers
        </a>
      </div>

      <div>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          🛟 Support
        </a>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-2 rounded-xl
                    text-gray-700 dark:text-gray-200
                    hover:bg-indigo-500 hover:text-white transition-all hover:scale-105"
        >
          ⚙️ Settings
        </a>
      </div>
    </aside>
  );
}
