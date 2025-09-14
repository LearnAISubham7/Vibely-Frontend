import React, { useState } from "react";
import axios from "axios";

export function UpdatePlaylistPopup({ playlist, onClose, onUpdate }) {
  console.log(playlist);

  const [name, setName] = useState(playlist?.name || "");
  const [description, setDescription] = useState(playlist?.description || "");

  const handleUpdate = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/playlist/${
        playlist._id
      }`;
      const response = await axios.patch(
        url,
        { name, description },
        { withCredentials: true }
      );

      alert("Playlist updated successfully!");
      console.log("response.data.data", response.data.data);

      onUpdate(response.data.data); // pass updated playlist back
      onClose();
    } catch (error) {
      console.error("Error updating playlist:", error);
      alert("Failed to update playlist.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-2xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
          <h2 className="text-xl font-bold ">Update Playlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            ❌
          </button>
        </div>

        <label className="block mb-2 text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block mb-2 text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-3 py-2 mb-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleUpdate}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
