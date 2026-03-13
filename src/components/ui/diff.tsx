import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

// --- DiffViewer (Root) ---

const diffViewerVariants = tv({
  base: "w-full space-y-1 bg-background text-sm font-mono overflow-x-auto p-4 rounded-lg border border-border",
});

export interface DiffViewerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffViewerVariants> {
  asChild?: boolean;
}

const DiffViewer = React.forwardRef<HTMLDivElement, DiffViewerProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={diffViewerVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
DiffViewer.displayName = "DiffViewer";

export { DiffViewer, diffViewerVariants };

// --- DiffLine ---

const diffLineVariants = tv({
  base: "flex items-start gap-4 px-2 py-1 transition-colors hover:bg-muted/50",
  variants: {
    type: {
      added: "bg-accent-green/10 border-l-2 border-accent-green",
      removed: "bg-accent-red/10 border-l-2 border-accent-red opacity-70",
      context: "text-muted-foreground",
    },
  },
  defaultVariants: {
    type: "context",
  },
});

export interface DiffLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffLineVariants> {
  asChild?: boolean;
}

const DiffLine = React.forwardRef<HTMLDivElement, DiffLineProps>(
  ({ className, type, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={diffLineVariants({ type, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
DiffLine.displayName = "DiffLine";

export { DiffLine, diffLineVariants };

// --- DiffLineNumber ---

const diffLineNumberVariants = tv({
  base: "w-8 select-none text-right text-xs opacity-50",
});

export interface DiffLineNumberProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof diffLineNumberVariants> {
  asChild?: boolean;
}

const DiffLineNumber = React.forwardRef<HTMLSpanElement, DiffLineNumberProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={diffLineNumberVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
DiffLineNumber.displayName = "DiffLineNumber";

export { DiffLineNumber, diffLineNumberVariants };

// --- DiffLineContent ---

const diffLineContentVariants = tv({
  base: "flex-1 whitespace-pre-wrap",
});

export interface DiffLineContentProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof diffLineContentVariants> {
  asChild?: boolean;
}

const DiffLineContent = React.forwardRef<HTMLSpanElement, DiffLineContentProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={diffLineContentVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
DiffLineContent.displayName = "DiffLineContent";

export { DiffLineContent, diffLineContentVariants };
