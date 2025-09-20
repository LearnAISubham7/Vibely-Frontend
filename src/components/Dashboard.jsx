import axios from "axios";
import React, { useEffect, useState } from "react";
import { VideoTable } from "./VideoTable";

export default function Dashboard() {
  // Dummy stats
  // const stats = {
  //   totalVideos: 12,
  //   totalViews: 45321,
  //   totalLikes: 8920,
  //   totalSubscribers: 1340,
  // };

  const [stats, setStats] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/dashboard/stats`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setStats(res.data.data);
      });
  }, []);

  // Dummy videos
  // const videos = [
  //   {
  //     _id: "1",
  //     title: "Building a YouTube Clone in React with Tailwind",
  //     thumbnail: "https://placehold.co/400x250?text=Video+1",
  //     views: 1200,
  //     createdAt: "2025-09-10",
  //   },
  //   {
  //     _id: "2",
  //     title: "Understanding Node.js & Express in 10 Minutes",
  //     thumbnail: "https://placehold.co/400x250?text=Video+2",
  //     views: 940,
  //     createdAt: "2025-09-05",
  //   },
  //   {
  //     _id: "3",
  //     title: "Mastering MongoDB Aggregation Pipelines",
  //     thumbnail: "https://placehold.co/400x250?text=Video+3",
  //     views: 760,
  //     createdAt: "2025-08-30",
  //   },
  // ];

  return (
    <div className=" text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Channel Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Videos" value={stats?.totalVideo} />
        <StatCard title="Total Views" value={stats?.totalViews} />
        <StatCard title="Total Likes" value={stats?.totalLikes} />
        <StatCard title="Subscribers" value={stats?.totalSubscribers} />
      </div>

      {/* Uploaded Videos */}
      <h2 className="text-xl font-semibold mb-4">Uploaded Videos</h2>
      {/* <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="flex gap-4 items-start hover:bg-neutral-900 p-3 rounded-xl"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-40 h-24 object-cover rounded-xl flex-shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="font-semibold text-lg line-clamp-2">
                {video.title}
              </h3>
              <p className="text-sm text-gray-400">{video.views} views</p>
              <p className="text-xs text-gray-500">
                Uploaded {new Date(video.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div> */}
      <VideoTable />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl shadow-md text-center">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
