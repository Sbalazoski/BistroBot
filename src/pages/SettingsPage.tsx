"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";

const SettingsPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Application Settings</h2>

      <div className="flex-grow p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          This is where you will manage your BistroBot application settings.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-400 mt-2">
          Configuration options will be added here soon.
        </p>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default SettingsPage;