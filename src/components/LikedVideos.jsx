import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Bookmark, MoreVertical, Play, Share2 } from "lucide-react";

export function LikedVideosPage() {
  const [LikedVideos, setLikedVideos] = useState([]);
  const { user, loading } = useUser();

  useEffect(() => {
    // Fetch playlist details from the server if not passed via state
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/likes/videos`,
          { withCredentials: true }
        );
        console.log("response.data", response.data);
        setLikedVideos(response.data.data);

        // setPlaylist(response.data.data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };
    fetchPlaylist();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  let Like;
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 text-white">
      {/* Left Like Info */}
      <div className="lg:w-1/3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
        <img
          src={LikedVideos[0]?.video?.thumbnail}
          alt={LikedVideos[0]?.name}
          className="w-full rounded-lg object-cover"
        />

        <h1 className="text-2xl font-bold mt-4">Liked videos</h1>

        {/* Creator */}
        <div className="flex items-center gap-3 mt-2">{user.data.fullName}</div>

        {/* Stats */}
        <p className="text-sm text-gray-400 mt-2">
          Like • {LikedVideos?.length} videos • 90,426 views
        </p>

        {/* Description */}
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {Like?.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {/* Play all */}
          <Link
            to={`/watch/${LikedVideos[0]?._id}`}
            className="flex items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200"
          >
            <Play className="w-5 h-5" /> Play all
          </Link>

          {/* Save / Share */}
          <button className="p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Right Videos List */}
      <div className="lg:w-2/3 space-y-4">
        {LikedVideos?.map((video, index) => (
          <div
            key={video.video._id}
            className="flex gap-4 items-center bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition relative"
          >
            <div className="flex justify-center items-center text-gray-400 font-medium">
              {index + 1}
            </div>

            <Link
              to={`/watch/${video.video._id}`}
              className="w-40 h-24 flex-shrink-0 rounded-md overflow-hidden bg-black"
            >
              <img
                src={video.video.thumbnail}
                alt={video.video.title}
                className="w-full h-full object-cover"
              />
            </Link>

            <div className="flex flex-col flex-1 overflow-hidden">
              <h3 className="font-semibold line-clamp-2">
                {video.video.title}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-1">
                {video.video.owner?.fullName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(video.video.duration / 60)} min{" "}
                {Math.floor(video.video.duration % 60)} sec
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
