import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
// import { useUser } from "../context/UserContext";
import { formatDistanceToNow } from "date-fns";

export function Tweets({ isMyProfile, profileUsername }) {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  // const { user } = useUser();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tweets/user/${profileUsername}`,
          {
            withCredentials: true,
          }
        );
        console.log("Fetched tweets:", response.data.data);
        setTweets(response.data.data);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    fetchTweets();
  }, [profileUsername]);

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

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full ">
      {/* Tweet Input */}
      {isMyProfile && (
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
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition cursor-pointer"
            >
              {/* <Send className="w-4 h-4" /> */}
              ▶️ Send
            </button>
          </div>
        </div>
      )}

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
                      <div>
                        {formatDistanceToNow(new Date(t.createdAt), {
                          addSuffix: true,
                        })}
                      </div>
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4 ">
                    <div className=" flex-1">
                      {editingTweetId === t._id ? (
                        <div className="mt-2 w-full">
                          <textarea
                            autoFocus
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            rows="2"
                            cols="125"
                            className=" bg-transparent border-none outline-none p-0 m-0 text-white break-all whitespace-pre-wrap resize-none"
                          />
                        </div>
                      ) : (
                        <p className="mt-1 break-all whitespace-pre-wrap max-w-full">
                          {t.content}
                        </p>
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
                    {/* t?.owner?._id === user?.data._id */}
                    {isMyProfile &&
                      (editingTweetId === t._id ? (
                        <div className="flex flex-col mt-1 gap-2">
                          <button
                            onClick={() => saveUpdate(t._id)}
                            className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded cursor-pointer"
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingTweetId(null);
                              setEditingContent("");
                            }}
                            className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded cursor-pointer"
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col mt-1 gap-2 ">
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
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">No tweets uploaded yet.</p>
      )}
    </div>
  );
}
