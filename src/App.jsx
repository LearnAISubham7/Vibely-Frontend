import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LandingPage } from "./pages/LandingPage";
import { Test } from "./pages/Test";
import { VideoDetailPage } from "./pages/VideoDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ChannelProfile } from "./pages/ChannelProfile";
import Layout from "./Layout";
import AnyOneProfile from "./pages/AnyOneProfile";
import RouteProgress from "./Hooks/RouteProgress.js";
import { PlaylistDetailPage } from "./components/PlaylistDetailPage.jsx";
import { AddToPlaylist } from "./components/PlaylistAddVideo.jsx";
import { EditChannel } from "./components/EditProfile.jsx";
import { FollowingPage } from "./components/FollowingPage.jsx";
import { FollowersPage } from "./components/FollowersPage.jsx";
import { LikedVideosPage } from "./components/LikedVideos.jsx";
import { MyPlaylistsPage } from "./components/MyPlaylistsPage.jsx";
import WatchHistory from "./components/History.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouteProgress />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="test" element={<Test />} />
            <Route path="/watch/:id" element={<VideoDetailPage />} />
            <Route path="/playlist/:id" element={<PlaylistDetailPage />} />
            <Route
              path="/playlist/:id/add-videos"
              element={<AddToPlaylist />}
            />
            <Route path="/edit-profile" element={<EditChannel />} />
            <Route path="/following" element={<FollowingPage />} />
            <Route path="/followers" element={<FollowersPage />} />
            <Route path="/liked-videos" element={<LikedVideosPage />} />
            <Route path="/playlists" element={<MyPlaylistsPage />} />
            <Route path="/history" element={<WatchHistory />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:username/*" element={<ChannelProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
