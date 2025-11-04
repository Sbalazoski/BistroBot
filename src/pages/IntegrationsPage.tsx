"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link as LinkIcon } from "lucide-react"; // Renamed Link to LinkIcon to avoid conflict
import { showSuccess, showError } from "@/utils/toast";

const IntegrationsPage = () => {
  const handleConnect = (platform: string) => {
    // Simulate connection process
    showSuccess(`Connecting to ${platform}... (This is a mock action)`);
    console.log(`Attempting to connect to ${platform}`);
    // In a real app, this would initiate an OAuth flow or API key setup
  };

  const handleManage = (platform: string) => {
    // Simulate managing an existing integration
    showSuccess(`Managing ${platform} integration... (This is a mock action)`);
    console.log(`Managing ${platform}`);
    // In a real app, this would navigate to a platform-specific settings page
  };

  const integrations = [
    {
      id: "google-my-business",
      name: "Google My Business",
      description: "Connect your Google My Business account to ingest reviews and publish replies.",
      icon: "/public/google-logo.png", // Placeholder for an actual logo
      isConnected: false,
    },
    {
      id: "yelp",
      name: "Yelp",
      description: "Integrate with Yelp to monitor reviews and respond directly.",
      icon: "/public/yelp-logo.png", // Placeholder for an actual logo
      isConnected: true,
    },
    {
      id: "tripadvisor",
      name: "TripAdvisor",
      description: "Link your TripAdvisor account for comprehensive review management.",
      icon: "/public/tripadvisor-logo.png", // Placeholder for an actual logo
      isConnected: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Integrations</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Connect BistroBot to your favorite review platforms to automate replies and manage your online reputation.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold">{integration.name}</CardTitle>
              {/* Placeholder for platform icon */}
              {integration.icon && (
                <img src={integration.icon} alt={`${integration.name} Logo`} className="h-8 w-8" />
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="mb-4">{integration.description}</CardDescription>
              {integration.isConnected ? (
                <Button variant="outline" onClick={() => handleManage(integration.name)}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Manage
                </Button>
              ) : (
                <Button onClick={() => handleConnect(integration.name)}>
                  <LinkIcon className="mr-2 h-4 w-4" /> Connect
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default IntegrationsPage;