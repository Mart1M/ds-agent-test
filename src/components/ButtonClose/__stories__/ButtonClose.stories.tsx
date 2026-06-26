/**
 * ButtonClose Storybook Stories
 * Showcases all variants, states, and dark mode support
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ButtonClose } from '../ButtonClose';

const meta = {
  title: 'Components/ButtonClose',
  component: ButtonClose,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A close button component with size variants, dark mode support, and full accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
      table: {
        defaultValue: { summary: false },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers (REQUIRED)',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
} satisfies Meta<typeof ButtonClose>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default medium-sized close button
 */
export const Default: Story = {
  args: {
    'aria-label': 'Close',
  },
};

/**
 * Small size variant (36×36px)
 */
export const Small: Story = {
  args: {
    size: 'sm',
    'aria-label': 'Close',
  },
};

/**
 * Medium size variant (40×40px)
 */
export const Medium: Story = {
  args: {
    size: 'md',
    'aria-label': 'Close',
  },
};

/**
 * Large size variant (44×44px)
 */
export const Large: Story = {
  args: {
    size: 'lg',
    'aria-label': 'Close',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    'aria-label': 'Close',
    disabled: true,
  },
};

/**
 * All size variants displayed together
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <ButtonClose size="sm" aria-label="Close small" />
      <ButtonClose size="md" aria-label="Close medium" />
      <ButtonClose size="lg" aria-label="Close large" />
    </div>
  ),
};

/**
 * All states displayed together
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Default</p>
        <ButtonClose aria-label="Close" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Hover (hover over button)</p>
        <ButtonClose aria-label="Close" />
      </div>
      <div>
        <p style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Disabled</p>
        <ButtonClose aria-label="Close" disabled />
      </div>
    </div>
  ),
};

/**
 * Interactive example with click handler
 */
export const Interactive: Story = {
  args: {
    'aria-label': 'Close dialog',
  },
  render: (args) => {
    const handleClick = () => {
      alert('Close button clicked!');
    };

    return <ButtonClose {...args} onClick={handleClick} />;
  },
};

/**
 * Dark mode example
 * Toggle Storybook's dark mode to see the difference
 */
export const DarkMode: Story = {
  args: {
    'aria-label': 'Close',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Toggle Storybook\'s dark mode toolbar to see dark mode styles.',
      },
    },
  },
};

/**
 * In a modal context
 */
export const InModal: Story = {
  render: () => (
    <div
      style={{
        position: 'relative',
        width: '400px',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
        <ButtonClose aria-label="Close modal" />
      </div>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600 }}>
        Modal Title
      </h2>
      <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
        This is an example of the close button in a modal context.
      </p>
    </div>
  ),
};

/**
 * Touch target visualization for sm and md sizes
 */
export const TouchTargets: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
      <div style={{ position: 'relative' }}>
        <ButtonClose size="sm" aria-label="Close small" />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px',
            height: '44px',
            border: '2px dashed #9e77ed',
            borderRadius: '8px',
            pointerEvents: 'none',
            opacity: 0.5,
          }}
        />
        <p style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center' }}>
          Small (36×36)<br />Touch: 44×44
        </p>
      </div>
      <div style={{ position: 'relative' }}>
        <ButtonClose size="md" aria-label="Close medium" />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '44px',
            height: '44px',
            border: '2px dashed #9e77ed',
            borderRadius: '8px',
            pointerEvents: 'none',
            opacity: 0.5,
          }}
        />
        <p style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center' }}>
          Medium (40×40)<br />Touch: 44×44
        </p>
      </div>
      <div style={{ position: 'relative' }}>
        <ButtonClose size="lg" aria-label="Close large" />
        <p style={{ marginTop: '8px', fontSize: '12px', textAlign: 'center' }}>
          Large (44×44)<br />No expansion
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashed borders show the expanded touch target area (44×44px minimum) for small and medium sizes.',
      },
    },
  },
};
