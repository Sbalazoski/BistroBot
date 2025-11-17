import React, { useState, useEffect } from "react";
import ReviewSummaryCard from "@/components/ReviewSummaryCard";
import SentimentTrendChart from "@/components/SentimentTrendChart";
import RecentReviewsList from "@/components/RecentReviewsList";
import DashboardSkeleton from "@/components/DashboardSkeleton"; // Import the new skeleton component

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate 1.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard Overview</h2>

      <ReviewSummaryCard />

      <SentimentTrendChart />

      <RecentReviewsList />
    </div>
  );
};

export default Dashboard;