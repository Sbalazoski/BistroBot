"use client";

import React from "react";
import AuthPage from "./AuthPage";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 relative"> {/* Clean, subtle background */}
      <main className="flex-grow flex items-center justify-center p-4 relative z-20">
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;