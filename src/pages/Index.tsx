"use client";

import React from "react";
import AuthPage from "./AuthPage";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 relative"> {/* Dynamic gradient background */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-20">
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;