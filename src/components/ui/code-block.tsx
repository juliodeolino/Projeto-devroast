import * as React from "react";
import { codeToHtml } from "shiki";
import { tv, type VariantProps } from "tailwind-variants";

// --- CodeBlock (Root) ---

const codeBlockVariants = tv({
  base: "relative overflow-hidden rounded-lg border bg-card border-border font-mono text-sm",
});

export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {}

const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={codeBlockVariants({ className })} ref={ref} {...props} />
    );
  },
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock, codeBlockVariants };

// --- CodeBlockHeader ---

const codeBlockHeaderVariants = tv({
  base: "flex items-center gap-2 border-b bg-card border-border px-4 py-2.5",
});

export interface CodeBlockHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockHeaderVariants> {}

const CodeBlockHeader = React.forwardRef<HTMLDivElement, CodeBlockHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={codeBlockHeaderVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
CodeBlockHeader.displayName = "CodeBlockHeader";

export { CodeBlockHeader, codeBlockHeaderVariants };

// --- CodeBlockDots ---

const codeBlockDotsVariants = tv({
  base: "flex items-center gap-1.5",
});

export interface CodeBlockDotsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockDotsVariants> {}

const CodeBlockDots = React.forwardRef<HTMLDivElement, CodeBlockDotsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={codeBlockDotsVariants({ className })}
        ref={ref}
        {...props}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-accent-red" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
        <div className="h-2.5 w-2.5 rounded-full bg-accent-green" />
      </div>
    );
  },
);
CodeBlockDots.displayName = "CodeBlockDots";

export { CodeBlockDots, codeBlockDotsVariants };

// --- CodeBlockFileName ---

const codeBlockFileNameVariants = tv({
  base: "text-xs text-muted-foreground",
});

export interface CodeBlockFileNameProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof codeBlockFileNameVariants> {}

const CodeBlockFileName = React.forwardRef<
  HTMLSpanElement,
  CodeBlockFileNameProps
>(({ className, ...props }, ref) => {
  return (
    <>
      <div className="mx-2 h-4 w-[1px] bg-border/50" />
      <span
        className={codeBlockFileNameVariants({ className })}
        ref={ref}
        {...props}
      />
    </>
  );
});
CodeBlockFileName.displayName = "CodeBlockFileName";

export { CodeBlockFileName, codeBlockFileNameVariants };

// --- CodeBlockContent ---

const codeBlockContentVariants = tv({
  base: "relative flex overflow-x-auto",
});

export interface CodeBlockContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockContentVariants> {}

const CodeBlockContent = React.forwardRef<
  HTMLDivElement,
  CodeBlockContentProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={codeBlockContentVariants({ className })}
      ref={ref}
      {...props}
    />
  );
});
CodeBlockContent.displayName = "CodeBlockContent";

export { CodeBlockContent, codeBlockContentVariants };

// --- CodeBlockLineNumbers ---

const codeBlockLineNumbersVariants = tv({
  base: "select-none border-r bg-card border-border px-3 py-3 text-right text-muted-foreground opacity-50",
});

export interface CodeBlockLineNumbersProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockLineNumbersVariants> {
  count: number;
}

const CodeBlockLineNumbers = React.forwardRef<
  HTMLDivElement,
  CodeBlockLineNumbersProps
>(({ count, className, ...props }, ref) => {
  return (
    <div
      className={codeBlockLineNumbersVariants({ className })}
      ref={ref}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i + 1} className="leading-6">
          {i + 1}
        </div>
      ))}
    </div>
  );
});
CodeBlockLineNumbers.displayName = "CodeBlockLineNumbers";

export { CodeBlockLineNumbers, codeBlockLineNumbersVariants };

// --- CodeBlockCode (Shiki-highlighted, Server Component) ---

const codeBlockCodeVariants = tv({
  base: "flex-1 px-4 py-3 [&>pre]:bg-transparent [&>pre]:m-0 [&_code]:block [&_span]:leading-6",
});

export interface CodeBlockCodeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockCodeVariants> {
  code: string;
  lang?: string;
}

async function CodeBlockCode({
  code,
  lang = "javascript",
  className,
  ...props
}: CodeBlockCodeProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  return (
    <div
      className={codeBlockCodeVariants({ className })}
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
}

export { CodeBlockCode, codeBlockCodeVariants };
