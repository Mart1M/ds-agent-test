/**
 * Tag Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tag } from '../Tag';

describe('Tag', () => {
  describe('Rendering', () => {
    it('renders label text', () => {
      render(<Tag>Design system</Tag>);
      expect(screen.getByText('Design system')).toBeInTheDocument();
    });

    it('renders default small size class', () => {
      render(<Tag data-testid="tag">Label</Tag>);
      expect(screen.getByTestId('tag')).toHaveClass('sm');
    });

    it('renders count badge when count is provided', () => {
      render(<Tag count={5}>Label</Tag>);
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders close button when onClose is provided', () => {
      render(
        <Tag closeAriaLabel="Remove tag" onClose={jest.fn()}>
          Label
        </Tag>,
      );
      expect(screen.getByRole('button', { name: 'Remove tag' })).toBeInTheDocument();
    });

    it('renders status dot when leadingIcon is dot', () => {
      const { container } = render(<Tag leadingIcon="dot">Label</Tag>);
      expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    });

    it('renders custom leading icon slot', () => {
      render(
        <Tag leadingIcon={<span data-testid="custom-icon">icon</span>}>Label</Tag>,
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Checkbox', () => {
    it('renders checkbox input when interactive', () => {
      render(
        <Tag withCheckbox checked={false} onCheckedChange={jest.fn()}>
          Label
        </Tag>,
      );
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('calls onCheckedChange when toggled', () => {
      const handleChange = jest.fn();
      render(
        <Tag withCheckbox checked={false} onCheckedChange={handleChange}>
          Label
        </Tag>,
      );
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Close action', () => {
    it('calls onClose when close button is clicked', () => {
      const handleClose = jest.fn();
      render(
        <Tag closeAriaLabel="Remove tag" onClose={handleClose}>
          Label
        </Tag>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Remove tag' }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when disabled', () => {
      const handleClose = jest.fn();
      render(
        <Tag closeAriaLabel="Remove tag" onClose={handleClose} disabled>
          Label
        </Tag>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Remove tag' }));
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Sizes', () => {
    it.each(['sm', 'md', 'lg'] as const)('applies %s size class', (size) => {
      render(
        <Tag size={size} data-testid="tag">
          Label
        </Tag>,
      );
      expect(screen.getByTestId('tag')).toHaveClass(size);
    });
  });
});
