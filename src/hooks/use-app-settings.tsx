"use client";

import React from "react";

interface AppSettings {
  restaurantContactInfo: string;
  wordsToAvoid: string[];
  wordsToInclude: string[];
}

// This is a mock hook. In a real application, this would fetch
// and update actual settings from your backend/Supabase.
export function useAppSettings() {
  const [settings, setSettings] = React.useState<AppSettings>({
    restaurantContactInfo: "info@bistro.com or (555) 123-4567", // Default contact info
    wordsToAvoid: ["terrible", "horrible", "disgusting"], // Default words to avoid
    wordsToInclude: ["fresh", "delicious", "friendly"], // Default words to include
  });

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return {
    settings,
    updateSettings,
  };
}