"use client";

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

const data = [
  { name: "Jan", Positive: 4000, Negative: 2400, Neutral: 1000 },
  { name: "Feb", Positive: 3000, Negative: 1398, Neutral: 2210 },
  { name: "Mar", Positive: 2000, Negative: 9800, Neutral: 2290 },
  { name: "Apr", Positive: 2780, Negative: 3908, Neutral: 2000 },
  { name: "May", Positive: 1890, Negative: 4800, Neutral: 2181 },
  { name: "Jun", Positive: 2390, Negative: 3800, Neutral: 2500 },
  { name: "Jul", Positive: 3490, Negative: 4300, Neutral: 2100 },
];

const SentimentTrendChart = () => {
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
              data={data}
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