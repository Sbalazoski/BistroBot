import React from 'react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <p className="text-lg text-muted-foreground">
        Welcome to your BistroBot dashboard. Here you'll find an overview of your restaurant's review activity and reply status.
      </p>
      {/* Placeholder for dashboard widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <h3 className="text-xl font-semibold mb-2">Total Reviews</h3>
          <p className="text-3xl font-bold text-primary">1,234</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <h3 className="text-xl font-semibold mb-2">Pending Replies</h3>
          <p className="text-3xl font-bold text-destructive">42</p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
          <h3 className="text-xl font-semibold mb-2">Sentiment Trend</h3>
          <p className="text-3xl font-bold text-green-500">📈 Up</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;