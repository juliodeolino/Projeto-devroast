# UI Component Standards

This directory contains reusable UI components for the application. All components must adhere to the following standards.

## Folder Structure

- Location: `src/components/ui/`
- File Naming: `kebab-case.tsx` (e.g., `button.tsx`, `dialog.tsx`)
- Exports: **Named exports only**. DO NOT use default exports.

## Component Implementation

### 1. Styling with Tailwind Variants

- Use `tailwind-variants` (imported as `tv`) for defining component styles and variants.
- **Merge Pattern:** Pass the `className` prop directly to the variant function.
  - **Do NOT** use `cn()` or `twMerge()` externally. `tailwind-variants` handles merging when `className` is passed as a property.
  
  ```tsx
  // ✅ Correct
  className={buttonVariants({ variant, size, className })}
  
  // ❌ Incorrect
  className={cn(buttonVariants({ variant, size }), className)}
  ```

### 2. Polymorphism

- Use `@radix-ui/react-slot` to support the `asChild` prop, allowing components to delegate rendering to their children (common for buttons acting as links).

  ```tsx
  import { Slot } from "@radix-ui/react-slot"
  
  const Comp = asChild ? Slot : "button"
  ```

### 3. Types

- Extend standard HTML attributes (e.g., `React.ButtonHTMLAttributes<HTMLButtonElement>`).
- Use `VariantProps<typeof myVariants>` to infer props from the variant definition.

### 4. Refs

- Always wrap components in `React.forwardRef` to ensure refs are passed correctly.
- Set `Component.displayName` for debugging purposes.

## Example Template

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { tv, type VariantProps } from "tailwind-variants"

const myComponentVariants = tv({
  base: "base-styles-here",
  variants: {
    variant: {
      default: "...",
      secondary: "...",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  asChild?: boolean
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={myComponentVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants }
```
