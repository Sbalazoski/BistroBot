import React from 'react';

const Header = () => {
  return (
    <header className="bg-background border-b border-border p-4 flex items-center justify-center shadow-sm">
      <div className="flex items-center space-x-3">
        <img src="/bistrologobistrobot.png" alt="BistroBot Logo" className="h-10 w-10" />
        <h1 className="text-3xl font-bold text-primary">BistroBot</h1>
      </div>
    </header>
  );
};

export default Header;