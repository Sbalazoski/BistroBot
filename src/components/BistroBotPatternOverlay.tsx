"use client";

import React from 'react';

// SVG content for the repeating pattern
// Using a modern sans-serif font stack, larger text, and adjusted rotation/position for a tighter pattern.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="90">
  <text x="5" y="65" font-family="Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;" font-size="45" fill="currentColor" transform="rotate(-10 5 65)">BistroBot</text>
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
      className="absolute inset-0 z-10 pointer-events-none opacity-10 dark:opacity-15 text-primary dark:text-primary-foreground" // Increased opacity, using primary colors for better visibility
      style={{
        backgroundImage: dataUri,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px 75px', // Smaller background size to make text overlap and appear almost touching
      }}
    />
  );
};

export default BistroBotPatternOverlay;