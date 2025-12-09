"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { apiRequest } from "@/lib/api"; // Import apiRequest
import { useAppSettings } from "@/hooks/use-app-settings"; // Import useAppSettings

// Define a type for the review history entry
interface ReviewHistoryEntry {
  timestamp: string;
  action: string;
}

// Define the structure of a review as expected from the backend
interface Review {
  id: string;
  platform: string;
  customer: string;
  rating: number;
  comment: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  status: "Pending Reply" | "Drafted" | "Replied";
  date: string; // Assuming date is a string like "YYYY-MM-DD"
  reply: string | null;
  history: ReviewHistoryEntry[];
}

const ReviewDetailsPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const { settings } = useAppSettings(); // Use the app settings hook
  
  const [localReview, setLocalReview] = useState<Review | null>(null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const fetchReview = useCallback(async () => {
    setIsLoadingReview(true);
    try {
      // Assuming /api/reviews/fetch returns an array of reviews
      const reviews: Review[] = await apiRequest<Review[]>("/reviews/fetch", "GET");
      const foundReview = reviews.find((r) => r.id === reviewId);
      if (foundReview) {
        setLocalReview(foundReview);
        setReplyContent(foundReview.reply || "");
      } else {
        showError("Review not found.");
        setLocalReview(null);
      }
    } catch (error) {
      showError("Failed to load review details.");
      console.error("Error fetching review:", error);
      setLocalReview(null);
    } finally {
      setIsLoadingReview(false);
    }
  }, [reviewId]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  const addHistoryEntry = (action: string) => {
    setLocalReview(prev => {
      if (!prev) return null;
      const newHistory = [...prev.history, { timestamp: new Date().toISOString(), action }];
      return { ...prev, history: newHistory };
    });
  };

  const handleGenerateReply = async () => {
    if (!localReview) return;

    setIsGenerating(true);
    try {
      const response = await apiRequest<{ reply: string }>("/reviews/ai-reply", "POST", {
        reviewId: localReview.id,
        comment: localReview.comment,
        sentiment: localReview.sentiment,
        restaurantContactInfo: settings.restaurantContactInfo,
        wordsToAvoid: settings.wordsToAvoid,
        wordsToInclude: settings.wordsToInclude,
      });
      setReplyContent(response.reply);
      addHistoryEntry("AI drafted reply");
      setLocalReview(prev => prev ? { ...prev, status: "Drafted", reply: response.reply } : null);
      showSuccess("AI reply generated!");
    } catch (error) {
      showError("Failed to generate AI reply.");
      console.error("Error generating reply:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!localReview) return;
    setIsSaving(true);
    try {
      // Assuming the backend has an endpoint to save a draft,
      // or that 'submit' can also handle saving drafts without publishing.
      // For now, we'll simulate a save and update local state.
      // In a real scenario, you might have a separate /reviews/save-draft endpoint.
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      addHistoryEntry("User saved draft");
      setLocalReview(prev => prev ? { ...prev, status: "Drafted", reply: replyContent } : null);
      showSuccess("Reply draft saved!");
    } catch (error) {
      showError("Failed to save draft.");
      console.error("Error saving draft:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublishReply = async () => {
    if (!localReview) return;
    if (!replyContent.trim()) {
      showError("Reply cannot be empty to publish.");
      return;
    }
    setIsSaving(true);
    try {
      await apiRequest("/reviews/submit", "POST", {
        reviewId: localReview.id,
        replyContent: replyContent,
      });
      addHistoryEntry("User published reply");
      setLocalReview(prev => prev ? { ...prev, status: "Replied", reply: replyContent } : null);
      showSuccess("Reply published successfully!");
    } catch (error) {
      showError("Failed to publish reply.");
      console.error("Error publishing reply:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingReview) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-128px)] items-center justify-center space-y-6">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading review details...</p>
      </div>
    );
  }

  if (!localReview) {
    return (
      <div className="flex flex-col min-h-[calc(100vh-128px)] items-center justify-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Review Not Found</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          The review you are looking for does not exist.
        </p>
        <Button onClick={() => navigate("/dashboard/reviews")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reviews
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Review Details</h2>
        <Button onClick={() => navigate("/dashboard/reviews")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reviews
        </Button>
      </div>

      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Review from {localReview.customer} on {localReview.platform}</span>
            <Badge
              variant={
                localReview.sentiment === "Positive"
                  ? "default"
                  : localReview.sentiment === "Negative"
                  ? "destructive"
                  : "secondary"
              }
            >
              {localReview.sentiment}
            </Badge>
          </CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Rating: {localReview.rating} ⭐</span>
            <span>Date: {localReview.date}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Customer Comment:</h3>
            <p className="text-gray-700 dark:text-gray-200">{localReview.comment}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">Our Reply:</h3>
            <Textarea
              placeholder="Write your reply here or generate one with AI..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[120px]"
              disabled={isGenerating || isSaving}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={handleGenerateReply} disabled={isGenerating || isSaving}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generate Reply
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleSaveDraft} disabled={isSaving || isGenerating}>
              {isSaving && !isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Draft"
              )}
            </Button>
            <Button onClick={handlePublishReply} disabled={isSaving || isGenerating}>
              {isSaving && !isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish Reply"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Section */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle>Review History</CardTitle>
          <CardDescription>A timeline of actions taken on this review.</CardDescription>
        </CardHeader>
        <CardContent>
          {localReview.history.length > 0 ? (
            <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4">
              {localReview.history
                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                .map((entry, index) => (
                  <li key={index} className="mb-4 ml-6">
                    <span className="absolute flex items-center justify-center w-3 h-3 bg-blue-200 rounded-full -left-1.5 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900"></span>
                    <p className="flex items-center mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                      {entry.action}
                      <time className="block ml-2 text-xs font-normal leading-none text-gray-400 dark:text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </time>
                    </p>
                  </li>
                ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">No history available for this review.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDetailsPage;