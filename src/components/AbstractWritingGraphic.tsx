"use client";

import React from 'react';

interface AbstractWritingGraphicProps {
  className?: string;
}

const AbstractWritingGraphic: React.FC<AbstractWritingGraphicProps> = ({ className }) => {
  return (
    <div className={className}>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Main flowing line (suggests hand movement or creative stroke) */}
        <path
          d="M20 100 C50 50, 150 50, 180 100 C150 150, 50 150, 20 100 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dashed lines (suggests text or thought process) */}
        <path
          d="M40 80 L60 80 M70 80 L90 80 M100 80 L120 80"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <path
          d="M50 120 L70 120 M80 120 L100 120 M110 120 L130 120"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        {/* Small sharp shape (suggests a pen tip or a point of focus) */}
        <path
          d="M130 60 L140 70 L130 80 L120 70 L130 60 Z"
          fill="currentColor"
          fillOpacity="0.2"
        />
      </svg>
    </div>
  );
};

export default AbstractWritingGraphic;