"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)]"> {/* Adjust min-h to account for header/footer */}
      <div className="flex-grow p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Dashboard Overview</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Welcome to your BistroBot dashboard! This is where you'll see an overview of your review activity, sentiment trends, and reply statuses.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
          More features will be added here soon.
        </p>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Dashboard;