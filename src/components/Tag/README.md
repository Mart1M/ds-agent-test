# Tag

Compact label for categories, filters, metadata, and selections. Mirrors the [Untitled UI Tag](https://www.figma.com/design/FDNQQbOQmDlOk6UOBdH5K2) component set.

## Usage

```tsx
import { Tag } from '@/components/Tag';

<Tag>Label</Tag>
<Tag count={5}>Label</Tag>
<Tag closeAriaLabel="Remove tag" onClose={() => {}}>Label</Tag>
<Tag leadingIcon="dot">Active</Tag>
<Tag withCheckbox checked={selected} onCheckedChange={setSelected}>Filter</Tag>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Tag label |
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Size variant |
| `leadingIcon` | `'dot' \| ReactNode` | — | Status dot or custom slot (flag, avatar) |
| `count` | `number` | — | Trailing count badge |
| `onClose` | `function` | — | Renders dismiss button |
| `closeAriaLabel` | `string` | — | Required when `onClose` is set |
| `withCheckbox` | `boolean` | `false` | Leading checkbox indicator |
| `checked` | `boolean` | `false` | Checkbox state |
| `onCheckedChange` | `function` | — | Makes tag selectable |
| `disabled` | `boolean` | `false` | Disabled state |

## Accessibility

- Dismiss button requires `closeAriaLabel`.
- Interactive checkbox tags use a native `<input type="checkbox">` with a visual indicator.
- Close button supports keyboard focus with visible focus ring.
- Status dot is `aria-hidden`.

## Figma

- File: [Untitled UI – PRO VARIABLES v8.0](https://www.figma.com/design/FDNQQbOQmDlOk6UOBdH5K2?node-id=3307-417515)
- Node: `3307:417515`
