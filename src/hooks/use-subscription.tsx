"use client";

import React from "react";
import { apiRequest } from "@/lib/api"; // Import apiRequest
import { showError, showSuccess } from "@/utils/toast"; // Import showSuccess

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
  const upgradeToPro = async () => {
    try {
      // Call backend to create a Stripe checkout session
      const response = await apiRequest<{ checkoutUrl: string }>("/stripe/create-session", "POST", {
        plan: "pro", // Or a specific price ID for the Pro plan
      });

      if (response.checkoutUrl) {
        // Redirect user to Stripe Checkout
        window.location.href = response.checkoutUrl;
      } else {
        showError("Failed to get Stripe checkout URL.");
      }
    } catch (error) {
      showError("Failed to initiate upgrade process.");
      console.error("Upgrade error:", error);
    }
  };

  const downgradeToFree = () => {
    // This would typically involve an API call to your backend
    // to manage the subscription with Stripe or your billing provider.
    // For now, we'll keep it as a client-side mock.
    setSubscription({
      status: "free",
      planName: "Free Tier",
      features: {
        maxTemplates: 3,
        maxIntegrations: 1,
      },
    });
    showSuccess("You've been downgraded to the Free Tier! (Mock)");
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