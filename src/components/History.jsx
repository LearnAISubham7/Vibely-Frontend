import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

export default function WatchHistory() {
  const [watchHistory, setWatchHistory] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/history`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setWatchHistory(res.data.data);
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
    <div className=" text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>
      <div className="space-y-4">
        {watchHistory.map((video) => (
          <Link
            to={`/watch/${video.video._id}`}
            key={video.video._id}
            className="flex gap-4 items-start hover:bg-neutral-900 p-3 rounded-xl cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-48 h-28">
              <img
                src={video.video.thumbnail}
                alt={video.video.title}
                className="w-full h-full object-cover rounded-xl"
              />
              <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 px-2 py-1 text-xs rounded">
                {formatDuration(video.video.duration)}
              </span>
            </div>

            {/* Video Details */}
            <div className="flex flex-col flex-1 min-w-0">
              <h2 className="font-semibold text-lg line-clamp-2">
                {video.video.title}
              </h2>
              <div className=" flex items-center mt-1">
                <img
                  src={video.video.owner.avater}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-sm text-gray-400 truncate ml-2">
                  {video.video.owner.fullName}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Watched{" "}
                {formatDistanceToNow(new Date(video.watchedAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
