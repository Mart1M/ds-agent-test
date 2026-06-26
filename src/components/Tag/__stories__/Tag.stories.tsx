/**
 * Tag Storybook Stories
 * Full Figma variant matrix: sizes, icons, actions, checkbox
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../Tag';

const SAMPLE_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" rx="8" fill="#D6BBFB"/><text x="8" y="11" text-anchor="middle" font-size="7" fill="#53389E" font-family="sans-serif">OR</text></svg>`,
  );

const SAMPLE_FLAG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="7" fill="#00008B"/><circle cx="7" cy="7" r="5" fill="#fff" opacity="0.15"/></svg>`,
  );

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Compact label for categories, filters, metadata, and selections. Supports size variants, leading icons, count badges, dismiss actions, and checkbox selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: 'sm' } },
    },
    withCheckbox: {
      control: 'boolean',
      table: { defaultValue: { summary: false } },
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    count: { control: 'number' },
    onClose: { action: 'close' },
    onCheckedChange: { action: 'checkedChange' },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {
  args: {
    children: 'Label',
  },
};

export const WithCount: Story = {
  args: {
    children: 'Label',
    count: 5,
  },
};

export const Dismissible: Story = {
  args: {
    children: 'Label',
    closeAriaLabel: 'Remove Label tag',
    onClose: () => undefined,
  },
};

export const WithStatusDot: Story = {
  args: {
    children: 'Label',
    leadingIcon: 'dot',
  },
};

export const WithAvatar: Story = {
  args: {
    children: 'Label',
    leadingIcon: (
      <img
        src={SAMPLE_AVATAR}
        alt=""
        width={16}
        height={16}
        style={{ borderRadius: '50%', display: 'block' }}
      />
    ),
  },
};

export const WithCountryFlag: Story = {
  args: {
    children: 'Label',
    leadingIcon: (
      <img
        src={SAMPLE_FLAG}
        alt=""
        width={14}
        height={14}
        style={{ borderRadius: '50%', display: 'block' }}
      />
    ),
  },
};

export const WithCheckbox: Story = {
  args: {
    children: 'Label',
    withCheckbox: true,
    checked: false,
    onCheckedChange: () => undefined,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Tag size="sm">Label</Tag>
      <Tag size="md">Label</Tag>
      <Tag size="lg">Label</Tag>
    </div>
  ),
};

export const ActionVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Tag>Label</Tag>
      <Tag count={5}>Label</Tag>
      <Tag closeAriaLabel="Remove Label tag" onClose={() => undefined}>
        Label
      </Tag>
    </div>
  ),
};

export const IconVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Tag leadingIcon="dot">Label</Tag>
      <Tag
        leadingIcon={
          <img
            src={SAMPLE_FLAG}
            alt=""
            width={14}
            height={14}
            style={{ borderRadius: '50%', display: 'block' }}
          />
        }
      >
        Label
      </Tag>
      <Tag
        leadingIcon={
          <img
            src={SAMPLE_AVATAR}
            alt=""
            width={16}
            height={16}
            style={{ borderRadius: '50%', display: 'block' }}
          />
        }
      >
        Label
      </Tag>
    </div>
  ),
};

export const FullMatrix: Story = {
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Representative subset of the Figma Tag component set across sizes and actions.',
      },
    },
  },
  render: () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    const rows = [
      { label: 'Text only', props: {} },
      { label: 'X close', props: { closeAriaLabel: 'Remove tag', onClose: () => undefined } },
      { label: 'Count', props: { count: 5 } },
      { label: 'Dot', props: { leadingIcon: 'dot' as const } },
      {
        label: 'Checkbox',
        props: { withCheckbox: true, checked: false, onCheckedChange: () => undefined },
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {rows.map((row) => (
          <div key={row.label}>
            <p style={{ margin: '0 0 8px', fontSize: '12px', fontWeight: 600 }}>{row.label}</p>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <Tag key={size} size={size} {...row.props}>
                  Label
                </Tag>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const DarkMode: Story = {
  args: {
    children: 'Label',
    count: 5,
    leadingIcon: 'dot',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
