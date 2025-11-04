import React from 'react';
import AppHeader from '@/components/AppHeader';
import Sidebar from '@/components/Sidebar';
import { MadeWithDyad } from '@/components/made-with-dyad';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-6 overflow-auto">
          <Outlet /> {/* This is where nested routes will render */}
        </main>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default AppLayout;