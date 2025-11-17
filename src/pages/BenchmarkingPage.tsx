"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { Gauge, TrendingUp, CheckCircle2 } from "lucide-react"; // Removed Speedometer, kept Gauge

const mockBenchmarkingData = [
  { name: "Jan", "Reply Speed (s)": 5, "Accuracy (%)": 85 },
  { name: "Feb", "Reply Speed (s)": 4, "Accuracy (%)": 88 },
  { name: "Mar", "Reply Speed (s)": 3, "Accuracy (%)": 90 },
  { name: "Apr", "Reply Speed (s)": 3, "Accuracy (%)": 92 },
  { name: "May", "Reply Speed (s)": 2, "Accuracy (%)": 95 },
  { name: "Jun", "Reply Speed (s)": 2, "Accuracy (%)": 96 },
];

const BenchmarkingPage = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Benchmarking & Performance</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Compare BistroBot's performance against industry benchmarks and track key metrics.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Reply Speed</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" /> {/* Changed to Gauge */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5s</div>
            <p className="text-xs text-muted-foreground">
              vs. 5s industry average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Accuracy</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              +2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              Replies drafted by AI
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">
              FTC §465 guidelines
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Monthly Performance Trends</CardTitle>
          <CardDescription>
            Tracking key performance indicators over time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockBenchmarkingData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent-foreground))" />
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
                <Bar yAxisId="left" dataKey="Reply Speed (s)" fill="hsl(var(--primary))" />
                <Bar yAxisId="right" dataKey="Accuracy (%)" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BenchmarkingPage;