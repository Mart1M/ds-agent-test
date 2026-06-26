/**
 * Toggle Component Types
 */

import type React from 'react';

export type ToggleSize = 'sm' | 'md';
export type ToggleVariant = 'default' | 'slim';

export interface ToggleProps {
  /**
   * Controlled checked state
   */
  checked?: boolean;

  /**
   * Uncontrolled initial checked state
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Change handler
   */
  onCheckedChange?: (checked: boolean) => void;

  /**
   * Size variant
   * @default 'sm'
   */
  size?: ToggleSize;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: ToggleVariant;

  /**
   * Label text — renders a field layout when provided
   */
  label?: React.ReactNode;

  /**
   * Supporting description below the label
   */
  description?: React.ReactNode;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Form field name
   */
  name?: string;

  /**
   * Element ID (also used to wire label htmlFor)
   */
  id?: string;

  /**
   * Accessible label — required when `label` is not provided
   */
  'aria-label'?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Test ID for testing purposes
   */
  'data-testid'?: string;
}
