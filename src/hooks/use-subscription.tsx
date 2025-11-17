"use client";

import React from "react";

export type SubscriptionStatus = "free" | "pro" | "enterprise";

interface SubscriptionInfo {
  status: SubscriptionStatus;
  planName: string;
  features: {
    maxTemplates: number;
    maxIntegrations: number;
    // Add other feature limits here
  };
}

// This is a mock hook. In a real application, this would fetch
// the user's actual subscription status from your backend/Supabase.
export function useSubscription() {
  const [subscription, setSubscription] = React.useState<SubscriptionInfo>({
    status: "free", // Default to 'free' for demonstration
    planName: "Free Tier",
    features: {
      maxTemplates: 3, // Free tier can create up to 3 templates
      maxIntegrations: 1, // Free tier can connect to 1 integration
    },
  });

  // In a real app, you'd fetch this from your backend,
  // potentially using react-query and Supabase.
  // For now, we'll simulate a toggle for demonstration.
  const upgradeToPro = () => {
    setSubscription({
      status: "pro",
      planName: "Pro Plan",
      features: {
        maxTemplates: 100, // Pro tier has more templates
        maxIntegrations: 5, // Pro tier has more integrations
      },
    });
  };

  const downgradeToFree = () => {
    setSubscription({
      status: "free",
      planName: "Free Tier",
      features: {
        maxTemplates: 3,
        maxIntegrations: 1,
      },
    });
  };

  return {
    subscription,
    upgradeToPro,
    downgradeToFree,
    isFree: subscription.status === "free",
    isPro: subscription.status === "pro",
    isEnterprise: subscription.status === "enterprise",
  };
}