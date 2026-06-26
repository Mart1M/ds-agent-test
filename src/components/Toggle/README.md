# Toggle

Binary switch control from the [Untitled UI Toggle](https://www.figma.com/design/FDNQQbOQmDlOk6UOBdH5K2) set. Use for settings that take effect immediately.

## Usage

```tsx
import { Toggle } from '@/components/Toggle';

<Toggle aria-label="Enable notifications" checked={on} onCheckedChange={setOn} />

<Toggle
  label="Remember me"
  description="Save my login details for next time."
  checked={remember}
  onCheckedChange={setRemember}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled state |
| `defaultChecked` | `boolean` | `false` | Initial uncontrolled state |
| `onCheckedChange` | `(checked: boolean) => void` | — | Change handler |
| `size` | `'sm' \| 'md'` | `'sm'` | Track size |
| `variant` | `'default' \| 'slim'` | `'default'` | Visual style |
| `label` | `ReactNode` | — | Field label |
| `description` | `ReactNode` | — | Supporting text |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | — | Required without `label` |

## Accessibility

- Uses `role="switch"` with `aria-checked`.
- Keyboard: Space toggles; focus ring matches DS pattern.
- `description` is linked via `aria-describedby`.
- Standalone toggles require `aria-label`.

## Figma

- File: [Untitled UI – PRO VARIABLES v8.0](https://www.figma.com/design/FDNQQbOQmDlOk6UOBdH5K2?node-id=1102-4208)
- Node: `1102:4208`
