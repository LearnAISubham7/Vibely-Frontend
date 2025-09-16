import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function VideosHomePage() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos/`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data.videos);
        setVideos(res.data.data.videos);
      });
  }, []);
  return (
    <div className="flex justify-around flex-wrap gap-y-4 py-4">
      {videos?.map((video) => (
        <Link to={`/watch/${video._id}`} className="w-72 ">
          <div className="relative w-72 h-40">
            <img
              src={video.thumbnail}
              alt="Video Thumbnail"
              className="w-full h-full object-cover rounded-xl"
            />
            <span
              className="absolute bottom-2 right-2 
                 bg-black/80 text-white text-xs 
                 px-2 py-0.5 rounded"
            >
              12:34
            </span>
          </div>

          <div className="flex mt-3 gap-3">
            <img
              src={video.owner.avater}
              alt="Publisher DP"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />

            <div className="flex flex-col overflow-hidden">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 h-5 ">
                {video.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {video.owner.fullName}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                120K views • 3 hours ago
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
