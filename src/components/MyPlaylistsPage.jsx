import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export function MyPlaylistsPage() {
  const { user, loading } = useUser();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/getUserAllPlaylists/${
          user.data.username
        }`,
        { withCredentials: true }
      )
      .then((res) => {
        setPlaylists(res.data.data);
      })
      .catch((err) => console.error("Error fetching playlists:", err));
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-white mb-6">My Playlists</h1>

      {playlists.length === 0 ? (
        <p className="text-gray-400">You have not created any playlists yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <Link
              key={playlist._id}
              to={`/playlist/${playlist._id}`}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden transition"
            >
              <div className="relative aspect-video">
                {playlist.videos[0] ? (
                  <img
                    src={playlist.videos[0].thumbnail}
                    alt={playlist.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center text-gray-300">
                    No Thumbnail
                  </div>
                )}
              </div>
              <div className="p-3">
                <h2 className="text-white font-semibold text-sm line-clamp-2">
                  {playlist.title}
                </h2>
                <p className="text-gray-400 text-xs mt-1">
                  {playlist.videos.length} videos
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
