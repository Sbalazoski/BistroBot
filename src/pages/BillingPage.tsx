"use client";

import React, { useState } from "react"; // Import useState
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Crown, ArrowUpCircle, Loader2 } from "lucide-react"; // Import Loader2
import { useSubscription } from "@/hooks/use-subscription";
import { showSuccess, showError } from "@/utils/toast"; // Import showError

const BillingPage = () => {
  const { subscription, upgradeToPro, downgradeToFree, isFree, isPro } = useSubscription();
  const [isUpgrading, setIsUpgrading] = useState(false); // New loading state

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    try {
      await upgradeToPro();
      // The upgradeToPro hook handles redirection, so no success toast here
      // If it returns, it means there was an error or no redirection happened
    } catch (error) {
      showError("Failed to initiate upgrade.");
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleDowngrade = () => {
    downgradeToFree();
    // showSuccess is already called inside downgradeToFree
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Billing & Plans</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Manage your BistroBot subscription and explore available plans.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Current Plan Card */}
        <Card className="col-span-full lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" /> Your Current Plan
            </CardTitle>
            <CardDescription>Details of your active BistroBot subscription.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">{subscription.planName}</span>
              <Badge variant={isFree ? "secondary" : "default"}>{subscription.status.toUpperCase()}</Badge>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Up to {subscription.features.maxTemplates} Reply Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Up to {subscription.features.maxIntegrations} Integrations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Basic Review Management</span>
              </li>
              {isPro && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Priority Support</span>
                </li>
              )}
            </ul>
            <div className="flex gap-2">
              {isFree && (
                <Button onClick={handleUpgrade} className="w-full" disabled={isUpgrading}>
                  {isUpgrading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Upgrading...
                    </>
                  ) : (
                    <>
                      <ArrowUpCircle className="mr-2 h-4 w-4" /> Upgrade to Pro
                    </>
                  )}
                </Button>
              )}
              {isPro && (
                <Button variant="outline" onClick={handleDowngrade} className="w-full">
                  Downgrade to Free
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              (This is a mock billing page. Real upgrades/downgrades would involve a payment provider.)
            </p>
          </CardContent>
        </Card>

        {/* Other Plan Options (Example) */}
        <Card>
          <CardHeader>
            <CardTitle>Pro Plan</CardTitle>
            <CardDescription>Unlock advanced features for growing restaurants.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold">$99<span className="text-sm font-normal text-muted-foreground">/month</span></p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> Unlimited Reply Templates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> 5+ Integrations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> Advanced Analytics
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> Priority Support
              </li>
            </ul>
            <Button className="w-full" disabled={isPro || isUpgrading} onClick={handleUpgrade}>
              {isUpgrading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Upgrading...
                </>
              ) : isPro ? (
                "Current Plan"
              ) : (
                "Choose Pro"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise Plan</CardTitle>
            <CardDescription>Custom solutions for large restaurant groups.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-2xl font-bold">Custom</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> All Pro features
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> Dedicated Account Manager
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> Custom Integrations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" /> On-premise deployment options
              </li>
            </ul>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BillingPage;