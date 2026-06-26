/**
 * Toggle Component
 * Switch control for binary on/off settings with optional label and description
 */

import React, { useId, useState } from 'react';
import { ToggleProps } from './Toggle.types';
import styles from './Toggle.module.css';

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = 'sm',
  variant = 'default',
  label,
  description,
  disabled = false,
  name,
  id,
  'aria-label': ariaLabel,
  className,
  'data-testid': dataTestId,
}) => {
  const generatedId = useId();
  const toggleId = id ?? generatedId;
  const isControlled = checked !== undefined;
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked : uncontrolledChecked;
  const hasField = label != null;

  if (!hasField && !ariaLabel) {
    console.warn('Toggle: aria-label is required when label is not provided.');
  }

  const handleToggle = () => {
    if (disabled) {
      return;
    }

    const nextChecked = !isChecked;

    if (!isControlled) {
      setUncontrolledChecked(nextChecked);
    }

    onCheckedChange?.(nextChecked);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };

  const trackClasses = [
    styles.track,
    styles[variant],
    styles[size],
    isChecked ? styles.checked : null,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapClasses = [
    styles.toggleWrap,
    variant === 'slim' ? (size === 'md' ? styles.slimWrapMd : styles.slimWrapSm) : null,
  ]
    .filter(Boolean)
    .join(' ');

  const descriptionId = description ? `${toggleId}-description` : undefined;

  const switchControl = (
    <div className={wrapClasses}>
      <button
        type="button"
        role="switch"
        id={toggleId}
        name={name}
        className={trackClasses}
        aria-checked={isChecked}
        aria-label={hasField ? undefined : ariaLabel}
        aria-describedby={descriptionId}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        data-testid={dataTestId}
      >
        {variant === 'slim' ? <span className={styles.slimBorder} aria-hidden="true" /> : null}
        <span className={styles.thumb} aria-hidden="true" />
      </button>
    </div>
  );

  if (!hasField) {
    return (
      <div className={className}>
        {switchControl}
      </div>
    );
  }

  const fieldClasses = [
    styles.field,
    size === 'md' ? styles.fieldMd : null,
    styles[size],
    disabled ? styles.fieldDisabled : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={fieldClasses}>
      {switchControl}
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        {description ? (
          <span id={descriptionId} className={styles.description}>
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
};
