import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoUploadPopup from "./VideoUploadPopup";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
// import { useUser } from "../context/UserContext";
import { VideoUpdatePopup } from "./VideoUpdatePopup";
import { formatDistanceToNow } from "date-fns";

export function Videos({ isMyProfile, profileUsername }) {
  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const { user } = useUser();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/videos/user/${profileUsername}/`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Video data:", response.data);
        setVideos(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching current user data:", error);
      });
  }, [profileUsername]);

  function onEdit(video) {
    setSelectedVideo(video);
    setUpdateOpen(true);
  }

  async function onDelete(video) {
    console.log(video);
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/videos/${video._id}`,
      {
        withCredentials: true,
      }
    );
    setVideos((prev) => prev.filter((v) => v._id !== video._id));
    alert("Video deleted successfully");
  }

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
    <div className="p-4">
      {/* Upload Section */}
      {isMyProfile && (
        <div className="mb-6 flex flex-col items-center justify-center bg-gray-800 rounded-2xl p-10 border border-gray-700">
          <div className="text-gray-300 text-lg mb-3 ">
            📹 Upload your video
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:scale-105 transition cursor-pointer"
          >
            Upload Video
          </button>
          <VideoUploadPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Videos Section */}
      {videos && videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/watch/${video._id}`}
              className="w-full sm:w-72 md:w-80"
            >
              {/* <div className="bg-zinc-900 rounded-xl shadow-md overflow-hidden"> */}
              {/* Thumbnail */}
              <div className="relative w-full h-44 ">
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
                {isMyProfile && (
                  <>
                    <div
                      onClick={(e) => {
                        e.preventDefault(); // prevent navigation
                        e.stopPropagation(); // stop bubbling to Link
                        setMenuOpen(menuOpen === video._id ? null : video._id);
                      }}
                      className="absolute top-2 right-2 bg-black/70 px-1 py-1 rounded-md text-xs text-white flex items-center justify-center"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </div>
                    {menuOpen === video._id && (
                      <div className="absolute top-0 right-0 mt-2 mr-8 w-28 rounded-md  shadow-lg z-10">
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // prevent navigation
                            e.stopPropagation();
                            onEdit(video);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 my-2  text-sm bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" /> Update
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // prevent navigation
                            e.stopPropagation();
                            onDelete(video);
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-red-600 hover:bg-red-700 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Info */}
              <div className="flex mt-3 gap-3">
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-2  ">
                    {video.title}
                  </h3>
                  <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
                    {video.views} views •{" "}
                    {formatDistanceToNow(new Date(video.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              {/* </div> */}
            </Link>
          ))}
          <VideoUpdatePopup
            isOpen={updateOpen}
            onClose={() => setUpdateOpen(false)}
            video={selectedVideo}
            onUpdated={(updatedVideo) => {
              // Update state with new values
              setVideos((prev) =>
                prev.map((v) =>
                  v?._id === updatedVideo?._id ? updatedVideo : v
                )
              );
            }}
          />
        </div>
      ) : (
        <p className="text-gray-400 text-center">No videos uploaded yet.</p>
      )}
    </div>
  );
}
