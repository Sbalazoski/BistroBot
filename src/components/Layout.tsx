import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { supabase } from "@/lib/supabase"; // Import supabase client
import { showSuccess, showError } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad"; // Import MadeWithDyad

const Layout = () => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null); // State to hold user email
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError("Failed to log out: " + error.message);
    } else {
      showSuccess("Logged out successfully!");
      navigate("/"); // Redirect to home or login page after logout
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 border-r bg-sidebar-background text-sidebar-foreground">
          <div className="flex flex-col items-center justify-center h-32 border-b py-4"> {/* Increased height for logo and info */}
            <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="h-16 w-16 mb-2" />
            <h1 className="text-xl font-bold text-sidebar-primary">BistroBot</h1>
            {userEmail && (
              <p className="text-sm text-muted-foreground mt-1">{userEmail}</p> {/* Info header */}
            )}
          </div>
          <Sidebar onLinkClick={handleLinkClick} />
        </aside>
      )}

      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-background shadow-sm">
          {isMobile && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col w-64 p-0">
                <div className="flex flex-col items-center justify-center h-32 border-b py-4"> {/* Increased height for logo and info */}
                  <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="h-16 w-16 mb-2" />
                  <h1 className="text-xl font-bold text-primary">BistroBot</h1>
                  {userEmail && (
                    <p className="text-sm text-muted-foreground mt-1">{userEmail}</p> {/* Info header */}
                  )}
                </div>
                <Sidebar onLinkClick={handleLinkClick} />
              </SheetContent>
            </Sheet>
          )}
          <div className="flex-grow flex justify-end items-center space-x-4">
            <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
          <MadeWithDyad />
        </main>
      </div>
    </div>
  );
};

export default Layout;