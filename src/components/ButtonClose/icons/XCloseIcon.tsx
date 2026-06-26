/**
 * XCloseIcon Component
 * Inline SVG icon for the close button
 */

import React from 'react';

interface XCloseIconProps {
  size?: number;
  className?: string;
}

export const XCloseIcon: React.FC<XCloseIconProps> = ({ 
  size = 20,
  className 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
