"use client";

import React from "react";
import AuthPage from "./AuthPage";
import MadeWithDyad from "@/components/MadeWithDyad";
import BistroBotPatternOverlay from "@/components/BistroBotPatternOverlay"; // Import the new component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-300 via-rose-300 to-purple-300 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 relative">
      {/* Pattern overlay */}
      <BistroBotPatternOverlay />

      <main className="flex-grow flex items-center justify-center p-4 relative z-20">
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;