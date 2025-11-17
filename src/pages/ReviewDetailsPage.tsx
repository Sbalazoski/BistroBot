"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Loader2, MessageSquareText, Save, Send, CalendarIcon, Clock } from "lucide-react"; // Import new icons
import { showSuccess, showError } from "@/utils/toast";
import { mockReviews } from "@/data/mockReviews";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Define a type for the review history entry
interface ReviewHistoryEntry {
  timestamp: string;
  action: string;
}

// Extend the mock review type to include history and scheduledAt
interface ReviewWithHistory {
  id: string;
  platform: string;
  customer: string;
  rating: number;
  comment: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  status: "Pending Reply" | "Drafted" | "Replied" | "Scheduled"; // Added 'Scheduled' status
  date: string;
  reply: string | null;
  history: ReviewHistoryEntry[];
  scheduledAt?: string | null; // New field for scheduled time
}

const ReviewDetailsPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  
  // Find the initial review from mock data
  const initialReview = mockReviews.find((r) => r.id === reviewId) as ReviewWithHistory | undefined;

  // Use local state to manage the review details, allowing updates
  const [localReview, setLocalReview] = useState<ReviewWithHistory | null>(initialReview || null);
  const [replyContent, setReplyContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("12:00"); // Default time

  useEffect(() => {
    if (localReview?.reply) {
      setReplyContent(localReview.reply);
    } else {
      setReplyContent("");
    }
    // If a review is scheduled, pre-fill the date/time for editing
    if (localReview?.scheduledAt) {
      const scheduledDateTime = new Date(localReview.scheduledAt);
      setSelectedDate(scheduledDateTime);
      setSelectedTime(format(scheduledDateTime, "HH:mm"));
    } else {
      setSelectedDate(undefined);
      setSelectedTime("12:00");
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
        generatedReply = `Dear ${localReview.customer}, we are truly sorry to hear about your recent experience. We take your feedback seriously and are committed to improving. Please contact us directly at [Your Contact Info] so we can make things right.`;
        break;
      case "Neutral":
        generatedReply = `Hi ${localReview.customer}, thank you for your feedback. We appreciate you sharing your thoughts and are always looking for ways to enhance our service. We hope to see you again!`;
        break;
      default:
        generatedReply = `Thank you for your review, ${localReview.customer}! We appreciate your feedback.`;
    }
    setReplyContent(generatedReply);
    addHistoryEntry("AI drafted reply");
    setLocalReview(prev => prev ? { ...prev, status: "Drafted", reply: generatedReply, scheduledAt: null } : null); // Clear scheduledAt if generating new draft
    showSuccess("AI reply generated!");
    setIsGenerating(false);
  };

  const handleSaveDraft = async () => {
    if (!replyContent.trim()) {
      showError("Reply content cannot be empty to save as draft.");
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addHistoryEntry("User saved draft");
    setLocalReview(prev => prev ? { ...prev, status: "Drafted", reply: replyContent, scheduledAt: null } : null); // Clear scheduledAt if saving as draft
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
    setLocalReview(prev => prev ? { ...prev, status: "Replied", reply: replyContent, scheduledAt: null } : null); // Clear scheduledAt if published
    showSuccess("Reply published successfully!");
    console.log("Publishing reply:", replyContent);
    setIsSaving(false);
  };

  const handleScheduleReply = async () => {
    if (!replyContent.trim()) {
      showError("Reply cannot be empty to schedule.");
      return;
    }
    if (!selectedDate) {
      showError("Please select a date for scheduling.");
      return;
    }

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(hours, minutes, 0, 0);

    if (scheduledDateTime <= new Date()) {
      showError("Scheduled time must be in the future.");
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    addHistoryEntry(`Reply scheduled for ${format(scheduledDateTime, "PPP p")}`);
    setLocalReview(prev => prev ? { ...prev, status: "Scheduled", reply: replyContent, scheduledAt: scheduledDateTime.toISOString() } : null);
    showSuccess(`Reply scheduled for ${format(scheduledDateTime, "PPP p")}!`);
    console.log("Scheduling reply:", replyContent, "at", scheduledDateTime.toISOString());
    setIsSaving(false);
    setIsScheduleDialogOpen(false);
  };

  const getHistoryIcon = (action: string) => {
    if (action.includes("Review ingested")) {
      return <MessageSquareText className="h-3 w-3 text-blue-600 dark:text-blue-400" />;
    } else if (action.includes("AI drafted reply")) {
      return <Sparkles className="h-3 w-3 text-purple-600 dark:text-purple-400" />;
    } else if (action.includes("User saved draft") || action.includes("User edited draft")) {
      return <Save className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />;
    } else if (action.includes("User published reply")) {
      return <Send className="h-3 w-3 text-green-600 dark:text-green-400" />;
    } else if (action.includes("Reply scheduled")) {
      return <Clock className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />;
    }
    return null;
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

          {localReview.status === "Scheduled" && localReview.scheduledAt && (
            <div className="text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Reply scheduled for: {format(new Date(localReview.scheduledAt), "PPP p")}
            </div>
          )}

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
            <Button onClick={() => setIsScheduleDialogOpen(true)} disabled={isSaving || isGenerating}>
              <Clock className="mr-2 h-4 w-4" /> Schedule Reply
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
            <ol className="relative border-l border-gray-200 dark:border-gray-700 ml-4 pl-4"> {/* Added pl-4 for more internal padding */}
              {localReview.history
                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                .map((entry, index) => (
                  <li key={index} className="mb-4 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                      {getHistoryIcon(entry.action)}
                    </span>
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

      {/* Schedule Reply Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Reply</DialogTitle>
            <DialogDescription>
              Select a future date and time to automatically publish this reply.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule-date" className="text-right">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal col-span-3",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="schedule-time" className="text-right">
                Time
              </Label>
              <Input
                id="schedule-time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)} disabled={isSaving}>Cancel</Button>
            <Button onClick={handleScheduleReply} disabled={isSaving || !replyContent.trim() || !selectedDate}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                "Confirm Schedule"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewDetailsPage;