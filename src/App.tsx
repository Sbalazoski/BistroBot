import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ReviewsPage from "./pages/ReviewsPage";
import SettingsPage from "./pages/SettingsPage";
import ReviewDetailsPage from "./pages/ReviewDetailsPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import ReplyTemplatesPage from "./pages/ReplyTemplatesPage";
import BenchmarkingPage from "./pages/BenchmarkingPage"; // Import BenchmarkingPage
import { supabase } from "@/lib/supabase";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

// PrivateRoute component to protect routes
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Or a spinner
  }

  return session ? children : <Navigate to="/" />; // Redirect to the root path (Index page with Auth)
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" attribute="class">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Protected routes using the Layout component */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="reviews/:reviewId" element={<ReviewDetailsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="integrations" element={<IntegrationsPage />} />
              <Route path="templates" element={<ReplyTemplatesPage />} />
              <Route path="benchmarking" element={<BenchmarkingPage />} /> {/* New Benchmarking Route */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;