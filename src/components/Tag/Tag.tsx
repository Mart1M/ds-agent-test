/**
 * Tag Component
 * Compact label for categories, filters, metadata, and selections
 */

import React from 'react';
import { TagProps } from './Tag.types';
import { StatusDot } from './icons/StatusDot';
import { TagCloseIcon } from './icons/TagCloseIcon';
import styles from './Tag.module.css';

const CLOSE_ICON_SIZE: Record<NonNullable<TagProps['size']>, number> = {
  sm: 10,
  md: 12,
  lg: 12,
};

export const Tag: React.FC<TagProps> = ({
  children,
  size = 'sm',
  leadingIcon,
  count,
  onClose,
  closeAriaLabel,
  withCheckbox = false,
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  id,
  'data-testid': dataTestId,
}) => {
  const hasTrailingAction = onClose != null || count != null;
  const hasLeadingSlot = leadingIcon != null && leadingIcon !== 'dot';
  const isInteractive = withCheckbox && onCheckedChange != null;
  const closeIconSize = CLOSE_ICON_SIZE[size];

  if (onClose && !closeAriaLabel) {
    console.warn('Tag: closeAriaLabel is required when onClose is provided.');
  }

  const tagClasses = [
    styles.tag,
    styles[size],
    withCheckbox ? styles.withCheckbox : null,
    leadingIcon === 'dot' ? styles.withLeadingIcon : null,
    hasLeadingSlot ? styles.withLeadingSlot : null,
    hasTrailingAction ? styles.withTrailingAction : null,
    onClose ? styles.withClose : null,
    isInteractive ? styles.interactive : null,
    disabled ? styles.disabled : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderLeadingIcon = () => {
    if (leadingIcon === 'dot') {
      return <StatusDot className={styles.dot} />;
    }

    if (hasLeadingSlot) {
      return <span className={styles.leadingSlot}>{leadingIcon}</span>;
    }

    return null;
  };

  const renderCheckbox = () => {
    if (!withCheckbox) {
      return null;
    }

    const checkboxVisual = (
      <span
        className={[styles.checkbox, checked ? styles.checkboxChecked : null]
          .filter(Boolean)
          .join(' ')}
        aria-hidden={isInteractive ? true : undefined}
      >
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 3L4.5 8.5L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );

    if (isInteractive) {
      return (
        <>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={checked}
            disabled={disabled}
            onChange={(event) => onCheckedChange?.(event.target.checked)}
            aria-label={typeof children === 'string' ? children : undefined}
          />
          {checkboxVisual}
        </>
      );
    }

    return checkboxVisual;
  };

  const content = (
    <>
      <span className={[styles.content, styles.contentGap].join(' ')}>
        {renderCheckbox()}
        {renderLeadingIcon()}
        <span className={styles.label}>{children}</span>
        {count != null ? <span className={styles.count}>{count}</span> : null}
      </span>
      {onClose ? (
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          disabled={disabled}
          aria-label={closeAriaLabel ?? 'Remove tag'}
          tabIndex={disabled ? -1 : 0}
        >
          <TagCloseIcon size={closeIconSize} />
        </button>
      ) : null}
    </>
  );

  if (isInteractive) {
    return (
      <label
        id={id}
        className={tagClasses}
        data-testid={dataTestId}
      >
        {content}
      </label>
    );
  }

  return (
    <span
      id={id}
      className={tagClasses}
      data-testid={dataTestId}
      aria-disabled={disabled || undefined}
    >
      {content}
    </span>
  );
};
