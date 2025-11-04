"use client";

import React, { useState, useMemo } from "react";
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
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  {
    id: "6",
    platform: "Google",
    customer: "Frank Green",
    rating: 3,
    comment: "It was okay, nothing special. Service was a bit slow.",
    sentiment: "Neutral",
    status: "Pending Reply",
    date: "2023-10-21",
  },
  {
    id: "7",
    platform: "TripAdvisor",
    customer: "Grace Hopper",
    rating: 5,
    comment: "Fantastic experience from start to finish!",
    sentiment: "Positive",
    status: "Replied",
    date: "2023-10-20",
  },
];

const ReviewsPage = () => {
  const [sentimentFilter, setSentimentFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("Newest"); // 'Newest' or 'Oldest'

  const filteredAndSortedReviews = useMemo(() => {
    let reviews = [...mockReviews];

    // Filter by sentiment
    if (sentimentFilter !== "All") {
      reviews = reviews.filter((review) => review.sentiment === sentimentFilter);
    }

    // Sort by date
    reviews.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    return reviews;
  }, [sentimentFilter, sortOrder]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Review Management</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sentiment-filter" className="text-sm font-medium">Filter by Sentiment:</label>
          <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
            <SelectTrigger id="sentiment-filter" className="w-[180px]">
              <SelectValue placeholder="Select sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Sentiments</SelectItem>
              <SelectItem value="Positive">Positive</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
              <SelectItem value="Negative">Negative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-order" className="text-sm font-medium">Sort by Date:</label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger id="sort-order" className="w-[180px]">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Newest">Newest First</SelectItem>
              <SelectItem value="Oldest">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

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
            {filteredAndSortedReviews.length > 0 ? (
              filteredAndSortedReviews.map((review) => (
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
                  <TableCell className="max-w-[200px] truncate">
                    <Link to={`/dashboard/reviews/${review.id}`} className="block w-full h-full py-2">
                      {review.comment}
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
                  <TableCell>
                    <Link to={`/dashboard/reviews/${review.id}`} className="block w-full h-full py-2">
                      {review.date}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No reviews found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default ReviewsPage;