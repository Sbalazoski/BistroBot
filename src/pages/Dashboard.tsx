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
    </div>
  );
};

export default Dashboard;