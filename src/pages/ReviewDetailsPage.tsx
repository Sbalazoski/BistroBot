import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import { ArrowLeft, Sparkles } from "lucide-react"; // Import Sparkles icon
import { showSuccess, showError } from "@/utils/toast"; // Import toast utilities
import { mockReviews } from "@/data/mockReviews"; // Import mockReviews

const ReviewDetailsPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const review = mockReviews.find((r) => r.id === reviewId);

  const [replyContent, setReplyContent] = useState<string>("");

  useEffect(() => {
    if (review?.reply) {
      setReplyContent(review.reply);
    } else {
      setReplyContent("");
    }
  }, [review]);

  if (!review) {
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

  const handleGenerateReply = () => {
    let generatedReply = "";
    switch (review.sentiment) {
      case "Positive":
        generatedReply = `Thank you, ${review.customer}, for your wonderful ${review.rating}-star review! We're thrilled to hear you enjoyed your experience. We look forward to serving you again soon!`;
        break;
      case "Negative":
        generatedReply = `Dear ${review.customer}, we are truly sorry to hear about your experience. We take your feedback seriously and are committed to improving. Please contact us directly so we can make things right.`;
        break;
      case "Neutral":
        generatedReply = `Hi ${review.customer}, thank you for your feedback. We appreciate you sharing your thoughts and are always looking for ways to enhance our service. We hope to see you again!`;
        break;
      default:
        generatedReply = `Thank you for your review, ${review.customer}! We appreciate your feedback.`;
    }
    setReplyContent(generatedReply);
    showSuccess("AI reply generated!");
  };

  const handleSaveDraft = () => {
    // In a real app, this would send the replyContent to the backend to save as a draft
    showSuccess("Reply draft saved!");
    console.log("Saving draft:", replyContent);
  };

  const handlePublishReply = () => {
    if (!replyContent.trim()) {
      showError("Reply cannot be empty to publish.");
      return;
    }
    // In a real app, this would send the replyContent to the backend to publish
    showSuccess("Reply published successfully!");
    console.log("Publishing reply:", replyContent);
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
            <span>Review from {review.customer} on {review.platform}</span>
            <Badge
              variant={
                review.sentiment === "Positive"
                  ? "default"
                  : review.sentiment === "Negative"
                  ? "destructive"
                  : "secondary"
              }
            >
              {review.sentiment}
            </Badge>
          </CardTitle>
          <CardDescription className="flex items-center justify-between">
            <span>Rating: {review.rating} ⭐</span>
            <span>Date: {review.date}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-1">Customer Comment:</h3>
            <p className="text-gray-700 dark:text-gray-200">{review.comment}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-1">Our Reply:</h3>
            <Textarea
              placeholder="Write your reply here or generate one with AI..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={handleGenerateReply}>
              <Sparkles className="mr-2 h-4 w-4" /> Generate Reply
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button onClick={handlePublishReply}>
              Publish Reply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewDetailsPage;