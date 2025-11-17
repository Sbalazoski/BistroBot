"use client";

import React from 'react';

const ZigZagBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        {/* Layer 1: Larger zig-zag */}
        <path
          d="M0 200 L250 0 L500 200 L750 0 L1000 200 V1000 H0 Z"
          fill="hsl(var(--primary))"
          className="opacity-10 dark:opacity-20"
        />
        {/* Layer 2: Medium zig-zag, offset */}
        <path
          d="M0 350 L150 250 L300 350 L450 250 L600 350 L750 250 L900 350 L1000 300 V1000 H0 Z"
          fill="hsl(var(--secondary))"
          className="opacity-15 dark:opacity-25"
        />
        {/* Layer 3: Smaller zig-zag, further offset */}
        <path
          d="M0 500 L100 450 L200 500 L300 450 L400 500 L500 450 L600 500 L700 450 L800 500 L900 450 L1000 500 V1000 H0 Z"
          fill="hsl(var(--accent))"
          className="opacity-10 dark:opacity-20"
        />
      </svg>
    </div>
  );
};

export default ZigZagBackground;