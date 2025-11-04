"use client";

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

// Mock data for reviews (should ideally come from an API or context)
const mockReviews = [
  {
    id: "1",
    platform: "Google",
    customer: "Alice Wonderland",
    rating: 5,
    comment: "Amazing food and excellent service! Highly recommend the pasta. The ambiance was also very pleasant, and the staff were incredibly attentive. A truly delightful dining experience!",
    sentiment: "Positive",
    status: "Replied",
    date: "2023-10-26",
    reply: "Dear Alice, thank you for your wonderful feedback! We're thrilled you enjoyed our pasta and the ambiance. We look forward to welcoming you back soon!",
  },
  {
    id: "2",
    platform: "Yelp",
    customer: "Bob Thebuilder",
    rating: 2,
    comment: "The wait was too long and the coffee was cold. I expected better service given the prices. It was a disappointing visit overall.",
    sentiment: "Negative",
    status: "Pending Reply",
    date: "2023-10-25",
    reply: null,
  },
  {
    id: "3",
    platform: "TripAdvisor",
    customer: "Charlie Chaplin",
    rating: 4,
    comment: "Good atmosphere, decent food. Nothing spectacular but solid. The portions were generous, and the service was prompt.",
    sentiment: "Neutral",
    status: "Drafted",
    date: "2023-10-24",
    reply: "Hi Charlie, thanks for your feedback! We're glad you enjoyed the atmosphere and found the food decent. We're always striving to improve and hope to impress you even more on your next visit.",
  },
  {
    id: "4",
    platform: "Google",
    customer: "Diana Prince",
    rating: 5,
    comment: "Best burger in town! Will definitely be back soon. The patty was juicy, the bun was fresh, and the toppings were perfect. A must-try!",
    sentiment: "Positive",
    status: "Pending Reply",
    date: "2023-10-23",
    reply: null,
  },
  {
    id: "5",
    platform: "Yelp",
    customer: "Eve Harrington",
    rating: 1,
    comment: "Terrible experience. Food was undercooked and staff was rude. I will not be returning and do not recommend this place to anyone.",
    sentiment: "Negative",
    status: "Pending Reply",
    date: "2023-10-22",
    reply: null,
  },
];

const ReviewDetailsPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const navigate = useNavigate();
  const review = mockReviews.find((r) => r.id === reviewId);

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
        <MadeWithDyad />
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
          {review.reply && (
            <div>
              <h3 className="font-semibold text-lg mb-1">Our Reply:</h3>
              <p className="text-gray-700 dark:text-gray-200">{review.reply}</p>
            </div>
          )}
          {!review.reply && (
            <div className="text-muted-foreground italic">No reply yet.</div>
          )}
          <div className="flex justify-end space-x-2">
            {/* Action buttons will go here later, e.g., "Generate Reply", "Edit Reply", "Publish Reply" */}
            <Button variant="secondary">Generate Reply (Mock)</Button>
            <Button>Publish Reply (Mock)</Button>
          </div>
        </CardContent>
      </Card>
      <MadeWithDyad />
    </div>
  );
};

export default ReviewDetailsPage;