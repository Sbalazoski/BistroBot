import React from "react";
import ReviewSummaryCard from "@/components/ReviewSummaryCard";
import SentimentTrendChart from "@/components/SentimentTrendChart";
import RecentReviewsList from "@/components/RecentReviewsList"; // Import the new component

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard Overview</h2>

      <ReviewSummaryCard />

      <SentimentTrendChart />

      <RecentReviewsList /> {/* Add the new RecentReviewsList component here */}

      <div className="flex-grow p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Welcome to your BistroBot dashboard! This is where you'll see an overview of your review activity, sentiment trends, and reply statuses.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
          More features will be added here soon.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;