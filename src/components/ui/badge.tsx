import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
  base: "inline-flex items-center gap-2 rounded-full font-mono text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default: "text-primary hover:text-primary/80",
      secondary: "text-muted-foreground hover:text-muted-foreground/80",
      destructive: "text-destructive hover:text-destructive/80",
      outline: "text-foreground",
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-accent-green",
      neutral: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={badgeVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

// --- BadgeDot ---

const badgeDotVariants = tv({
  base: "h-2 w-2 rounded-full",
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-muted-foreground",
      destructive: "bg-destructive",
      outline: "bg-foreground",
      critical: "bg-accent-red",
      warning: "bg-accent-amber",
      good: "bg-accent-green",
      neutral: "bg-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeDotVariants> {}

const BadgeDot = React.forwardRef<HTMLSpanElement, BadgeDotProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        className={badgeDotVariants({ variant, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
BadgeDot.displayName = "BadgeDot";

export { BadgeDot, badgeDotVariants };
