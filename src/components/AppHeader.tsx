import React from 'react';

const AppHeader = () => {
  return (
    <header className="bg-background border-b border-border p-4 flex items-center justify-end shadow-sm">
      {/* This header can be used for user profile, notifications, etc. */}
      <span className="text-muted-foreground">Welcome, User!</span>
    </header>
  );
};

export default AppHeader;