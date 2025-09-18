import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export function FollowingPage() {
  const { user } = useUser();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    if (!user?.data?._id) return;

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/subscriptions/user/${
          user.data._id
        }`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);

        setChannels(res.data.data.channels || []);
      })
      .catch((err) =>
        console.error("Error fetching subscribed channels:", err)
      );
  }, [user]);

  const handleToggleSubscribe = async (channelId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/subscriptions/toggle/${channelId}`,
        {},
        { withCredentials: true }
      );

      console.log("res.data", res.data);

      // update UI after unsubscribe
      setChannels((prev) => prev.filter((ch) => ch._id !== channelId));
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Following</h2>
      <div className="space-y-4">
        {channels.length === 0 ? (
          <p className="text-gray-400">
            You are not subscribed to any channels.
          </p>
        ) : (
          channels.map((channel) => (
            <Link
              to={`/${channel.username}`}
              key={channel._id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={channel.avater}
                  alt={channel.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {channel.fullName}
                  </h3>
                  <p className="text-sm text-gray-400">
                    @{channel.username} • {channel.subscriberCount} subscribers
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggleSubscribe(channel._id)}
                className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500"
              >
                Subscribed
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
