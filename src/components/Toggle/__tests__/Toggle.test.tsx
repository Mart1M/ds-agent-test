/**
 * Toggle Component Tests
 */

import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toggle } from '../Toggle';

describe('Toggle', () => {
  describe('Rendering', () => {
    it('renders with role switch', () => {
      render(<Toggle aria-label="Enable notifications" />);
      expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeInTheDocument();
    });

    it('renders unchecked by default', () => {
      render(<Toggle aria-label="Toggle" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('renders checked when checked prop is true', () => {
      render(<Toggle aria-label="Toggle" checked />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('renders label and description', () => {
      render(
        <Toggle
          label="Remember me"
          description="Save my login details for next time."
        />,
      );
      expect(screen.getByText('Remember me')).toBeInTheDocument();
      expect(screen.getByText('Save my login details for next time.')).toBeInTheDocument();
    });

    it('applies size class on track', () => {
      render(<Toggle aria-label="Toggle" size="md" data-testid="toggle" />);
      const toggle = screen.getByTestId('toggle');
      expect(toggle.className).toMatch(/md/);
    });
  });

  describe('Interactions', () => {
    it('calls onCheckedChange when clicked', () => {
      const handleChange = jest.fn();
      render(<Toggle aria-label="Toggle" onCheckedChange={handleChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles controlled state via handler without changing aria-checked alone', () => {
      const Controlled = () => {
        const [checked, setChecked] = useState(false);
        return <Toggle aria-label="Toggle" checked={checked} onCheckedChange={setChecked} />;
      };

      render(<Controlled />);
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');
      fireEvent.click(toggle);
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    it('does not call onCheckedChange when disabled', () => {
      const handleChange = jest.fn();
      render(<Toggle aria-label="Toggle" disabled onCheckedChange={handleChange} />);
      fireEvent.click(screen.getByRole('switch'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('toggles with Space key', () => {
      const handleChange = jest.fn();
      render(<Toggle aria-label="Toggle" onCheckedChange={handleChange} />);
      const toggle = screen.getByRole('switch');
      toggle.focus();
      fireEvent.keyDown(toggle, { key: ' ', code: 'Space' });
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Variants', () => {
    it.each(['default', 'slim'] as const)('renders %s variant', (variant) => {
      render(<Toggle aria-label="Toggle" variant={variant} data-testid="toggle" />);
      expect(screen.getByTestId('toggle').className).toMatch(new RegExp(variant));
    });
  });

  describe('Accessibility', () => {
    it('links description via aria-describedby', () => {
      render(
        <Toggle
          label="Remember me"
          description="Save my login details for next time."
        />,
      );
      const toggle = screen.getByRole('switch');
      const descriptionId = toggle.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
      expect(document.getElementById(descriptionId!)).toHaveTextContent(
        'Save my login details for next time.',
      );
    });

    it('marks disabled state on the switch', () => {
      render(<Toggle aria-label="Toggle" disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });
  });
});
