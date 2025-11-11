"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Link as LinkIcon, Link2Off, Loader2 } from "lucide-react"; // Added Loader2 icon
import { showSuccess, showError } from "@/utils/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Integration {
  id: string;
  name: string;
  description: string;
  isConnected: boolean;
}

const initialIntegrations: Integration[] = [
  {
    id: "google-my-business",
    name: "Google My Business",
    description: "Connect your Google My Business account to ingest reviews and publish replies.",
    isConnected: false,
  },
  {
    id: "yelp",
    name: "Yelp",
    description: "Integrate with Yelp to monitor reviews and respond directly.",
    isConnected: true,
  },
  {
    id: "tripadvisor",
    name: "TripAdvisor",
    description: "Link your TripAdvisor account for comprehensive review management.",
    isConnected: false,
  },
];

const IntegrationsPage = () => {
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false); // New state for loading during connection

  const handleConnectClick = (integration: Integration) => {
    setSelectedIntegration(integration);
    setApiKey(""); // Clear previous API key
    setIsDialogOpen(true);
  };

  const handleConfirmConnect = async () => {
    if (!selectedIntegration) return;

    if (apiKey.trim() === "") {
      showError("Please enter an API Key or Account ID.");
      return;
    }

    setIsConnecting(true); // Start loading
    // Simulate API call delay for OAuth initiation/token exchange
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // In a real app, this would involve sending the API key to your backend
    // and your backend initiating the OAuth flow or direct API connection.
    // For now, we simulate success.
    setIntegrations(integrations.map(integration =>
      integration.id === selectedIntegration.id
        ? { ...integration, isConnected: true }
        : integration
    ));
    showSuccess(`Successfully connected to ${selectedIntegration.name}!`);
    
    setIsConnecting(false); // End loading
    setIsDialogOpen(false);
    setSelectedIntegration(null);
    setApiKey("");
  };

  const handleDisconnect = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to disconnect from ${name}?`)) {
      setIntegrations(integrations.map(integration =>
        integration.id === id
          ? { ...integration, isConnected: false }
          : integration
      ));
      showSuccess(`Disconnected from ${name}.`);
    }
  };

  const handleManage = (platform: string) => {
    showSuccess(`Managing ${platform} integration... (This is a mock action)`);
    console.log(`Managing ${platform}`);
  };

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
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="mb-4">{integration.description}</CardDescription>
              {integration.isConnected ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleManage(integration.name)}>
                    <ExternalLink className="mr-2 h-4 w-4" /> Manage
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDisconnect(integration.id, integration.name)}>
                    <Link2Off className="h-4 w-4" />
                    <span className="sr-only">Disconnect</span>
                  </Button>
                </div>
              ) : (
                <Button onClick={() => handleConnectClick(integration)} disabled={isConnecting}>
                  {isConnecting && selectedIntegration?.id === integration.id ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LinkIcon className="mr-2 h-4 w-4" />
                  )}
                  Connect
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>
              Enter your API Key or Account ID to connect BistroBot with {selectedIntegration?.name}.
              For OAuth-based integrations, this might initiate a redirect.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key / ID
              </Label>
              <Input
                id="api-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="col-span-3"
                placeholder="e.g., sk-xxxxxxxxxxxxxxxxxxxx"
              />
            </div>
            {/* Placeholder for OAuth Redirect URL */}
            <div className="grid grid-cols-4 items-center gap-4 text-sm text-muted-foreground">
              <Label htmlFor="oauth-redirect" className="text-right">
                Redirect URL
              </Label>
              <Input
                id="oauth-redirect"
                value="https://your-backend.com/api/oauth/callback" // Example placeholder
                readOnly
                className="col-span-3 bg-muted cursor-not-allowed"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isConnecting}>Cancel</Button>
            <Button onClick={handleConfirmConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Confirm Connection"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntegrationsPage;