import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const badgeVariants = tv({
  base: "inline-flex items-center gap-2 rounded-full font-mono text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variants: {
    variant: {
      default: "text-primary hover:text-primary/80",
      secondary: "text-muted-foreground hover:text-muted-foreground/80",
      destructive: "text-destructive hover:text-destructive/80",
      outline: "text-foreground",
      // Custom variants from design
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
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  (
    { className, variant, asChild = false, dot = true, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    // Dot mapping based on variant color
    const dotColorMap: Record<string, string> = {
      critical: "bg-accent-red",
      warning: "bg-accent-amber",
      good: "bg-accent-green",
      neutral: "bg-muted-foreground",
      default: "bg-primary",
      secondary: "bg-muted-foreground",
      destructive: "bg-destructive",
      outline: "bg-foreground",
    };

    // Fallback if variant is undefined or not in map
    const dotClass = dotColorMap[variant || "default"] || "bg-current";

    return (
      <Comp
        className={badgeVariants({ variant, className })}
        ref={ref}
        {...props}
      >
        {dot && <span className={cn("h-2 w-2 rounded-full", dotClass)} />}
        {children}
      </Comp>
    );
  },
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
