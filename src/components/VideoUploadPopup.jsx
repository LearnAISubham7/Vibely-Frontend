import axios from "axios";
import React, { useState } from "react";

const VideoUploadPopup = ({ isOpen, onClose }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!(videoFile || thumbnail || title || description)) {
      alert(
        "Please select a video file, a thumbnail, and provide a title and description to upload."
      );
      return;
    }

    // Later: send this data to backend
    console.log("Uploading video:", {
      videoFile,
      thumbnail,
      title,
      description,
    });

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/videos/`, formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Video uploaded successfully:", response.data);
        onClose(); // close modal after save
      })
      .catch((error) => {
        console.error("Error uploading video:", error);
      });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* Modal Box */}
      <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-[600px] max-w-full p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-3">
          <h2 className="text-xl font-semibold">Upload Videos</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white cursor-pointer"
          >
            ❌
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 mt-5">
          <div className="mb-6">
            <p className="text-white mb-2">Video:</p>
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-6 cursor-pointer hover:border-blue-500"
            >
              <p className="text-gray-300">
                Drag and drop video files to upload
              </p>
              <p className="text-sm text-gray-400">
                Your videos will be private until you publish them.
              </p>
              <span className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Select Files
              </span>
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            {videoFile && (
              <p className="text-sm text-green-400 mt-2">
                Selected: {videoFile.name}
              </p>
            )}
          </div>

          <div className="mb-6">
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
              <p className="text-sm text-green-400 mt-2">
                Selected: {thumbnail.name}
              </p>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full border border-gray-700 rounded-lg bg-gray-800 px-3 py-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Enter video description"
              className="w-full border border-gray-700 rounded-lg bg-gray-800 px-3 py-2"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-green-600 rounded-md hover:bg-green-700 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadPopup;
