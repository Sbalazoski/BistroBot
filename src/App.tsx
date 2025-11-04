import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./layouts/AppLayout"; // Import AppLayout

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Use AppLayout for authenticated routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Placeholder for other routes like /reviews, /settings */}
            <Route path="/reviews" element={
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Reviews</h1>
                <p className="text-lg text-muted-foreground">Manage your restaurant reviews here.</p>
              </div>
            } />
            <Route path="/settings" element={
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-lg text-muted-foreground">Configure your BistroBot settings.</p>
              </div>
            } />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;