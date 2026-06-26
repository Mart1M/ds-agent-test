/**
 * Toggle Storybook Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from '../Toggle';

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Switch control for binary on/off settings. Supports default and slim variants, optional label and description, and full keyboard accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      table: { defaultValue: { summary: 'sm' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'slim'],
      table: { defaultValue: { summary: 'default' } },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onCheckedChange: { action: 'checkedChange' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Toggle setting',
  },
};

export const Checked: Story = {
  args: {
    'aria-label': 'Toggle setting',
    checked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Remember me',
    description: 'Save my login details for next time.',
  },
};

export const WithLabelChecked: Story = {
  args: {
    label: 'Remember me',
    description: 'Save my login details for next time.',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Remember me',
    description: 'Save my login details for next time.',
    disabled: true,
  },
};

export const Slim: Story = {
  args: {
    variant: 'slim',
    'aria-label': 'Toggle setting',
  },
};

export const SlimWithLabel: Story = {
  args: {
    variant: 'slim',
    label: 'Remember me',
    description: 'Save my login details for next time.',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Toggle size="sm" aria-label="Small toggle" />
      <Toggle size="md" aria-label="Medium toggle" />
    </div>
  ),
};

export const VariantMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const rows = [
      { label: 'Default / off', props: { variant: 'default' as const, checked: false } },
      { label: 'Default / on', props: { variant: 'default' as const, checked: true } },
      { label: 'Slim / off', props: { variant: 'slim' as const, checked: false } },
      { label: 'Slim / on', props: { variant: 'slim' as const, checked: true } },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {rows.map((row) => (
          <div key={row.label}>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600 }}>{row.label}</p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Toggle size="sm" aria-label={`${row.label} small`} {...row.props} />
              <Toggle size="md" aria-label={`${row.label} medium`} {...row.props} />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const FullMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => {
    const configs = [
      { size: 'sm' as const, variant: 'default' as const },
      { size: 'md' as const, variant: 'default' as const },
      { size: 'sm' as const, variant: 'slim' as const },
      { size: 'md' as const, variant: 'slim' as const },
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {configs.map((config) => (
          <div key={`${config.variant}-${config.size}`} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: 600 }}>
              {config.variant} / {config.size}
            </p>
            <Toggle
              {...config}
              label="Remember me"
              description="Save my login details for next time."
              checked={false}
            />
            <Toggle
              {...config}
              label="Remember me"
              description="Save my login details for next time."
              checked
            />
            <Toggle {...config} aria-label="Standalone off" checked={false} />
            <Toggle {...config} aria-label="Standalone on" checked />
          </div>
        ))}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Toggle
        label="Remember me"
        description="Save my login details for next time."
        checked={checked}
        onCheckedChange={setChecked}
      />
    );
  },
};

export const DarkMode: Story = {
  args: {
    label: 'Remember me',
    description: 'Save my login details for next time.',
    checked: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
