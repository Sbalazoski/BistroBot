import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import { mockReviews } from "@/data/mockReviews";
import { useAppSettings } from "@/hooks/use-app-settings"; // Import useAppSettings

// Define a type for the review history entry
interface ReviewHistoryEntry {
  timestamp: string;
  action: string;
}

// Extend the mock review type to include history
interface ReviewWithHistory {
  id: string;
  platform: string;
  customer: string;
  rating: number;
  comment: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  status: "Pending Reply" | "Drafted" | "Replied";
  date: string;
  reply: string | null;
  history: ReviewHistoryEntry[];
}

const ReviewDetailsPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const { settings } = useAppSettings(); // Use the app settings hook
  
  // Find the initial review from mock data
  const initialReview = mockReviews.find((r) => r.id === reviewId) as ReviewWithHistory | undefined;

  // Use local state to manage the review details, allowing updates
  const [localReview, setLocalReview] = useState<ReviewWithHistory | null>(initialReview || null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (localReview?.reply) {
      setReplyContent(localReview.reply);
    } else {
      setReplyContent("");
    }
  }, [localReview]);

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

  const addHistoryEntry = (action: string) => {
    setLocalReview(prev => {
      if (!prev) return null;
      const newHistory = [...prev.history, { timestamp: new Date().toISOString(), action }];
      return { ...prev, history: newHistory };
    });
  };

  const handleGenerateReply = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    let generatedReply = "";
    switch (localReview.sentiment) {
      case "Positive":
        generatedReply = `Dear ${localReview.customer}, thank you for your wonderful ${localReview.rating}-star review! We're thrilled to hear you enjoyed your experience. We look forward to serving you again soon!`;
        break;
      case "Negative":
        generatedReply = `Dear ${localReview.customer}, we are truly sorry to hear about your recent experience. We take your feedback seriously and are committed to improving. Please contact us directly at ${settings.restaurantContactInfo} so we can make things right.`;
        break;
      case "Neutral":
        generatedReply = `Hi ${localReview.customer}, thank you for your feedback. We appreciate you sharing your thoughts and are always looking for ways to enhance our service. We hope to see you again!`;
        break;
      default:
        generatedReply = `Thank you for your review, ${localReview.customer}! We appreciate your feedback.`;
    }

    // Simulate applying "words to avoid" and "words to include"
    let finalReply = generatedReply;
    settings.wordsToAvoid.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Case-insensitive whole word match
      finalReply = finalReply.replace(regex, '***'); // Replace with asterisks
    });
    
    // Simple simulation: if a word to include isn't present, append it (not ideal for real AI)
    settings.wordsToInclude.forEach(word => {
      if (!finalReply.toLowerCase().includes(word.toLowerCase())) {
        finalReply += ` We strive for ${word} experiences.`;
      }
    });


    setReplyContent(finalReply);
    addHistoryEntry("AI drafted reply");
    setLocalReview(prev => prev ? { ...prev, status: "Drafted", reply: finalReply } : null);
    showSuccess("AI reply generated!");
    setIsGenerating(false);
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addHistoryEntry("User saved draft");
    setLocalReview(prev => prev ? { ...prev, status: "Drafted", reply: replyContent } : null);
    showSuccess("Reply draft saved!");
    console.log("Saving draft:", replyContent);
    setIsSaving(false);
  };

  const handlePublishReply = async () => {
    if (!replyContent.trim()) {
      showError("Reply cannot be empty to publish.");
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addHistoryEntry("User published reply");
    setLocalReview(prev => prev ? { ...prev, status: "Replied", reply: replyContent } : null);
    showSuccess("Reply published successfully!");
    console.log("Publishing reply:", replyContent);
    setIsSaving(false);
  };

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