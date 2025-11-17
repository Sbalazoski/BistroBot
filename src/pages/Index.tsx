"use client";

import React from "react";
import AuthPage from "./AuthPage";
import { MadeWithDyad } from "@/components/made-with-dyad";
import ZigZagBackground from "@/components/ZigZagBackground"; // Import the new zig-zag graphic component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-400 via-amber-500 to-red-500 dark:from-orange-900 dark:via-amber-950 dark:to-red-950 relative overflow-hidden">
      {/* Solid colored zig-zag graphics */}
      <ZigZagBackground />

      <main className="flex-grow flex items-center justify-center p-4 relative z-20">
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;