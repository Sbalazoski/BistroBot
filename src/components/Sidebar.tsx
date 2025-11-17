"use client";

import React from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, MessageSquareText, Settings, PlugZap, FileText, CreditCard } from "lucide-react"; // Import CreditCard icon
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
      name: "Reply Templates",
      href: "/dashboard/templates",
      icon: FileText,
    },
    {
      name: "Integrations",
      href: "/dashboard/integrations",
      icon: PlugZap,
    },
    {
      name: "Billing", // New navigation item
      href: "/dashboard/billing",
      icon: CreditCard, // Using CreditCard icon for billing
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