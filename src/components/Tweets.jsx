import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

export function Tweets() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tweets/user`,
          {
            withCredentials: true,
          }
        );
        console.log("Fetched tweets:", response.data.data);
        setTweets(response.data.data.tweets);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, []);

  const handleSend = () => {
    if (tweet.trim() === "") return;

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/tweets/`,
        { content: tweet },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Created tweet:", response.data);
        setTweets([response.data.data, ...tweets]);
        console.log([response.data.data, ...tweets]);

        setTweet("");
      })
      .catch((error) => {
        console.error("Error creating tweet:", error);
      });
  };

  const updateTweet = async (tweetId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/tweets/${tweetId}`,
        { content: tweet },
        { withCredentials: true }
      );
      console.log("Updated tweet:", response.data);
      setTweets((prev) =>
        prev.map((t) => (t._id === tweetId ? response.data.data : t))
      );
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  const [editingTweetId, setEditingTweetId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const startEditing = (t) => {
    setEditingTweetId(t._id);
    setEditingContent(t.content);
  };

  const saveUpdate = async (tweetId) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/tweets/${tweetId}`,
        { content: editingContent },
        { withCredentials: true }
      );
      setTweets((prev) =>
        prev.map((t) => (t._id === tweetId ? response.data.data : t))
      );
      setEditingTweetId(null); // exit edit mode
      setEditingContent("");
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  // const handleLike = (id) => {
  //   setTweets((prev) =>
  //     prev.map((t) => (t.id === id ? { ...t, likes: t.likes + 1 } : t))
  //   );
  // };

  // const handleDislike = (id) => {
  //   setTweets((prev) =>
  //     prev.map((t) => (t.id === id ? { ...t, dislikes: t.dislikes + 1 } : t))
  //   );
  // };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full ">
      {/* Tweet Input */}
      <div className="mb-6">
        <textarea
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="What's happening?"
          className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
        <div className="flex justify-between items-center mt-2">
          <button
            className="p-2 rounded-full hover:bg-gray-700 transition"
            title="Add Emoji"
          >
            {/* <Smile className="w-5 h-5 text-yellow-400" /> */}
            😄
          </button>
          <button
            onClick={handleSend}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            {/* <Send className="w-4 h-4" /> */}
            ▶️ Send
          </button>
        </div>
      </div>

      {/* Tweets List */}
      {tweets && tweets.length > 0 ? (
        <div className="space-y-4">
          {tweets.map((t) => (
            <div
              key={t._id}
              className="bg-gray-800 p-4 rounded-xl border border-gray-700"
            >
              <div className="flex items-start gap-3">
                <img
                  src={t.owner.avater}
                  // alt={t.name}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{t.owner.fullName}</span>
                    <span className="text-sm text-gray-400 ">
                      {/* {t.time} */}
                      <div>{new Date(t.createdAt).toLocaleString()}</div>
                    </span>
                  </div>
                  <div className="flex justify-between items-center ">
                    <div>
                      {editingTweetId === t._id ? (
                        <>
                          <input
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className=""
                          />
                          {/* <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => saveUpdate(t._id)}
                              className="px-3 py-1 bg-green-600 rounded hover:bg-green-700"
                            >
                              ✅ Save
                            </button>
                            <button
                              onClick={() => setEditingTweetId(null)}
                              className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-700"
                            >
                              ❌ Cancel
                            </button>
                          </div> */}
                        </>
                      ) : (
                        <p className="mt-1">{t.content}</p>
                      )}
                      <div className="flex gap-4 mt-2 text-gray-400">
                        <button
                          // onClick={() => handleLike(t._id)}
                          className="flex items-center gap-1 hover:text-blue-400"
                        >
                          {/* <ThumbsUp className="w-4 h-4" /> */}
                          👍
                          {/* {t.likes} */}
                        </button>
                        <button
                          // onClick={() => handleDislike(t.id)}
                          className="flex items-center gap-1 hover:text-red-400"
                        >
                          {/* <ThumbsDown className="w-4 h-4" />  */}
                          👎
                          {/* {t.dislikes} */}
                        </button>
                      </div>
                    </div>
                    {t?.owner?._id === user?.data._id && (
                      <div className="flex mt-1 gap-2">
                        <button
                          onClick={() => startEditing(t)}
                          className="flex items-center gap-2 bg-yellow-500 px-3 py-1.5 rounded-full text-sm hover:bg-yellow-600 transition cursor-pointer"
                        >
                          ✏️ Update
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await axios.delete(
                                `${import.meta.env.VITE_BACKEND_URL}/tweets/${
                                  t._id
                                }`,
                                { withCredentials: true }
                              );
                              setTweets((prev) =>
                                prev.filter((tweet) => tweet._id !== t._id)
                              );
                            } catch (err) {
                              console.error("Error deleting tweet:", err);
                            }
                          }}
                          className="flex items-center gap-2 bg-red-600 px-3 py-1.5 rounded-full text-sm hover:bg-red-700 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No videos uploaded yet.</p>
      )}
    </div>
  );
}
