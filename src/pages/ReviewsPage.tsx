"use client";

import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Mock data for reviews
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

const ReviewsPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Review Management</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.platform}</TableCell>
                <TableCell>{review.customer}</TableCell>
                <TableCell>{review.rating} ⭐</TableCell>
                <TableCell className="max-w-[200px] truncate">{review.comment}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>{review.status}</TableCell>
                <TableCell>{review.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default ReviewsPage;