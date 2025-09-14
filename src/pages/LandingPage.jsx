import React from "react";
import { TopBar } from "../components/Topbar";
import { Sidebar } from "../components/Sidebar";

export function LandingPage() {
  return (
    <div className="dark:bg-gray-900 ">
      <TopBar />
      <Sidebar />
      <div className="mt-16 ml-64 min-h-dvh ">{/* <ChannelProfile /> */}</div>
    </div>
  );
}
