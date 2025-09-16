import React, { useState, useEffect } from "react";
import axios from "axios";

export function VideoUpdatePopup({ isOpen, onClose, video, onUpdated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // Pre-fill values when popup opens
  useEffect(() => {
    if (video) {
      setTitle(video.title || "");
      setDescription(video.description || "");
      setThumbnail(video.thumbnail || "");
    }
  }, [video]);

  if (!isOpen) return null;

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (thumbnail && typeof thumbnail !== "string") {
        formData.append("thumbnail", thumbnail);
      }
      formData.append("title", title);
      formData.append("description", description);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/videos/${video._id}`,
        formData,
        { withCredentials: true }
      );

      // Update parent state

      onUpdated(res.data.data);
      onClose();
    } catch (error) {
      console.error("Error updating video:", error);
      alert("Failed to update video");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-zinc-900 p-6 rounded-xl w-96">
        <h2 className="text-white text-lg mb-4">Update Video</h2>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          {/* Thumbnail */}
          <div>
            <p className="text-white mb-2">Thumbnail:</p>
            <label
              htmlFor="thumbnail-upload"
              className="px-4 py-2 bg-gray-700 rounded-lg text-white cursor-pointer hover:bg-gray-600 inline-block"
            >
              Choose File
            </label>
            <input
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
            {thumbnail && (
              <div className="mt-2">
                {typeof thumbnail === "string" ? (
                  <img
                    src={thumbnail}
                    alt="Current thumbnail"
                    className="w-32 h-20 object-cover rounded-md"
                  />
                ) : (
                  <p className="text-sm text-green-400">
                    Selected: {thumbnail.name}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-gray-300 text-sm">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700"
              rows="3"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-700 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
