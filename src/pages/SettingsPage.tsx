import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/lib/supabase";
import { useTheme } from "next-themes";
import { useUserProfile } from "@/hooks/use-user-profile"; // Import the new hook
import { Loader2 } from "lucide-react"; // Import Loader2 for loading state

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { userProfile, isLoading, isUpdating, updateProfile } = useUserProfile();

  const [restaurantName, setRestaurantName] = useState("");
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
  
  useEffect(() => {
    if (userProfile) {
      setRestaurantName(userProfile.restaurant_name || "");
      setAutoReplyEnabled(userProfile.auto_reply_enabled);
    }
  }, [userProfile]);

  const isAutoReplyAvailable = userProfile?.subscription_tier === "high";

  const handleSaveSettings = async () => {
    if (!userProfile) {
      showError("User profile not loaded. Please try again.");
      return;
    }

    updateProfile({
      restaurant_name: restaurantName,
      auto_reply_enabled: autoReplyEnabled,
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-128px)] items-center justify-center space-y-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Application Settings</h2>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage basic information for your restaurant.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Restaurant Name</Label>
              <Input
                id="restaurant-name"
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                placeholder="Enter your restaurant name"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Automation Settings</CardTitle>
            <CardDescription>Configure how BistroBot automates replies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-reply">Enable AI Auto-Replies</Label>
              <Switch
                id="auto-reply"
                checked={autoReplyEnabled && isAutoReplyAvailable} // Only checked if available and user enabled
                onCheckedChange={setAutoReplyEnabled}
                disabled={!isAutoReplyAvailable || isUpdating} // Disable if not on high tier or updating
              />
            </div>
            {!isAutoReplyAvailable && (
              <p className="text-sm text-red-500 dark:text-red-400">
                AI Auto-Replies are only available on the high-tier subscription plan. Upgrade to enable this feature.
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              When enabled, BistroBot will automatically draft and publish replies based on review sentiment. Human review is still recommended.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>Configure how the application looks.</CardDescription>
          </CardHeader>
            <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Enable Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                disabled={isUpdating}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isUpdating}>
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;