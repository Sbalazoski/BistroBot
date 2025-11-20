"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppSettings } from "@/hooks/use-app-settings";
import { showSuccess } from "@/utils/toast";

const BrandGuidelinesForm = () => {
  const { settings, updateSettings } = useAppSettings();
  const [contactInfo, setContactInfo] = useState(settings.restaurantContactInfo);
  const [wordsToAvoid, setWordsToAvoid] = useState(settings.wordsToAvoid.join(", "));
  const [wordsToInclude, setWordsToInclude] = useState(settings.wordsToInclude.join(", "));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setContactInfo(settings.restaurantContactInfo);
    setWordsToAvoid(settings.wordsToAvoid.join(", "));
    setWordsToInclude(settings.wordsToInclude.join(", "));
  }, [settings]);

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newWordsToAvoid = wordsToAvoid.split(",").map(word => word.trim()).filter(Boolean);
    const newWordsToInclude = wordsToInclude.split(",").map(word => word.trim()).filter(Boolean);

    updateSettings({
      restaurantContactInfo: contactInfo,
      wordsToAvoid: newWordsToAvoid,
      wordsToInclude: newWordsToInclude,
    });
    showSuccess("Brand guidelines saved successfully! (Mock save)");
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Brand Guidelines & Contact Info</CardTitle>
        <CardDescription>
          Define your restaurant's contact information and guidelines for AI-generated replies.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact-info">Restaurant Contact Information</Label>
          <Input
            id="contact-info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="e.g., info@yourrestaurant.com or (123) 456-7890"
          />
          <p className="text-sm text-muted-foreground">
            This information will be used in AI-generated replies for negative reviews.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="words-to-avoid">Words/Phrases to Avoid (comma-separated)</Label>
          <Textarea
            id="words-to-avoid"
            value={wordsToAvoid}
            onChange={(e) => setWordsToAvoid(e.target.value)}
            placeholder="e.g., terrible, horrible, disgusting"
            className="min-h-[80px]"
          />
          <p className="text-sm text-muted-foreground">
            The AI will try to avoid these words/phrases in its generated replies.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="words-to-include">Words/Phrases to Include (comma-separated)</Label>
          <Textarea
            id="words-to-include"
            value={wordsToInclude}
            onChange={(e) => setWordsToInclude(e.target.value)}
            placeholder="e.g., fresh, delicious, friendly"
            className="min-h-[80px]"
          />
          <p className="text-sm text-muted-foreground">
            The AI will try to incorporate these words/phrases into its generated replies.
          </p>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Guidelines"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BrandGuidelinesForm;