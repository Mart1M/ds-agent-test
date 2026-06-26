/**
 * StatusDot — leading status indicator for Tag
 */

import React from 'react';

interface StatusDotProps {
  className?: string;
}

export const StatusDot: React.FC<StatusDotProps> = ({ className }) => (
  <span className={className} aria-hidden="true">
    <span />
  </span>
);
