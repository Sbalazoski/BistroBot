"use client";

import React from 'react';

// SVG content for the repeating pattern
// Using 'Comic Sans MS' as a fun font, with a fallback to cursive and sans-serif.
// The text is dark blue (#1e3a8a) and slightly rotated.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
  <text x="10" y="70" font-family="'Comic Sans MS', cursive, sans-serif" font-size="30" fill="#1e3a8a" transform="rotate(-15 10 70)">BistroBot</text>
</svg>`;

// Encode the SVG content for use in a data URI
const encodedSvg = encodeURIComponent(svgContent)
  .replace(/'/g, '%27') // Replace single quotes
  .replace(/"/g, '%22'); // Replace double quotes

// Construct the data URI
const dataUri = `url("data:image/svg+xml;charset=utf-8,${encodedSvg}")`;

const BistroBotPatternOverlay = () => {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none opacity-5 dark:opacity-10" // Subtle opacity, slightly more visible in dark mode
      style={{
        backgroundImage: dataUri,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px', // Matches SVG dimensions for repeating
      }}
    />
  );
};

export default BistroBotPatternOverlay;