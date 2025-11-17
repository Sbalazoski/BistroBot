"use client";

import React, { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Import Button
import { XCircle } from "lucide-react"; // Import XCircle icon
import { mockReviews } from "@/data/mockReviews";

const ReviewsPage = () => {
  const [sentimentFilter, setSentimentFilter] = useState<string>("All");
  const [platformFilter, setPlatformFilter] = useState<string>("All");
  const [sortOrder, setSortOrder] = useState<string>("Newest");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredAndSortedReviews = useMemo(() => {
    let reviews = [...mockReviews];

    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      reviews = reviews.filter(
        (review) =>
          review.customer.toLowerCase().includes(lowerCaseQuery) ||
          review.comment.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Filter by sentiment
    if (sentimentFilter !== "All") {
      reviews = reviews.filter((review) => review.sentiment === sentimentFilter);
    }

    // Filter by platform
    if (platformFilter !== "All") {
      reviews = reviews.filter((review) => review.platform === platformFilter);
    }

    // Sort by date
    reviews.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    return reviews;
  }, [sentimentFilter, platformFilter, sortOrder, searchQuery]);

  // Get unique platforms from mock reviews for the filter dropdown
  const uniquePlatforms = useMemo(() => {
    const platforms = new Set<string>();
    mockReviews.forEach(review => platforms.add(review.platform));
    return Array.from(platforms);
  }, []);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSentimentFilter("All");
    setPlatformFilter("All");
    setSortOrder("Newest");
  };

  const isFilterActive = searchQuery !== "" || sentimentFilter !== "All" || platformFilter !== "All" || sortOrder !== "Newest";

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Review Management</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center flex-wrap">
        <Input
          placeholder="Search by customer or comment..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-[300px]"
        />

        <div className="flex items-center gap-2">
          <label htmlFor="platform-filter" className="text-sm font-medium whitespace-nowrap">Filter by Platform:</label>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger id="platform-filter" className="w-[180px]">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Platforms</SelectItem>
              {uniquePlatforms.map(platform => (
                <SelectItem key={platform} value={platform}>{platform}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sentiment-filter" className="text-sm font-medium whitespace-nowrap">Filter by Sentiment:</label>
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
          <label htmlFor="sort-order" className="text-sm font-medium whitespace-nowrap">Sort by Date:</label>
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

        {isFilterActive && (
          <Button variant="outline" onClick={handleClearFilters} className="flex items-center gap-2">
            <XCircle className="h-4 w-4" /> Clear Filters
          </Button>
        )}
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
    </div>
  );
};

export default ReviewsPage;