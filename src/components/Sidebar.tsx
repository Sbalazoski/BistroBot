import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, MessageSquareText, Settings } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start text-left px-4 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/90"
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
      asChild
    >
      <Link to={to} className="flex items-center space-x-3">
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    </Button>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4 flex flex-col">
      <div className="flex items-center justify-center mb-8">
        <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="h-10 w-10 mr-3" />
        <h2 className="text-2xl font-bold text-sidebar-primary">BistroBot</h2>
      </div>
      <nav className="space-y-2 flex-grow">
        <SidebarLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <SidebarLink to="/reviews" icon={MessageSquareText} label="Reviews" />
        <SidebarLink to="/settings" icon={Settings} label="Settings" />
      </nav>
    </aside>
  );
};

export default Sidebar;