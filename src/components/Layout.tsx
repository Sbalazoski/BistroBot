"use client";

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const Layout = () => {
  const isMobile = useIsMobile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsSheetOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 border-r bg-sidebar-background text-sidebar-foreground">
          <div className="flex items-center justify-center h-16 border-b">
            <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="h-8 w-8 mr-2" />
            <h1 className="text-xl font-bold text-sidebar-primary">BistroBot</h1>
          </div>
          <Sidebar onLinkClick={handleLinkClick} />
        </aside>
      )}

      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-background shadow-sm lg:justify-end">
          {isMobile && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col w-64 p-0">
                <div className="flex items-center justify-center h-16 border-b">
                  <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="h-8 w-8 mr-2" />
                  <h1 className="text-xl font-bold text-primary">BistroBot</h1>
                </div>
                <Sidebar onLinkClick={handleLinkClick} />
              </SheetContent>
            </Sheet>
          )}
          {/* Placeholder for user menu/profile if needed */}
          <div className="flex items-center space-x-4">
            {/* Add user profile/settings here later */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;