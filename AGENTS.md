# devroast - Project Standards

## Overview

Code review tool with a "roast" twist. Users paste code, receive brutally honest feedback with scores.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 (`@theme` directive) + `tailwind-variants`
- **Linting/Formatting:** Biome
- **Package Manager:** pnpm

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout (fonts + shared Navbar)
│   ├── page.tsx          # Homepage (code input + leaderboard preview)
│   ├── globals.css       # Tailwind v4 theme (all design tokens)
│   └── design-system/    # Component showcase page
├── components/ui/        # Reusable UI components
│   └── AGENTS.md         # Component-specific standards
└── lib/utils.ts          # cn() utility (clsx + twMerge)
```

## Key Patterns

### Styling

- All colors defined in `globals.css` `@theme` — no hardcoded hex in components.
- Use `tailwind-variants` (`tv`) for component styles. Pass `className` directly to the variant function.
- Use `cn()` only for dynamically combining unrelated class strings (e.g., conditional classes on non-variant elements).
- Hover effects on interactive elements must use `enabled:hover:` to prevent hover styles when `disabled`.

### Components (`src/components/ui/`)

- See `src/components/ui/AGENTS.md` for detailed component standards.
- **Named exports only**, no default exports.
- **Composition pattern** for multi-part components (e.g., `Card` + `CardHeader` + `CardTitle`).
- `@radix-ui/react-slot` for `asChild` polymorphism.
- `@base-ui-components/react` for interactive primitives (Switch uses `data-[checked]`/`data-[unchecked]`, NOT `data-[state=...]`).
- `shiki` with `vesper` theme for syntax highlighting (Server Component).

### Fonts

- `JetBrains Mono` — primary monospace (`font-mono`)
- `IBM Plex Mono` — secondary font (`font-secondary`)

### Pages

- Navbar lives in `layout.tsx` (shared across all pages).
- Page content uses `max-w-[780px]` / `max-w-[960px]` centered containers.
- All data is static for now (no API connections).

### Commits

- Use **Conventional Commits** (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
