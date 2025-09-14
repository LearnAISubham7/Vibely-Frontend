import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/videos/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setVideo(res.data.data);
      });
  }, []);

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
          <h2 className="mt-4 text-2xl font-semibold text-gray-300 ">
            {video.title}
          </h2>

          {/* Channel + Stats */}

          <div className=" mt-2 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={video.owner.avater}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className=" ml-4">
                <p className="text-gray-300 font-medium">
                  {video.owner.fullName}
                </p>
                <p className="text-gray-500 text-sm">193K subscribers</p>
              </div>
              <button className=" ml-4 px-4 py-2 bg-red-600 rounded-full text-white font-semibold">
                Subscribe
              </button>
            </div>
            <div className="flex items-center gap-4 ">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                👍 <span>Like</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                👎
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
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
              1,235 Comments
            </h2>

            <div className="flex gap-3 mb-6">
              <img
                src="src\assets\b.png"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 border-b border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 text-sm p-1 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="flex gap-3 mb-5">
              <img
                src="src\assets\b.png"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  John Doe
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    2 hours ago
                  </span>
                </h3>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  This video was super helpful! Thanks for explaining it so
                  clearly. Lorem ipsum dolor sit amet consectetur, adipisicing
                  elit. Quaerat exercitationem, minus cum molestiae nihil
                  mollitia consectetur, totam ea ad vero unde atque a, maiores
                  facere officia sunt non provident tenetur! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Porro non dignissimos
                  nobis optio! Consequuntur id repudiandae quis veniam a
                  exercitationem qui, autem placeat nisi dolorum vel, in aperiam
                  magnam sit.
                </p>

                <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  <button>👍 24</button>
                  <button>👎 2</button>
                  <button className="text-xs">Reply</button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-5">
              <img
                src="src\assets\b.png"
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Jane Smith
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    5 hours ago
                  </span>
                </h3>
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  I didn’t understand at first, but after rewatching it clicked.
                  Subscribed!
                </p>

                <div className="flex items-center gap-4 mt-2 text-gray-600 dark:text-gray-400 text-sm">
                  <button>👍 10</button>
                  <button>👎 0</button>
                  <button className="text-xs">Reply</button>
                </div>
              </div>
            </div>
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
