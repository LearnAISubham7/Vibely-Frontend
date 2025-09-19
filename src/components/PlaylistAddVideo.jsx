import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export function AddToPlaylist() {
  const { state } = useLocation();
  const playlistId = state?.playlistId;

  // const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos/`, {
        withCredentials: true,
      })
      .then((response) => {
        setVideos(response.data.data.videos);
      })
      .catch((error) => {
        console.error("Error fetching current user data:", error);
      });
  }, []);

  const handleSelect = (videoId) => {
    setSelected((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleAdd = async () => {
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/playlist/add/${playlistId}`;

      await axios.patch(url, { videoIds: selected }, { withCredentials: true });

      alert("Videos added successfully!");
      navigate(`/playlist/${playlistId}`);
    } catch (error) {
      console.error("Error adding videos:", error);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Select Videos to Add</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video._id}
            onClick={() => handleSelect(video._id)}
            className={`p-3 rounded-lg cursor-pointer border ${
              selected.includes(video._id)
                ? "border-blue-500 bg-blue-900/30"
                : "border-gray-700 bg-gray-800"
            }`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-2 font-semibold line-clamp-1">{video.title}</h3>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <button
          onClick={handleAdd}
          className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          Add {selected.length} Videos
        </button>
      )}
    </div>
  );
}
