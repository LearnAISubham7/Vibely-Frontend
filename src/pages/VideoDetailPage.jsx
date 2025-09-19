import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
export function VideoDetailPage() {
  const { user } = useUser();
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [videoLikeCount, setVideoLikeCount] = useState(0);
  const [videoDislikeCount, setVideoDisLikeCount] = useState(0);
  const [isVideoReacted, setIsVideoReacted] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [comments, setComments] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  // console.log(id);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res.data.data", res.data);
        setVideo(res.data.data);
        setVideoLikeCount(res.data.data.likeCount);
        setVideoDisLikeCount(res.data.data.dislikeCount);
        setIsVideoReacted(res.data.data.userReaction);
        setSubscriberCount(res.data.data.subscriberCount || 0);
        setIsSubscribed(res.data.data.isSubscribed);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/comments/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setComments(res.data.data);
      });
  }, [id]);

  async function handleVideoLike(videoId, type) {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/likes/toggle/v/${videoId}`,
      {
        type,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    const { likeCount, dislikeCount, userReaction } = res.data.data;
    setVideoLikeCount(likeCount);
    setVideoDisLikeCount(dislikeCount);
    setIsVideoReacted(userReaction);
  }

  async function handleCommentLike(commentId, type) {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/likes/toggle/c/${commentId}`,
      {
        type,
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    const { likeCount, dislikeCount, userReaction } = res.data.data;

    setComments((prev) => ({
      ...prev,
      comments: prev.comments.map((c) =>
        c._id === commentId
          ? { ...c, likeCount, dislikeCount, userReaction }
          : c
      ),
    }));
  }

  async function handleSubscribe(channelId) {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/subscriptions/toggle/${channelId}`,
      {},
      { withCredentials: true }
    );

    setSubscriberCount(res.data.data.subscriberCount);
    setIsSubscribed(res.data.data.isSubscribed);
  }

  const handleCancel = () => {
    setContent("");
    setIsFocused(false);
  };

  const handleComment = async () => {
    if (!content.trim()) return;
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/comments/${id}`,
      { content },
      { withCredentials: true }
    );
    console.log(res.data);

    setContent("");
    setIsFocused(false);
    setComments((prev) => ({
      ...prev,
      comments: [res.data.data, ...prev.comments],
    }));
    setEditingCommentId(null); // exit edit mode
    setEditingContent("");
  };

  const startEditing = (c) => {
    setEditingCommentId(c._id);
    setEditingContent(c.content);
  };

  const handelSave = async (id) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/comments/c/${id}`,
        { content: editingContent },
        { withCredentials: true }
      );
      console.log(response.data);

      setComments((prev) => ({
        ...prev,
        comments: prev.comments.map((c) =>
          c._id === id ? response.data.data : c
        ),
      }));
      setEditingCommentId(null); // exit edit mode
      setEditingContent("");
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  async function onDelete(c) {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/comments/c/${c._id}`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);

    setComments((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => comment._id !== c._id),
    }));
  }

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-gray-900 min-h-dvh">
      <div className=" mt-16 grid grid-cols-12 gap-6 p-6 flex-1">
        {/* Left Section (8/12) */}
        <div className="col-span-8">
          {/* Video Player */}
          <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden">
            <video controls className="w-full h-full" src={video.videoFile} />
          </div>

          {/* Video Title */}
          <h2 className="mt-4 text-2xl font-semibold text-gray-300 line-clamp-2">
            {video.title}
          </h2>

          {/* Channel + Stats */}

          <div className=" mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <Link
                to={`/${video.owner.username}`}
                className=" flex items-center"
              >
                <img
                  src={video.owner.avater}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className=" ml-4">
                  <p className="text-gray-300 font-medium">
                    {video.owner.fullName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {" "}
                    {subscriberCount} subscribers
                  </p>
                </div>
              </Link>
              <button
                onClick={() => handleSubscribe(video.owner._id)}
                className={`ml-4 px-4 py-2 rounded-full font-semibold transition ${
                  isSubscribed
                    ? "bg-gray-600 text-white hover:bg-gray-500"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>
            <div className="flex items-center gap-4 ">
              <button
                onClick={() => handleVideoLike(video._id, "like")}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  isVideoReacted == "like"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                👍 {videoLikeCount}
              </button>
              <button
                onClick={() => handleVideoLike(video._id, "dislike")}
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  isVideoReacted == "dislike"
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                👎{videoDislikeCount}
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                ⬇️ <span>Download</span>
              </button>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {video.views} views • Aug 29, 2025
            </p>

            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed line-clamp-3">
              {video.description}
            </p>

            <button className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Show more
            </button>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              {comments?.comments?.length ?? 0} Comments
            </h2>

            <div className="flex gap-3 mb-6">
              <img
                src={user?.data?.avater}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="flex-1 border-b border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 text-sm p-1 text-gray-900 dark:text-gray-100 transition"
              />
            </div>
            {/* Buttons */}
            {isFocused && (
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleComment}
                  disabled={!content.trim()}
                  className={`px-3 py-1 rounded-full text-white font-semibold transition ${
                    content.trim()
                      ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Comment
                </button>
              </div>
            )}

            {(comments?.comments || []).map((comment) => (
              <div key={comment._id} className="flex gap-3 mb-5">
                <img
                  src={comment.owner.avater}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1">
                  <div className=" relative flex justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {comment.owner.fullName}
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                        2 hours ago
                      </span>
                    </h3>
                    <MoreVertical
                      className="w-5 h-5 text-white cursor-pointer "
                      onClick={(e) => {
                        e.preventDefault(); // prevent navigation
                        e.stopPropagation(); // stop bubbling to Link
                        setMenuOpen(
                          menuOpen === comment._id ? null : comment._id
                        );
                      }}
                    />

                    {menuOpen === comment._id &&
                      (user.data._id === comment.owner._id ? (
                        <div className="absolute top-0 right-0 mt-2 mr-8 w-28 rounded-md  shadow-lg z-10">
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // prevent navigation
                              e.stopPropagation();
                              startEditing(comment);
                              setMenuOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 my-2  text-sm bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" /> Update
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // prevent navigation
                              e.stopPropagation();
                              onDelete(comment);
                              setMenuOpen(false);
                            }}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm bg-red-600 hover:bg-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      ) : (
                        <div className="absolute top-0 right-0 mt-2 mr-8 w-28 rounded-md  shadow-lg z-10">
                          <button className="flex items-center gap-2 w-full px-3 py-2 my-2  text-sm bg-gray-500 hover:bg-gray-600 rounded  cursor-pointer">
                            Report
                          </button>
                        </div>
                      ))}
                  </div>

                  {editingCommentId === comment._id ? (
                    <div className="mt-2">
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        autoFocus
                        className="w-full p-2 text-sm text-white rounded-md "
                      />
                      <div className="flex justify-end gap-2 mt-2">
                        <button
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditingContent("");
                          }}
                          className="px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handelSave(comment._id)}
                          className="px-3 py-1 rounded-full text-white font-semibold bg-blue-600 hover:bg-blue-700 transition"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {comment.content}
                      <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-400 text-sm">
                        <button
                          onClick={() => handleCommentLike(comment._id, "like")}
                          className={`px-4 py-2 rounded-full cursor-pointer ${
                            comment.userReaction == "like"
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          👍 {comment.likeCount}
                        </button>
                        <button
                          onClick={() =>
                            handleCommentLike(comment._id, "dislike")
                          }
                          className={`px-4 py-2 rounded-full cursor-pointer ${
                            comment.userReaction == "dislike"
                              ? "bg-red-500 text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          👎 {comment.dislikeCount}
                        </button>
                        <button className="text-xs">Reply</button>
                      </div>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (4/12) → Recommendations */}
        <div className="col-span-4 flex flex-col gap-4">
          {/* Recommendation 1 */}
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg"
                alt="Video 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 1
              </h4>
              <p className="text-gray-400 text-sm">Music Channel</p>
              <p className="text-gray-500 text-sm">1.2M views • 3 days ago</p>
            </div>
          </div>

          {/* Recommendation 2 */}
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/ysz5S6PUM-U/hqdefault.jpg"
                alt="Video 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 2
              </h4>
              <p className="text-gray-400 text-sm">Gaming Channel</p>
              <p className="text-gray-500 text-sm">920K views • 1 week ago</p>
            </div>
          </div>

          {/* Recommendation 3 */}
          <div className="flex gap-3 ">
            <div className="w-40 h-24 rounded-lg overflow-hidden bg-gray-800">
              <img
                src="https://i.ytimg.com/vi/tgbNymZ7vqY/hqdefault.jpg"
                alt="Video 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden text-gray-400">
              <h4 className="font-semibold line-clamp-2">
                Recommended Video 3
              </h4>
              <p className="text-gray-400 text-sm">Vlogs Channel</p>
              <p className="text-gray-500 text-sm">500K views • 2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
