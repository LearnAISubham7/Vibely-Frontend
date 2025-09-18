import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

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

  function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    if (h > 0) {
      return [
        h,
        m.toString().padStart(2, "0"),
        s.toString().padStart(2, "0"),
      ].join(":");
    } else {
      return [m, s.toString().padStart(2, "0")].join(":");
    }
  }

  return (
    <div className="flex justify-around flex-wrap gap-y-4 py-4">
      {videos?.map((video) => (
        <Link to={`/watch/${video._id}`} key={video._id} className="w-72 ">
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
              {formatDuration(video.duration)}
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
                {video.views} views •{" "}
                {formatDistanceToNow(new Date(video.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
