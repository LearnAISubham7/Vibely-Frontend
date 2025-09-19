import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Play,
  Bookmark,
  Share2,
  MoreVertical,
  ListPlus,
  Trash2,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { UpdatePlaylistPopup } from "./playlistUpdate";

export function PlaylistDetailPage() {
  const { id } = useParams();
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    // Fetch playlist details from the server if not passed via state
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/playlist/${id}`,
          { withCredentials: true }
        );
        console.log("response.data", response.data);

        setPlaylist(response.data.data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };
    fetchPlaylist();
  }, [id]);

  async function deleteVideoFromPlaylist(videoId) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/remove/${videoId}/${id}`,
        {},
        { withCredentials: true }
      );

      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((video) => video._id !== videoId),
      }));
    } catch (error) {
      console.error("Error deleting video from playlist:", error);
    }
  }
  const [showPopup, setShowPopup] = useState(false);
  const owner = playlist?.owner?._id === user?.data._id;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 text-white">
      {/* Left Playlist Info */}
      <div className="lg:w-1/3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4 shadow-lg">
        <img
          src={playlist?.videos[0]?.thumbnail}
          alt={playlist?.name}
          className="w-full rounded-lg object-cover"
        />

        <h1 className="text-2xl font-bold mt-4">{playlist?.name}</h1>

        {/* Creator */}
        <div className="flex items-center gap-3 mt-2">
          <img
            src={playlist?.owner?.avater}
            alt={playlist?.owner?.fullName}
            className="w-10 h-10 rounded-full"
          />
          <span
            onClick={() => navigate(`/channel-profile`)}
            className="text-gray-300 hover:text-gray-100 cursor-pointer"
          >
            {playlist?.owner?.fullName}
          </span>
        </div>

        {/* Stats */}
        <p className="text-sm text-gray-400 mt-2">
          Playlist • {playlist?.videos?.length} videos • 90,426 views
        </p>

        {/* Description */}
        <p className="text-sm text-gray-300 mt-2 line-clamp-3">
          {playlist?.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {/* Play all */}
          <Link
            to={`/watch/${playlist?.videos[0]?._id}`}
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

          {/* Owner-only actions (inline) */}
          {owner && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  navigate(`/playlist/${id}/add-videos`, {
                    state: { playlistId: id },
                  })
                }
                className="flex items-center gap-2 bg-blue-600 px-3 py-1.5 rounded-full text-sm hover:bg-blue-700 transition cursor-pointer"
              >
                <ListPlus className="w-4 h-4" /> Add
              </button>

              <button
                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 bg-yellow-500 px-3 py-1.5 rounded-full text-sm hover:bg-yellow-600 transition cursor-pointer"
              >
                ✏️ Update
              </button>
              {showPopup && (
                <UpdatePlaylistPopup
                  playlist={playlist}
                  onClose={() => setShowPopup(false)}
                  onUpdate={(updated) => setPlaylist(updated)}
                />
              )}

              <button
                onClick={async () => {
                  try {
                    await axios.delete(
                      `${import.meta.env.VITE_BACKEND_URL}/playlist/${
                        playlist._id
                      }`,
                      { withCredentials: true }
                    );
                    navigate(`/${playlist.owner.username}`); // redirect after delete
                  } catch (err) {
                    console.error("Error deleting playlist:", err);
                  }
                }}
                className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-full text-sm hover:bg-red-700 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Right Videos List */}
      <div className="lg:w-2/3 space-y-4">
        {playlist?.videos?.map((video, index) => (
          <div
            key={video._id}
            className="flex gap-4 items-center bg-gray-900 rounded-lg p-3 hover:bg-gray-800 transition relative"
          >
            <div className="flex justify-center items-center text-gray-400 font-medium">
              {index + 1}
            </div>

            <Link
              to={`/watch/${video._id}`}
              className="w-40 h-24 flex-shrink-0 rounded-md overflow-hidden bg-black"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </Link>

            <div className="flex flex-col flex-1 overflow-hidden">
              <h3 className="font-semibold line-clamp-2">{video.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-1">
                {video.owner?.fullName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.floor(video.duration / 60)} min{" "}
                {Math.floor(video.duration % 60)} sec
              </p>
            </div>

            {owner && (
              <button
                onClick={() => deleteVideoFromPlaylist(video._id)}
                className="p-2 rounded-full hover:bg-red-600 hover:text-white text-gray-400 transition cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
