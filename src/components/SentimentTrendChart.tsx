import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAnalytics } from "@/hooks/use-analytics"; // Import useAnalytics hook
import { Loader2 } from "lucide-react"; // Import Loader2 icon

const SentimentTrendChart = () => {
  const { data: analytics, isLoading, isError } = useAnalytics();

  if (isLoading) {
    return (
      <Card className="col-span-full flex items-center justify-center h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading sentiment trends...</p>
      </Card>
    );
  }

  if (isError || !analytics) {
    return (
      <Card className="col-span-full p-6 text-center text-destructive">
        Failed to load sentiment trends. Please ensure your backend is running and accessible.
      </Card>
    );
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Sentiment Trends</CardTitle>
        <CardDescription>
          Overview of review sentiment over the last 7 months.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={analytics.sentimentTrends}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="Positive"
                stroke="hsl(142.1 76.2% 36.3%)" // Green
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="Negative"
                stroke="hsl(0 84.2% 60.2%)" // Red
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="Neutral"
                stroke="hsl(215.4 16.3% 46.9%)" // Gray
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentTrendChart;