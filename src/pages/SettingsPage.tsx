import React, { useState } from "react"; // Removed useEffect as it's no longer needed for theme or mock data init
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { supabase } from "@/lib/supabase";
import { useTheme } from "next-themes"; // Import useTheme

const SettingsPage = () => {
  const { theme, setTheme } = useTheme(); // Get theme and setTheme from useTheme
  const [restaurantName, setRestaurantName] = useState("BistroBot Restaurant");
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(false);
  const [loading, setLoading] = useState(false); // Set initial loading to false as we're not fetching real data

  // No useEffect needed here for initial theme or mock data loading,
  // as `next-themes` manages the theme and initial state is set above.

  const handleSaveSettings = async () => {
    setLoading(true);
    // In a real app, this would update the settings in your Supabase database
    // For now, we'll simulate a save operation.
    console.log("Mock Saving settings:", { restaurantName, theme, autoReplyEnabled });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      showSuccess("Settings saved successfully! (Mock save)");
    } else {
      showError("You must be logged in to save settings.");
    }
    setLoading(false);
  };

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
                checked={autoReplyEnabled}
                onCheckedChange={setAutoReplyEnabled}
              />
            </div>
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
                checked={theme === "dark"} // Check if current theme is dark
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} // Set theme based on switch
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSaveSettings} disabled={loading}>
            {loading ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default SettingsPage;