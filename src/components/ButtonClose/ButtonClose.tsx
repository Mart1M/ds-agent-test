/**
 * ButtonClose Component
 * A close button component with size variants, dark mode support, and full accessibility
 */

import React from 'react';
import { ButtonCloseProps } from './ButtonClose.types';
import { XCloseIcon } from './icons/XCloseIcon';
import styles from './ButtonClose.module.css';

export const ButtonClose: React.FC<ButtonCloseProps> = ({
  size = 'md',
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  className,
  id,
  'data-testid': dataTestId,
}) => {
  // Icon sizes based on button size
  const iconSize = size === 'lg' ? 24 : 20;

  // Combine class names
  const buttonClasses = [
    styles.button,
    styles[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      id={id}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      data-testid={dataTestId}
    >
      <XCloseIcon size={iconSize} />
    </button>
  );
};
