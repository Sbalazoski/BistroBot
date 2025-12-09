"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { showError } from "@/utils/toast";

// Define a type for the review history entry
interface ReviewHistoryEntry {
  timestamp: string;
  action: string;
}

// Define the structure of a review as expected from the backend
export interface Review {
  id: string;
  platform: string;
  customer: string;
  rating: number;
  comment: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  status: "Pending Reply" | "Drafted" | "Replied";
  date: string; // Assuming date is a string like "YYYY-MM-DD"
  reply: string | null;
  history: ReviewHistoryEntry[];
}

export const useReviews = () => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews"],
    queryFn: async () => {
      try {
        const reviews = await apiRequest<Review[]>("/reviews/fetch", "GET");
        return reviews;
      } catch (error) {
        showError("Failed to fetch reviews.");
        throw error;
      }
    },
  });
};