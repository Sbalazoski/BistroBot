"use client";

import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, MessageSquareText, Settings, PlugZap } from "lucide-react"; // Import PlugZap icon
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void; // Callback for when a link is clicked (useful for closing mobile sidebar)
}

const Sidebar: React.FC<SidebarProps> = ({ className, onLinkClick }) => {
  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Reviews",
      href: "/dashboard/reviews",
      icon: MessageSquareText,
    },
    {
      name: "Integrations", // New navigation item
      href: "/dashboard/integrations",
      icon: PlugZap, // Using PlugZap icon for integrations
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <nav className={cn("flex flex-col space-y-1 p-4", className)}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          onClick={onLinkClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary hover:bg-sidebar-accent dark:hover:bg-sidebar-accent"
        >
          <item.icon className="h-5 w-5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;