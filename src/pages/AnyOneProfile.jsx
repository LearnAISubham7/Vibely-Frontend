import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AnyOneProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  console.log(username);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${username}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Current user data:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching current user data:", error);
      });
  }, [username]);

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 relative w-full h-56  ">
        <img
          src={user.data.coverImage}
          alt="Cover"
          className="rounded-2xl w-full h-full object-cover"
        />
      </div>

      <div className="mt-2 px-6 flex justify-between items-center">
        <div className=" flex">
          <div className="left-6 bottom-[-40px]">
            <img
              src={user.data.avater}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"
            />
          </div>
          <div className=" ml-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.data.fullName}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              @{user.data.username} • {user.data.subscriberCount} subscribers
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.data.channelsSubscribedTo} subscribed • 567 videos
            </p>
            <button className="px-4 py-2 mt-4  rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700">
              {user.data.isSubscribed ? "Subscribe" : "not Subscribe"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-6 px-6">
          <button className="pb-2 text-sm font-medium text-red-600 border-b-2 border-red-600">
            Videos
          </button>
          <button className="pb-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Playlists
          </button>
          <button className="pb-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Tweets
          </button>
          <button className="pb-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            Subscribed
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnyOneProfile;
