import { codeToHtml } from "shiki";
import { tv, type VariantProps } from "tailwind-variants";

const codeBlockVariants = tv({
  slots: {
    root: "relative overflow-hidden rounded-lg border bg-muted font-mono text-sm",
    header: "flex items-center gap-2 border-b bg-muted px-4 py-2.5",
    dot: "h-2.5 w-2.5 rounded-full",
    content: "relative flex overflow-x-auto",
    lineNumbers:
      "select-none border-r bg-muted px-3 py-3 text-right text-muted-foreground opacity-50",
    code: "flex-1 px-4 py-3",
  },
  variants: {
    variant: {
      default: {
        root: "bg-card border-border", // Vesper-like dark bg
        header: "bg-card border-border",
        lineNumbers: "bg-card border-border",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CodeBlockProps extends VariantProps<typeof codeBlockVariants> {
  code: string;
  lang?: string;
  fileName?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export async function CodeBlock({
  code,
  lang = "javascript",
  fileName,
  showLineNumbers = true,
  className,
  variant,
}: CodeBlockProps) {
  const {
    root,
    header,
    dot,
    content,
    lineNumbers,
    code: codeSlot,
  } = codeBlockVariants({ variant });

  const html = await codeToHtml(code, {
    lang,
    theme: "vesper",
  });

  // Basic line number generation
  const lines = code.trim().split("\n");
  const lineCount = lines.length;

  return (
    <div className={root({ className })}>
      <div className={header()}>
        <div className="flex items-center gap-1.5">
          <div className={dot({ className: "bg-accent-red" })} />
          <div className={dot({ className: "bg-accent-amber" })} />
          <div className={dot({ className: "bg-accent-green" })} />
        </div>
        {fileName && (
          <>
            <div className="mx-2 h-4 w-[1px] bg-border/50" />
            <span className="text-xs text-muted-foreground">{fileName}</span>
          </>
        )}
      </div>

      <div className={content()}>
        {showLineNumbers && (
          <div className={lineNumbers()} aria-hidden="true">
            {Array.from({ length: lineCount }).map((_, i) => (
              <div key={i + 1} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {/* Render Shiki HTML, stripping pre/code tags to handle layout manually if needed, 
            or just injecting it. Shiki returns <pre><code>...</code></pre>. 
            We might need to style the pre to remove defaults. */}
        <div
          className={codeSlot({
            className:
              "[&>pre]:bg-transparent [&>pre]:m-0 [&_code]:block [&_span]:leading-6",
          })}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
