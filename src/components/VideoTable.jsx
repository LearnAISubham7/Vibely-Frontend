import axios from "axios";
import React, { useEffect, useState } from "react";
import { VideoUpdatePopup } from "./VideoUpdatePopup";
export function VideoTable() {
  const [videos, setVideos] = useState([]);
  //  const [isOpen, setIsOpen] = useState(false);
  // const { user } = useUser();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  // const [menuOpen, setMenuOpen] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/videos`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setVideos(res.data.data);
      });
  }, []);

  async function handlePublish(videoId) {
    const res = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/videos/toggle/publish/${videoId}`,
      {},
      {
        withCredentials: true,
      }
    );
    console.log(res.data);

    // Update the videos state
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video._id === videoId
          ? { ...video, isPublished: res.data.data.isPublished }
          : video
      )
    );
  }

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
  return (
    <div className="p-6">
      <VideoUpdatePopup
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        video={selectedVideo}
        onUpdated={(updatedVideo) => {
          setVideos((prev) =>
            prev.map((v) =>
              v._id === updatedVideo._id
                ? {
                    ...v,
                    title: updatedVideo.title,
                    avatar: updatedVideo.avater,
                    description: updatedVideo.description,
                  }
                : v
            )
          );
        }}
      />
      <table className="w-full border border-gray-700 text-left text-md text-gray-300 table-fixed">
        <thead className="bg-gray-800 text-gray-100">
          <tr>
            <th className="p-3 w-18">Status</th>
            <th className="p-3 w-62">Uploaded</th>
            <th className="p-3 w-32">Rating</th>
            <th className="p-3 w-32">Date Uploaded</th>
            <th className="p-3 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr
              key={video._id}
              className="border-b border-gray-700 h-24 overflow-hidden"
            >
              {/* Status column */}
              <td className="p-3">
                {/* <div>{video.isPublished}</div> */}
                <button
                  onClick={() => handlePublish(video._id)}
                  className={`rounded px-4 py-2 h-8 w-20 flex justify-center items-center text-xs text-white cursor-pointer ${
                    video.isPublished
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {video.isPublished ? "Published" : "Unpublished"}
                </button>
              </td>

              {/* Uploaded column */}
              <td className="p-3 ">
                <div className="flex items-center">
                  <img src={video.thumbnail} className=" h-6 w-6 rounded-3xl" />

                  <div className=" ml-2 text-white line-clamp-1">
                    {video.title}
                  </div>
                </div>
              </td>

              {/* Rating column */}
              <td className="p-3 ">
                <span className="text-green-400">{video.likeCount} likes</span>
                <span className=" ml-4 text-red-400">
                  {video.dislikeCount} dislikes
                </span>
              </td>

              {/* Date column */}
              <td className="p-3">{video.createdAt.slice(0, 10)}</td>

              {/* Action buttons */}
              <td className="p-3">
                <button
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation
                    e.stopPropagation();
                    onEdit(video);
                    // setMenuOpen(false);
                  }}
                  className="mr-2 rounded bg-yellow-500 px-3 py-1 text-xs text-black hover:bg-yellow-600 cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation
                    e.stopPropagation();
                    onDelete(video);
                  }}
                  className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
