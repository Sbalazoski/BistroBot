import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MessageSquareText, TrendingUp, Clock, ThumbsDown } from "lucide-react";
import { useAnalytics } from "@/hooks/use-analytics"; // Import useAnalytics hook
import { Loader2 } from "lucide-react"; // Import Loader2 icon

const ReviewSummaryCard = () => {
  const { data: analytics, isLoading, isError } = useAnalytics();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="flex items-center justify-center h-[120px]">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4 text-center text-destructive">
            Failed to load data.
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <MessageSquareText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.totalReviews}</div>
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
          <div className="text-2xl font-bold">{analytics.averageRating.toFixed(1)} / 5</div>
          <p className="text-xs text-muted-foreground">
            Based on {analytics.totalReviews} reviews
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Reviews Today</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{analytics.newReviewsToday}</div>
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
          <div className="text-2xl font-bold">{analytics.pendingReplies}</div>
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
          <div className="text-2xl font-bold">{analytics.negativeReviewsThisWeek}</div>
          <p className="text-xs text-muted-foreground">
            In the last 7 days
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSummaryCard;