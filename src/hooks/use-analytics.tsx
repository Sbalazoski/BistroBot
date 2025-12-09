"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import { showError } from "@/utils/toast";

export interface AnalyticsSummary {
  totalReviews: number;
  averageRating: number;
  newReviewsToday: number;
  pendingReplies: number;
  negativeReviewsThisWeek: number;
  sentimentTrends: { name: string; Positive: number; Negative: number; Neutral: number }[];
}

export const useAnalytics = () => {
  return useQuery<AnalyticsSummary, Error>({
    queryKey: ["analyticsSummary"],
    queryFn: async () => {
      try {
        const data = await apiRequest<AnalyticsSummary>("/analytics/summary", "GET");
        return data;
      } catch (error) {
        showError("Failed to fetch analytics summary.");
        throw error;
      }
    },
  });
};