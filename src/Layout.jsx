// Layout.jsx
import React from "react";
import { TopBar } from "./components/Topbar";
import { Sidebar } from "./components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="dark:bg-gray-900 ">
      <TopBar />
      <Sidebar />
      <div className="mt-16 ml-64 min-h-dvh ">
        <Outlet />
      </div>
    </div>
  );
}
