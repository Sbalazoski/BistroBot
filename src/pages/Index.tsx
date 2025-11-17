"use client";

import React from "react";
import AuthPage from "./AuthPage";
import { MadeWithDyad } from "@/components/made-with-dyad";
import AbstractWritingGraphic from "@/components/AbstractWritingGraphic"; // Import the new graphic component

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 relative overflow-hidden"> {/* Added overflow-hidden to prevent graphic overflow */}
      {/* Abstract Writing Graphics */}
      <AbstractWritingGraphic className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 rotate-12 transform text-primary dark:text-primary-foreground opacity-20" />
      <AbstractWritingGraphic className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 -rotate-12 transform text-primary dark:text-primary-foreground opacity-20" />

      <main className="flex-grow flex items-center justify-center p-4 relative z-20">
        <AuthPage /> {/* Render the AuthPage component directly */}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;