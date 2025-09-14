import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoUploadPopup from "./VideoUploadPopup";

export function Videos() {
  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos/`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Video data:", response.data);
        setVideos(response.data.data.videos);
      })
      .catch((error) => {
        console.error("Error fetching current user data:", error);
      });
  }, []);
  return (
    <div className="p-4">
      {/* Upload Section */}
      <div class="mb-6 flex flex-col items-center justify-center bg-gray-800 rounded-2xl p-10 border border-gray-700">
        <div class="text-gray-300 text-lg mb-3 ">📹 Upload your video</div>
        <button
          onClick={() => setIsOpen(true)}
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition cursor-pointer"
        >
          Upload Video
        </button>
        <VideoUploadPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>

      {/* Videos Section */}
      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/watch/${video._id}`}
              className="w-full sm:w-72 md:w-80"
            >
              <div className="bg-zinc-900 rounded-xl shadow-md overflow-hidden">
                {/* Thumbnail */}
                <div className="relative w-full h-44 bg-black">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-3 flex gap-3">
                  <div className="flex flex-col">
                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-xs">{video.channelName}</p>
                    <p className="text-gray-500 text-xs">
                      {video.views} views • {video.timeAgo}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No videos uploaded yet.</p>
      )}
    </div>
  );
}
