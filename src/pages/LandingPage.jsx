import React from "react";
import { TopBar } from "../components/Topbar";
import { Sidebar } from "../components/Sidebar";
import { VideosHomePage } from "../components/VideosHomePage";
export function LandingPage() {
  return (
    <div className="dark:bg-gray-900 ">
      {/* <div className="min-h-dvh "> */}
      <VideosHomePage />
      {/* </div> */}
    </div>
  );
}
