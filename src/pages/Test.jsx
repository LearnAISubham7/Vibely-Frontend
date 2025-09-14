// import React from "react";
// import { VideosListing } from "../components/VideosListing";
// export function Test() {
//   return (
//     <div>
//       <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
//         <div
//           className="fixed top-0 left-0 w-full z-50
//             backdrop-blur-md bg-white dark:bg-gray-900
//             shadow-sm px-4  py-3 flex items-center justify-between"
//         >
//           <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
//             MyApp
//           </div>

//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full max-w-md px-4 py-2 mx-6 rounded-2xl
//                   border border-gray-400/30 dark:border-gray-700/60
//                   bg-white dark:bg-gray-900
//                   text-gray-800 dark:text-gray-200
//                   placeholder-gray-400 dark:placeholder-gray-500
//                   focus:ring-2 focus:ring-indigo-500
//                   focus:outline-none transition-all duration-300"
//           />

//           <div className="flex gap-3">
//             <button
//               className="px-5 py-2 rounded-2xl font-medium
//                      border border-gray-500/40 dark:border-gray-400/30
//                      bg-white dark:bg-gray-900
//                      text-gray-800 dark:text-gray-200
//                      hover:bg-gray-100 dark:hover:bg-gray-800
//                      transition-all duration-300"
//             >
//               Login
//             </button>
//             <button
//               className="px-5 py-2 rounded-2xl font-medium
//                      bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
//                      text-white shadow-md hover:shadow-lg
//                      hover:scale-105 active:scale-95
//                      transition-all duration-300"
//             >
//               Sign Up
//             </button>
//           </div>
//         </div>

//         <main className="flex-1 flex overflow-hidden">
//           <div className="flex-1 p-4 overflow-y-auto">
//             <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
//               <iframe
//                 className="w-full h-full"
//                 src="https://www.youtube.com/embed/dQw4w9WgXcQ"
//                 title="Video Player"
//                 allowfullscreen
//               ></iframe>
//             </div>

//             <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
//               Example Video Title Goes Here
//             </h2>

//             <div className="flex items-center gap-3 mt-2">
//               <img
//                 src="./src/assets/Screenshot.png"
//                 alt="Publisher"
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div>
//                 <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
//                   Channel Name
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   1.2M subscribers
//                 </p>
//               </div>
//               <button className="ml-auto bg-red-600 text-white px-4 py-1 rounded-full text-sm">
//                 Subscribe
//               </button>
//             </div>

//             <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//               120K views • 3 hours ago
//             </p>

//             <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
//               This is the video description. It can span multiple lines and give
//               more context.
//             </p>
//           </div>

//           <aside className="w-96 p-4 border-l border-gray-200 dark:border-gray-700 overflow-y-auto hidden md:block">
//             <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-3">
//               Up Next
//             </h3>

//             <VideosListing />
//           </aside>
//         </main>
//       </div>
//     </div>
//   );
// }

// export function Test() {
//   return (
//     <div className="flex flex-col w-full">
//       {/* Cover Image */}
//       <div className="relative w-full h-48 bg-gray-300">
//         <img
//           src="https://via.placeholder.com/1200x250"
//           alt="Cover"
//           className="w-full h-full object-cover"
//         />
//         {/* Profile Image */}
//         <div className="absolute left-6 bottom-[-40px]">
//           <img
//             src="https://via.placeholder.com/100"
//             alt="Profile"
//             className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-900"
//           />
//         </div>
//       </div>

//       {/* Channel Info */}
//       <div className="mt-14 px-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900 dark:text-white">
//             Channel Name
//           </h1>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             @channel_id
//           </p>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             120K subscribers • 250 subscribed
//           </p>
//         </div>
//         <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700">
//           Subscribe
//         </button>
//       </div>

//       {/* Tabs Section */}
//       <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
//         <div className="flex gap-6 px-6">
//           <button className="pb-2 text-sm font-medium text-red-600 border-b-2 border-red-600">
//             Videos
//           </button>
//           <button className="pb-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
//             Playlists
//           </button>
//           <button className="pb-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
//             Tweets
//           </button>
//           <button className="pb-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
//             Subscribed
//           </button>
//         </div>
//       </div>

//       {/* Content Area */}
//       <div className="px-6 py-6">
//         {/* Example Videos Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           <div className="w-full">
//             <img
//               src="https://via.placeholder.com/300x180"
//               alt="Video"
//               className="rounded-xl object-cover w-full"
//             />
//             <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
//               Example Video Title
//             </h3>
//             <p className="text-xs text-gray-600 dark:text-gray-400">
//               120K views • 3 hours ago
//             </p>
//           </div>
//           <div className="w-full">
//             <img
//               src="https://via.placeholder.com/300x180"
//               alt="Video"
//               className="rounded-xl object-cover w-full"
//             />
//             <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
//               Another Video
//             </h3>
//             <p className="text-xs text-gray-600 dark:text-gray-400">
//               90K views • 1 day ago
//             </p>
//           </div>
//           {/* Add more video cards */}
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
// // import { PlayCircle } from "lucide-react";

// export function Test() {
//   const [activeTab, setActiveTab] = useState("videos");

//   // Dummy data
//   const videos = [
//     {
//       id: 1,
//       title: "My First Video",
//       thumbnail: "https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg",
//       views: "1.2K",
//       time: "2 days ago",
//     },
//     {
//       id: 2,
//       title: "React Tutorial",
//       thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
//       views: "4.5K",
//       time: "1 week ago",
//     },
//     {
//       id: 3,
//       title: "Tailwind Tips",
//       thumbnail: "https://i.ytimg.com/vi/lCxcTsOHrjo/hqdefault.jpg",
//       views: "2.3K",
//       time: "3 weeks ago",
//     },
//   ];

//   const playlists = [
//     {
//       id: 1,
//       name: "Web Dev Tutorials",
//       thumbnail: "https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg",
//       count: 12,
//     },
//     {
//       id: 2,
//       name: "Entertainment Vlogs",
//       thumbnail: "https://i.ytimg.com/vi/ScMzIvxBSi4/hqdefault.jpg",
//       count: 8,
//     },
//   ];

//   return (
//     <div className="text-white p-6">
//       {/* Cover + Avatar */}
//       <div className="relative w-full h-56 bg-gray-800 rounded-2xl overflow-hidden">
//         <img
//           src="https://picsum.photos/1200/300"
//           alt="Cover"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute bottom-[-40px] left-6">
//           <img
//             src="https://i.pravatar.cc/150?img=5"
//             alt="Avatar"
//             className="w-32 h-32 rounded-full border-4 border-gray-900"
//           />
//         </div>
//       </div>

//       {/* Channel Info */}
//       <div className="mt-14 px-6">
//         <h1 className="text-2xl font-bold">Subham Dev</h1>
//         <p className="text-gray-400">@subham • 120K subscribers • 560 videos</p>
//         <button className="mt-3 px-4 py-2 bg-blue-600 rounded-lg">Edit</button>
//       </div>

//       {/* Tabs */}
//       <div className="flex space-x-6 border-b border-gray-700 mt-6 px-6">
//         {["videos", "playlists", "about"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`pb-3 capitalize ${
//               activeTab === tab
//                 ? "border-b-2 border-red-500 text-red-500"
//                 : "text-gray-400 hover:text-white"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Videos Tab */}
//       {activeTab === "videos" && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               className="bg-gray-900 rounded-xl overflow-hidden"
//             >
//               <img
//                 src={video.thumbnail}
//                 alt={video.title}
//                 className="w-full h-40 object-cover"
//               />
//               <div className="p-3">
//                 <h3 className="font-semibold line-clamp-2">{video.title}</h3>
//                 <p className="text-sm text-gray-400">
//                   {video.views} views • {video.time}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Playlists Tab */}
//       {activeTab === "playlists" && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//           {playlists.map((pl) => (
//             <div
//               key={pl.id}
//               className="group bg-gray-900 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition duration-300"
//             >
//               {/* Thumbnail */}
//               <div className="relative w-full h-44">
//                 <img
//                   src={pl.thumbnail}
//                   alt={pl.name}
//                   className="w-full h-full object-cover"
//                 />
//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300">
//                   {/* <PlayCircle className="w-12 h-12 text-white" /> */}▶
//                 </div>

//                 {/* Video Count */}
//                 <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded-md text-xs text-white">
//                   {pl.count} videos
//                 </div>
//               </div>

//               {/* Info */}
//               <div className="p-3">
//                 <h3 className="font-semibold text-white line-clamp-2">
//                   {pl.name}
//                 </h3>
//                 <p className="text-sm text-gray-400 mt-1">View full playlist</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* About Tab */}
//       {activeTab === "about" && (
//         <div className="p-6 text-gray-300">
//           <h3 className="text-lg font-semibold">About Subham</h3>
//           <p className="mt-2">
//             Hi, I'm Subham 👋 I make coding tutorials, share project ideas, and
//             post tech content. Subscribe to learn and grow with me!
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Test() {
  const { state } = useLocation();
  const playlistId = state?.playlistId;

  // const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState([]);

  // useEffect(() => {
  //   // Fetch current user's videos
  //   axios
  //     .get("http://localhost:8000/api/v1/video/myVideos", {
  //       withCredentials: true,
  //     })
  //     .then((res) => setVideos(res.data.data.videos))
  //     .catch((err) => console.error("Error fetching videos:", err));
  const videos = [
    {
      _id: "vid1",
      title: "React Crash Course",
      thumbnail: "https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg",
    },
    {
      _id: "vid2",
      title: "Learn Node.js in 1 Hour",
      thumbnail: "https://img.youtube.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
    },
    {
      _id: "vid3",
      title: "MongoDB Full Tutorial",
      thumbnail: "https://img.youtube.com/vi/-56x56UppqQ/maxresdefault.jpg",
    },
    {
      _id: "vid4",
      title: "Tailwind CSS Tutorial",
      thumbnail: "https://img.youtube.com/vi/dFgzHOX84xQ/maxresdefault.jpg",
    },
    {
      _id: "vid5",
      title: "Next.js Beginner Guide",
      thumbnail: "https://img.youtube.com/vi/1WmNXEVia8I/maxresdefault.jpg",
    },
  ];

  // }, []);

  const handleSelect = (videoId) => {
    setSelected((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  };

  const handleAdd = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/playlist/${playlistId}/addVideos`,
        { videos: selected },
        { withCredentials: true }
      );
      alert("Videos added successfully!");
    } catch (error) {
      console.error("Error adding videos:", error);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Select Videos to Add</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video._id}
            onClick={() => handleSelect(video._id)}
            className={`p-3 rounded-lg cursor-pointer border ${
              selected.includes(video._id)
                ? "border-blue-500 bg-blue-900/30"
                : "border-gray-700 bg-gray-800"
            }`}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="mt-2 font-semibold">{video.title}</h3>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <button
          onClick={handleAdd}
          className="mt-6 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add {selected.length} Videos
        </button>
      )}
    </div>
  );
}
