"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Reusing mock data from ReviewsPage for consistency
const mockReviews = [
  {
    id: "1",
    platform: "Google",
    customer: "Alice Wonderland",
    rating: 5,
    comment: "Amazing food and excellent service! Highly recommend the pasta.",
    sentiment: "Positive",
    status: "Replied",
    date: "2023-10-26",
  },
  {
    id: "2",
    platform: "Yelp",
    customer: "Bob Thebuilder",
    rating: 2,
    comment: "The wait was too long and the coffee was cold.",
    sentiment: "Negative",
    status: "Pending Reply",
    date: "2023-10-25",
  },
  {
    id: "3",
    platform: "TripAdvisor",
    customer: "Charlie Chaplin",
    rating: 4,
    comment: "Good atmosphere, decent food. Nothing spectacular but solid.",
    sentiment: "Neutral",
    status: "Drafted",
    date: "2023-10-24",
  },
  {
    id: "4",
    platform: "Google",
    customer: "Diana Prince",
    rating: 5,
    comment: "Best burger in town! Will definitely be back soon.",
    sentiment: "Positive",
    status: "Pending Reply",
    date: "2023-10-23",
  },
  {
    id: "5",
    platform: "Yelp",
    customer: "Eve Harrington",
    rating: 1,
    comment: "Terrible experience. Food was undercooked and staff was rude.",
    sentiment: "Negative",
    status: "Pending Reply",
    date: "2023-10-22",
  },
];

const RecentReviewsList = () => {
  // Displaying only the top 5 most recent reviews for the dashboard
  const recentReviews = mockReviews.slice(0, 5);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
        <CardDescription>
          Latest customer feedback across all platforms.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <TableRow key={review.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link to={`/dashboard/reviews/${review.id}`} className="block w-full h-full py-2">
                      {review.platform}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/reviews/${review.id}`} className="block w-full h-full py-2">
                      {review.customer}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/reviews/${review.id}`} className="block w-full h-full py-2">
                      {review.rating} ⭐
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/reviews/${review.id}`} className="block w-full h-full py-2">
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
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/dashboard/reviews/${review.id}`} className="block w-full h-full py-2">
                      {review.status}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  No recent reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentReviewsList;