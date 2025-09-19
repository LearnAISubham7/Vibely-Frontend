import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function PlaylistPopup({ isOpen, onClose, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  // const handleFileChange = (e) => {
  //   setThumbnail(e.target.files[0]);
  // };

  const handleSave = () => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/`,
        {
          name: title,
          description,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Playlist created successfully:", response.data);
        if (onCreated) onCreated(response.data.data);
        onClose();
      })
      .catch((error) => {
        console.error("Error creating playlist:", error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-900 rounded-xl w-[500px] p-6 relative shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Playlist</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-300 hover:text-white" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400">
              Playlist Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter playlist name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter description..."
              rows="4"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className={`px-4 py-2 rounded-lg text-white cursor-pointer ${
              title.trim()
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-600 cursor-not-allowed"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
