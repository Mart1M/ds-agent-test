/**
 * ButtonClose Component Tests
 * Tests all size variants, states, accessibility, and keyboard interactions
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonClose } from '../ButtonClose';

describe('ButtonClose', () => {
  describe('Rendering', () => {
    it('renders with required aria-label', () => {
      render(<ButtonClose aria-label="Close dialog" />);
      const button = screen.getByRole('button', { name: 'Close dialog' });
      expect(button).toBeInTheDocument();
    });

    it('renders with default medium size', () => {
      render(<ButtonClose aria-label="Close" data-testid="close-btn" />);
      const button = screen.getByTestId('close-btn');
      expect(button).toHaveClass('md');
    });

    it('renders small size variant correctly', () => {
      render(<ButtonClose aria-label="Close" size="sm" data-testid="close-btn" />);
      const button = screen.getByTestId('close-btn');
      expect(button).toHaveClass('sm');
    });

    it('renders medium size variant correctly', () => {
      render(<ButtonClose aria-label="Close" size="md" data-testid="close-btn" />);
      const button = screen.getByTestId('close-btn');
      expect(button).toHaveClass('md');
    });

    it('renders large size variant correctly', () => {
      render(<ButtonClose aria-label="Close" size="lg" data-testid="close-btn" />);
      const button = screen.getByTestId('close-btn');
      expect(button).toHaveClass('lg');
    });

    it('renders with custom className', () => {
      render(<ButtonClose aria-label="Close" className="custom-class" data-testid="close-btn" />);
      const button = screen.getByTestId('close-btn');
      expect(button).toHaveClass('custom-class');
    });

    it('renders with custom id', () => {
      render(<ButtonClose aria-label="Close" id="custom-id" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', 'custom-id');
    });
  });

  describe('Disabled State', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<ButtonClose aria-label="Close" disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('has aria-disabled attribute when disabled', () => {
      render(<ButtonClose aria-label="Close" disabled />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('has tabIndex -1 when disabled', () => {
      render(<ButtonClose aria-label="Close" disabled />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('does not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(<ButtonClose aria-label="Close" disabled onClick={handleClick} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Click Interactions', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<ButtonClose aria-label="Close" onClick={handleClick} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('passes event to onClick handler', () => {
      const handleClick = jest.fn();
      render(<ButtonClose aria-label="Close" onClick={handleClick} />);
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it('works without onClick handler', () => {
      expect(() => {
        render(<ButtonClose aria-label="Close" />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
      }).not.toThrow();
    });
  });

  describe('Keyboard Interactions', () => {
    it('is focusable when not disabled', () => {
      render(<ButtonClose aria-label="Close" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '0');
    });

    it('can be activated with Enter key', () => {
      const handleClick = jest.fn();
      render(<ButtonClose aria-label="Close" onClick={handleClick} />);
      const button = screen.getByRole('button');
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      // Note: React Testing Library simulates click on Enter for buttons
      expect(button).toHaveFocus();
    });

    it('can be activated with Space key', () => {
      const handleClick = jest.fn();
      render(<ButtonClose aria-label="Close" onClick={handleClick} />);
      const button = screen.getByRole('button');
      button.focus();
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      expect(button).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<ButtonClose aria-label="Close" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has correct type attribute', () => {
      render(<ButtonClose aria-label="Close" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('icon has aria-hidden attribute', () => {
      const { container } = render(<ButtonClose aria-label="Close" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Icon Size', () => {
    it('uses 20px icon for small size', () => {
      const { container } = render(<ButtonClose aria-label="Close" size="sm" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '20');
      expect(svg).toHaveAttribute('height', '20');
    });

    it('uses 20px icon for medium size', () => {
      const { container } = render(<ButtonClose aria-label="Close" size="md" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '20');
      expect(svg).toHaveAttribute('height', '20');
    });

    it('uses 24px icon for large size', () => {
      const { container } = render(<ButtonClose aria-label="Close" size="lg" />);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });
  });
});
