/**
 * ButtonClose Component Types
 */

export interface ButtonCloseProps {
  /**
   * Size variant of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * Accessible label for screen readers (REQUIRED)
   */
  'aria-label': string;

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
