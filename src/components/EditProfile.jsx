import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
// import { data } from "react-router-dom";

export function EditChannel() {
  const [coverImage, setcoverImage] = useState(null);
  const [avater, setAvater] = useState(null);
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");

  // console.log(user?.data.fullName);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setfullName(user?.data?.fullName || "");
      setEmail(user?.data?.email || "");
      setAvater(user?.data?.avater || "");
      setcoverImage(user?.data?.coverImage || "");
    }
    console.log(fullName, email);
  }, [user]);
  const handleSave = async () => {
    if (user.data.fullName !== fullName || user.data.email !== email) {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/update-account`,
        {
          fullName,
          email,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    }
    if (user.data.avater !== avater && avater) {
      const formdata = new FormData();
      formdata.append("avater", avater);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/avater`,
        formdata,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    }
    if (user.data.coverImage !== coverImage && coverImage) {
      const formdata = new FormData();
      formdata.append("coverImage", coverImage);
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/users/cover-image`,
        formdata,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    }
    window.location.reload();
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6 text-gray-200">
      <h1 className="text-3xl font-bold mb-8">Customize Channel</h1>

      {/* coverImage */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Cover Image</h2>

        <label
          htmlFor="cover-upload"
          className="flex flex-col items-center justify-center w-full max-w-md p-6 
               border-2 border-dashed border-gray-500/50 rounded-xl cursor-pointer 
               bg-gray-800 hover:bg-gray-700 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3"
            />
          </svg>
          <span className="text-gray-300">Click to upload or drag & drop</span>
          <span className="text-xs text-gray-500">PNG, JPG up to 6MB</span>
        </label>

        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setcoverImage(e.target.files[0])}
          className="hidden"
        />
        {coverImage && (
          <div className="mt-2">
            {typeof coverImage === "string" ? (
              <img
                src={coverImage}
                alt="Current coverImage"
                className="w-32 h-20 object-cover rounded-md"
              />
            ) : (
              <p className="text-sm text-green-400">
                Selected: {coverImage.name}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Profile Picture */}
      <section className="mb-10">
        <label
          htmlFor="avater"
          className="flex flex-col items-center justify-center w-full max-w-md p-6 
               border-2 border-dashed border-gray-500/50 rounded-xl cursor-pointer 
               bg-gray-800 hover:bg-gray-700 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-gray-400 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3"
            />
          </svg>
          <span className="text-gray-300">Click to upload or drag & drop</span>
          <span className="text-xs text-gray-500">PNG, JPG up to 6MB</span>
        </label>
        <input
          type="file"
          id="avater"
          accept="image/*"
          onChange={(e) => setAvater(e.target.files[0])}
          className="hidden"
        />
        {avater && (
          <div className="mt-2">
            {typeof avater === "string" ? (
              <img
                src={avater}
                alt="Current avater"
                className="w-32 h-20 object-cover rounded-md"
              />
            ) : (
              <p className="text-sm text-green-400">Selected: {avater.name}</p>
            )}
          </div>
        )}
      </section>

      {/* Name */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Full Name</h2>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
      </section>
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Email</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700"
        />
      </section>

      <button
        onClick={handleSave}
        className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Save Changes
      </button>
    </div>
  );
}
