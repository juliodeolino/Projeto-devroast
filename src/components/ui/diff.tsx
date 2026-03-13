import type * as React from "react";
import { tv } from "tailwind-variants";

const diffViewerVariants = tv({
  base: "w-full space-y-1 bg-background text-sm font-mono overflow-x-auto p-4 rounded-lg border border-border",
});

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

export function DiffViewer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={diffViewerVariants({ className })} {...props} />;
}

export function DiffLine({
  type,
  lineNumber,
  content,
  ...props
}: {
  type: "added" | "removed" | "context";
  lineNumber?: number;
  content: string;
}) {
  return (
    <div className={diffLineVariants({ type })} {...props}>
      {lineNumber && (
        <span className="w-8 select-none text-right text-xs opacity-50">
          {lineNumber}
        </span>
      )}
      <span className="flex-1 whitespace-pre-wrap">{content}</span>
    </div>
  );
}
