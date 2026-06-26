/**
 * Tag Component Types
 */

import type React from 'react';

export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps {
  /**
   * Tag label content
   */
  children: React.ReactNode;

  /**
   * Size variant
   * @default 'sm'
   */
  size?: TagSize;

  /**
   * Leading icon — use `'dot'` for status dot or pass a custom node (flag, avatar, etc.)
   */
  leadingIcon?: 'dot' | React.ReactNode;

  /**
   * Optional count badge displayed after the label
   */
  count?: number;

  /**
   * Close handler — renders a dismiss button when provided
   */
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Accessible label for the close button (required when onClose is set)
   */
  closeAriaLabel?: string;

  /**
   * Show a leading checkbox indicator
   * @default false
   */
  withCheckbox?: boolean;

  /**
   * Checkbox checked state (controlled)
   */
  checked?: boolean;

  /**
   * Checkbox change handler — makes the tag interactive when provided with withCheckbox
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Element ID
   */
  id?: string;

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string;
}
