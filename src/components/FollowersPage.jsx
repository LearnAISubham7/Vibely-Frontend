import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export function FollowersPage() {
  const { user } = useUser();
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (!user?.data?._id) return;

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/subscriptions/channel/${
          user.data._id
        }`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);

        setFollowers(res.data.data.subscribers || []);
      })
      .catch((err) => console.error("Error fetching subscribers:", err));
  }, [user]);

  const handleToggleSubscribe = async (subscriberId) => {
    try {
      await axios
        .post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/subscriptions/toggle/${subscriberId}`,
          {},
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
        });
      setFollowers((prev) =>
        prev.map((f) =>
          f._id === subscriberId ? { ...f, isSubscribed: !f.isSubscribed } : f
        )
      );
      // optional: refresh or update local state
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Followers</h2>
      <div className="space-y-4">
        {followers.length === 0 ? (
          <p className="text-gray-400">
            No one has subscribed to your channel yet.
          </p>
        ) : (
          followers.map((follower) => (
            <Link
              to={`/${follower.username}`}
              key={follower._id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={follower.avater}
                  alt={follower.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {follower.fullName}
                  </h3>
                  <p className="text-sm text-gray-400">@{follower.username}</p>
                </div>
              </div>
              <button
                onClick={() => handleToggleSubscribe(follower._id)}
                className={`px-4 mt-2 py-2 rounded-lg cursor-pointer ${
                  follower.isSubscribed
                    ? "bg-gray-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {follower.isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
