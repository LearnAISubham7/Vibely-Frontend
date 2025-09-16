import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { VideosHomePage } from "../components/VideosHomePage";
import UploadPopup from "../components/VideoUploadPopup";
import { Tweets } from "../components/Tweets";
import { Videos } from "../components/Videos";
import { Playlists } from "../components/Playlists";
import { useUser } from "../context/UserContext";
import axios from "axios";
export function ChannelProfile() {
  const [activeTab, setActiveTab] = useState("videos");

  const { user, loading } = useUser();
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/${username}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);

        setProfileUser(response.data);
        setSubscriberCount(response?.data?.data?.subscriberCount || 0);
        setIsSubscribed(response?.data?.data?.isSubscribed || false);
      })
      .catch((error) => {
        console.error("Error fetching current user data:", error);
      });
  }, [username]);

  const isMyProfile = user?.data?._id === profileUser?.data?._id;

  const handleSubscribe = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/subscriptions/toggle/${
          profileUser.data._id
        }`,
        {},
        { withCredentials: true }
      );
      console.log(res.data);

      const { isSubscribed, subscriberCount } = res.data.data;
      setIsSubscribed(isSubscribed);
      setSubscriberCount(subscriberCount);
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  if (!profileUser) return <div>Loading...</div>;

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 relative w-full h-56  ">
        <img
          src={profileUser.data.coverImage}
          alt="Cover"
          className="rounded-2xl w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 px-6 flex justify-between items-center">
        <div className=" flex">
          <div className="left-6 bottom-[-40px]">
            <img
              src={profileUser.data.avater}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-900"
            />
          </div>
          <div className=" ml-2">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {profileUser.data.fullName}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              @{profileUser.data.username} •{" "}
              <Link to={"/followers"} className=" hover:text-gray-300">
                {subscriberCount} subscribers
              </Link>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Link to={"/following"} className=" hover:text-gray-300">
                {profileUser.data.channelsSubscribedTo} subscribed{" "}
              </Link>
              • {profileUser.data.videoCount} videos
            </p>
            {isMyProfile ? (
              <button
                onClick={() => navigate("/edit-profile")}
                className="px-4 mt-2 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={handleSubscribe}
                className={`px-4 mt-2 py-2 rounded-lg cursor-pointer ${
                  isSubscribed
                    ? "bg-gray-600 text-white"
                    : "bg-red-600 text-white"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex space-x-6 border-b border-gray-700 mt-6 px-6">
        {["videos", "tweets", "playlists", "about"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize ${
              activeTab === tab
                ? "border-b-2 border-red-500 text-red-500"
                : "text-gray-400 hover:text-white cursor-pointer"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "videos" && (
        <Videos isMyProfile={isMyProfile} profileUsername={username} />
      )}
      {activeTab === "tweets" && (
        <Tweets isMyProfile={isMyProfile} profileUsername={username} />
      )}
      {activeTab === "playlists" && (
        <Playlists isMyProfile={isMyProfile} profileUsername={username} />
      )}
      {activeTab === "about" && (
        <div className="p-4">
          <p className="text-gray-400 text-center">
            No about information available.
          </p>
        </div>
      )}
    </div>
  );
}
