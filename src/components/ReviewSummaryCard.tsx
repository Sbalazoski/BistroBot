import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquareText, TrendingUp, Clock, ThumbsDown } from "lucide-react"; // Import Clock and ThumbsDown icons
import { mockReviews } from "@/data/mockReviews"; // Import mockReviews to calculate new metrics

const ReviewSummaryCard = () => {
  // Calculate total reviews
  const totalReviews = mockReviews.length;

  // Calculate average rating
  const averageRating = totalReviews > 0 
    ? (mockReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : "0.0";

  // Calculate new reviews today
  const newReviewsToday = mockReviews.filter(review => {
    const reviewDate = new Date(review.date);
    const today = new Date();
    return reviewDate.toDateString() === today.toDateString();
  }).length;

  // Calculate Pending Replies
  const pendingReplies = mockReviews.filter(review => review.status === "Pending Reply").length;

  // Calculate Negative Reviews This Week
  const negativeReviewsThisWeek = mockReviews.filter(review => {
    const reviewDate = new Date(review.date);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Set to 7 days ago
    return review.sentiment === "Negative" && reviewDate >= oneWeekAgo;
  }).length;


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"> {/* Adjusted grid for more cards */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <MessageSquareText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReviews}</div>
          <p className="text-xs text-muted-foreground">
            +20% from last month (mock)
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageRating} / 5</div>
          <p className="text-xs text-muted-foreground">
            Based on {totalReviews} reviews
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Reviews Today</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{newReviewsToday}</div>
          <p className="text-xs text-muted-foreground">
            Since yesterday
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Replies</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingReplies}</div>
          <p className="text-xs text-muted-foreground">
            Reviews awaiting your attention
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Negative Reviews (7D)</CardTitle>
          <ThumbsDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{negativeReviewsThisWeek}</div>
          <p className="text-xs text-muted-foreground">
            In the last 7 days
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSummaryCard;