import React, { useEffect, useState } from "react";
import PlaylistPopup from "./PlaylistPopup";
import { ListVideo, MoreVertical, PlayCircle } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export function Playlists() {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/playlist/getUserAllPlaylists`,
          { withCredentials: true }
        );

        console.log(response.data);

        setPlaylists(response.data.data.playlists);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 text-white">
      <div className="bg-gray-800 p-6 rounded-lg flex flex-col items-center justify-center border border-gray-700">
        <p className="text-lg mb-3">Create your playlist</p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 cursor-pointer"
        >
          + Create Playlist
        </button>
        <PlaylistPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {playlists.map((pl) => (
          <Link
            key={pl._id}
            to={`/playlist/${pl._id}`}
            className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition duration-300"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-44">
              <img
                src={pl.videos[0]?.thumbnail}
                alt={pl.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
                <PlayCircle className="w-12 h-12 text-white" />
              </div>

              {/* Video Count */}
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md text-xs text-white flex items-center justify-center">
                <ListVideo />
                {pl?.videos?.length} videos
              </div>
            </div>
            {/* Info */}
            <div className="p-3">
              <h3 className="font-semibold text-white line-clamp-2">
                {pl.name}
              </h3>
              <p className="text-sm text-gray-400 mt-1">View full playlist</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
