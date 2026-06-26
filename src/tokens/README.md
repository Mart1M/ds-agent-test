# Design Tokens - DTCG Integration

This directory contains the Design Token Community Group (DTCG) specification-compliant token system.

## Directory Structure

```
src/tokens/
├── source/                      # Source DTCG token files (edit these)
│   ├── primitives.tokens.json   # Tailwind v3 color primitives
│   ├── colors.tokens.json       # Semantic color tokens with light/dark modes
│   └── spacing-radius.tokens.json # Spacing and border radius
├── generated/                  # Generated CSS output (DO NOT EDIT)
│   ├── tokens.css              # CSS custom properties
│   └── tokens.d.ts             # TypeScript definitions
├── build-config/               # Style Dictionary configuration
│   └── style-dictionary.config.js
└── design-tokens.css          # DEPRECATED - Legacy file
```

## Token Structure

### Primitives

Raw color values from Tailwind v3 color scales. These are referenced by semantic tokens.

**Examples:**
- `primitives.neutral.500` → `#737373`
- `primitives.purple.600` → `#9333ea`
- `primitives.white` → `#ffffff`

### Semantic Tokens

Context-specific tokens that reference primitives. These adapt automatically to light/dark modes.

**Examples:**
- `color.fg.quaternary` → `neutral.500` (light) / `neutral.100` (dark)
- `color.bg.primary` → `white` (light) / `neutral.900` (dark)
- `color.focus-ring` → `purple.600` (light) / `purple.400` (dark)

## Theme Support

Tokens support three theme modes with proper priority:

### 1. System Preference (Default)
```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-fg-quaternary: var(--primitives-neutral-100);
  }
}
```

### 2. Explicit Dark Mode (Highest Priority)
```html
<html data-theme="dark">
  <!-- Forces dark mode regardless of system preference -->
</html>
```

### 3. Explicit Light Mode
```html
<html data-theme="light">
  <!-- Forces light mode even if system prefers dark -->
</html>
```

## Usage in Components

### Import
```css
@import '../../tokens/generated/tokens.css';
```

### Use Tokens
```css
.button {
  color: var(--color-fg-quaternary);
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
}

.button:hover {
  color: var(--color-fg-quaternary-hover);
  background: var(--color-bg-primary-hover);
}

.button:disabled {
  opacity: var(--opacity-disabled); /* 0.4 light, 0.3 dark */
}
```

## Build Commands

```bash
# Validate token schema
npm run tokens:validate

# Build tokens to CSS
npm run tokens:build

# Watch mode for development
npm run tokens:watch
```

## Adding New Tokens

### 1. Add to Source Files

Edit `src/tokens/source/*.tokens.json`:

```json
{
  "color": {
    "bg": {
      "secondary": {
        "$type": "color",
        "$value": "{primitives.neutral.50}",
        "$description": "Secondary background",
        "$extensions": {
          "mode": {
            "light": "{primitives.neutral.50}",
            "dark": "{primitives.neutral.800}"
          }
        }
      }
    }
  }
}
```

### 2. Validate
```bash
npm run tokens:validate
```

### 3. Build
```bash
npm run tokens:build
```

### 4. Use in Components
```css
.element {
  background: var(--color-bg-secondary);
}
```

## Key Changes from Legacy Tokens

### Accessibility Fix
❌ **Before:** `--color-fg-quaternary: #a3a3a3` (2.8:1 contrast)  
✅ **After:** `--color-fg-quaternary: #737373` (4.6:1 contrast)

This change ensures WCAG AA compliance for normal text on white backgrounds.

### Dark Mode
❌ **Before:** Manual `@media (prefers-color-scheme: dark)` in every component  
✅ **After:** Automatic theme switching via tokens

### Disabled State
❌ **Before:** Hardcoded `opacity: 0.4`  
✅ **After:** Token-based `opacity: var(--opacity-disabled)` (0.4 light, 0.3 dark)

## CI/CD

The `.github/workflows/tokens-build.yml` workflow:
1. Validates token schema on every push
2. Builds tokens to verify no errors
3. Checks that generated files are committed

## Token Migration Status

- ✅ 273 DTCG color tokens from Figma "1. color modes" collection
- ✅ Tailwind v3 primitives from "_Primitives" collection
- ✅ Light/Dark mode support with `[data-theme]` override
- ✅ WCAG AA compliance (fg-quaternary fix)
- ✅ Backward-compatible token names
- ✅ Style Dictionary v4 build pipeline
- ✅ CI validation workflow
- ✅ ButtonClose component migrated

## Resources

- [DTCG Specification](https://design-tokens.github.io/community-group/format/)
- [Style Dictionary v4 Docs](https://styledictionary.com/)
- [Figma Variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
