"use client";

import { Globe } from "lucide-react";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface CodeEditorContextValue {
  code: string;
  setCode: (code: string) => void;
  language: string;
  manualLanguage: string | null;
  setManualLanguage: (lang: string | null) => void;
  highlightedHtml: string;
  lineCount: number;
}

const CodeEditorContext = React.createContext<CodeEditorContextValue | null>(
  null,
);

function useCodeEditor() {
  const ctx = React.useContext(CodeEditorContext);
  if (!ctx) {
    throw new Error(
      "CodeEditor sub-components must be used within <CodeEditor>",
    );
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Shiki singleton (lazy-loaded)
// ---------------------------------------------------------------------------

type Highlighter = Awaited<
  ReturnType<typeof import("shiki/bundle/web").createHighlighter>
>;

let highlighterPromise: Promise<Highlighter> | null = null;
const loadedLangs = new Set<string>();

const PRELOADED_LANGS = [
  "javascript",
  "typescript",
  "python",
  "html",
  "css",
] as const;

async function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki/bundle/web").then((mod) =>
      mod.createHighlighter({
        themes: ["vesper"],
        langs: [...PRELOADED_LANGS],
      }),
    );
    const hl = await highlighterPromise;
    for (const lang of PRELOADED_LANGS) {
      loadedLangs.add(lang);
    }
    return hl;
  }
  return highlighterPromise;
}

async function ensureLanguageLoaded(lang: string): Promise<boolean> {
  if (loadedLangs.has(lang)) return true;
  try {
    const hl = await getHighlighter();
    await hl.loadLanguage(lang as Parameters<Highlighter["loadLanguage"]>[0]);
    loadedLangs.add(lang);
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Flourite language detection (lazy-loaded)
// ---------------------------------------------------------------------------

type FlouriteFn = (
  code: string,
  options?: { shiki?: boolean },
) => { language: string };
let flouriteFn: FlouriteFn | null = null;

async function detectLanguage(code: string): Promise<string> {
  if (!flouriteFn) {
    const mod = await import("flourite");
    flouriteFn = mod.default as unknown as FlouriteFn;
  }
  const result = flouriteFn(code, { shiki: true });
  return result.language;
}

// ---------------------------------------------------------------------------
// Supported languages for the dropdown
// ---------------------------------------------------------------------------

const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "graphql", label: "GraphQL" },
  { value: "xml", label: "XML" },
  { value: "scss", label: "SCSS" },
  { value: "less", label: "Less" },
] as const;

// ---------------------------------------------------------------------------
// CodeEditor (Root)
// ---------------------------------------------------------------------------

const codeEditorVariants = tv({
  base: "w-full rounded-none border border-border-primary bg-bg-input",
});

export interface CodeEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof codeEditorVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

const CodeEditor = React.forwardRef<HTMLDivElement, CodeEditorProps>(
  ({ className, value, onValueChange, defaultValue = "", ...props }, ref) => {
    const [internalCode, setInternalCode] = React.useState(defaultValue);
    const code = value ?? internalCode;
    const setCode = React.useCallback(
      (newCode: string) => {
        if (value === undefined) setInternalCode(newCode);
        onValueChange?.(newCode);
      },
      [value, onValueChange],
    );

    const [detectedLanguage, setDetectedLanguage] =
      React.useState("javascript");
    const [manualLanguage, setManualLanguage] = React.useState<string | null>(
      null,
    );
    const [highlightedHtml, setHighlightedHtml] = React.useState("");

    const language = manualLanguage ?? detectedLanguage;
    const lineCount = Math.max(code.split("\n").length, 1);

    // Detect language (debounced)
    React.useEffect(() => {
      if (manualLanguage) return;
      if (code.trim().length < 10) return;

      const timer = setTimeout(async () => {
        const detected = await detectLanguage(code);
        if (detected && detected !== "unknown") {
          setDetectedLanguage(detected);
        }
      }, 500);

      return () => clearTimeout(timer);
    }, [code, manualLanguage]);

    // Highlight code (debounced)
    React.useEffect(() => {
      if (!code.trim()) {
        setHighlightedHtml("");
        return;
      }

      const timer = setTimeout(async () => {
        const langAvailable = await ensureLanguageLoaded(language);
        const hl = await getHighlighter();
        const html = hl.codeToHtml(code, {
          lang: langAvailable ? language : "javascript",
          theme: "vesper",
        });
        setHighlightedHtml(html);
      }, 300);

      return () => clearTimeout(timer);
    }, [code, language]);

    const contextValue = React.useMemo<CodeEditorContextValue>(
      () => ({
        code,
        setCode,
        language,
        manualLanguage,
        setManualLanguage,
        highlightedHtml,
        lineCount,
      }),
      [code, setCode, language, manualLanguage, highlightedHtml, lineCount],
    );

    return (
      <CodeEditorContext.Provider value={contextValue}>
        <div
          className={codeEditorVariants({ className })}
          ref={ref}
          {...props}
        />
      </CodeEditorContext.Provider>
    );
  },
);
CodeEditor.displayName = "CodeEditor";

export { CodeEditor, codeEditorVariants };

// ---------------------------------------------------------------------------
// CodeEditorHeader
// ---------------------------------------------------------------------------

const codeEditorHeaderVariants = tv({
  base: "flex h-10 items-center justify-between border-b border-border-primary px-4",
});

export interface CodeEditorHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeEditorHeaderVariants> {}

const CodeEditorHeader = React.forwardRef<
  HTMLDivElement,
  CodeEditorHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={codeEditorHeaderVariants({ className })}
      ref={ref}
      {...props}
    />
  );
});
CodeEditorHeader.displayName = "CodeEditorHeader";

export { CodeEditorHeader, codeEditorHeaderVariants };

// ---------------------------------------------------------------------------
// CodeEditorDots
// ---------------------------------------------------------------------------

const codeEditorDotsVariants = tv({
  base: "flex items-center gap-2",
});

export interface CodeEditorDotsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeEditorDotsVariants> {}

const CodeEditorDots = React.forwardRef<HTMLDivElement, CodeEditorDotsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={codeEditorDotsVariants({ className })}
        ref={ref}
        {...props}
      >
        <div className="h-3 w-3 rounded-full bg-accent-red" />
        <div className="h-3 w-3 rounded-full bg-accent-amber" />
        <div className="h-3 w-3 rounded-full bg-accent-green" />
      </div>
    );
  },
);
CodeEditorDots.displayName = "CodeEditorDots";

export { CodeEditorDots, codeEditorDotsVariants };

// ---------------------------------------------------------------------------
// CodeEditorLangSelect
// ---------------------------------------------------------------------------

const codeEditorLangSelectVariants = tv({
  base: "inline-flex items-center",
});

export interface CodeEditorLangSelectProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeEditorLangSelectVariants> {}

const CodeEditorLangSelect = React.forwardRef<
  HTMLDivElement,
  CodeEditorLangSelectProps
>(({ className, ...props }, ref) => {
  const { language, manualLanguage, setManualLanguage } = useCodeEditor();

  return (
    <div
      ref={ref}
      className={codeEditorLangSelectVariants({ className })}
      {...props}
    >
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-text-secondary" />
        <select
          value={manualLanguage ?? ""}
          onChange={(e) =>
            setManualLanguage(e.target.value === "" ? null : e.target.value)
          }
          className="cursor-pointer appearance-none border-none bg-bg-surface font-mono text-xs text-text-primary outline-none hover:text-accent-red focus:ring-2 focus:ring-accent-red focus:ring-offset-2 [&>option]:bg-bg-surface [&>option]:text-text-primary [&>option:hover]:bg-accent-red/10 [&>option:hover]:text-accent-red [&>option:checked]:bg-accent-red/20 [&>option:checked]:text-accent-red"
        >
          <option value="">
            {language === "javascript" && !manualLanguage
              ? "auto-detect"
              : `auto-detect (${language})`}
          </option>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
});
CodeEditorLangSelect.displayName = "CodeEditorLangSelect";

export { CodeEditorLangSelect, codeEditorLangSelectVariants };

// ---------------------------------------------------------------------------
// CodeEditorContent
// ---------------------------------------------------------------------------

const codeEditorContentVariants = tv({
  base: "flex min-h-[360px]",
});

export interface CodeEditorContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeEditorContentVariants> {}

const CodeEditorContent = React.forwardRef<
  HTMLDivElement,
  CodeEditorContentProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={codeEditorContentVariants({ className })}
      ref={ref}
      {...props}
    />
  );
});
CodeEditorContent.displayName = "CodeEditorContent";

export { CodeEditorContent, codeEditorContentVariants };

// ---------------------------------------------------------------------------
// CodeEditorLineNumbers
// ---------------------------------------------------------------------------

const codeEditorLineNumbersVariants = tv({
  base: "flex flex-col gap-0 border-r border-border-primary bg-bg-surface px-3 py-4 select-none",
});

export interface CodeEditorLineNumbersProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeEditorLineNumbersVariants> {
  minLines?: number;
}

const CodeEditorLineNumbers = React.forwardRef<
  HTMLDivElement,
  CodeEditorLineNumbersProps
>(({ className, minLines = 16, ...props }, ref) => {
  const { lineCount } = useCodeEditor();
  const count = Math.max(lineCount, minLines);

  return (
    <div
      className={codeEditorLineNumbersVariants({ className })}
      ref={ref}
      aria-hidden="true"
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: line numbers are a static positional list
          key={i}
          className="text-right font-mono text-xs leading-[18px] text-text-tertiary"
          style={{ minWidth: "1.5rem" }}
        >
          {i + 1}
        </span>
      ))}
    </div>
  );
});
CodeEditorLineNumbers.displayName = "CodeEditorLineNumbers";

export { CodeEditorLineNumbers, codeEditorLineNumbersVariants };

// ---------------------------------------------------------------------------
// CodeEditorInput
// ---------------------------------------------------------------------------

const codeEditorInputVariants = tv({
  base: [
    "absolute inset-0 w-full h-full resize-none bg-transparent p-4",
    "font-mono text-xs leading-[18px] text-transparent caret-accent-red",
    "placeholder:text-text-tertiary focus:outline-none",
    "z-[2]",
    "::selection:bg-accent-red/20",
    "::selection:text-text-primary",
  ],
});

export interface CodeEditorInputProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      "value" | "onChange"
    >,
    VariantProps<typeof codeEditorInputVariants> {}

const CodeEditorInput = React.forwardRef<
  HTMLTextAreaElement,
  CodeEditorInputProps
>(({ className, onKeyDown, ...props }, ref) => {
  const { code, setCode } = useCodeEditor();

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        document.execCommand("insertText", false, "  ");
      }
      onKeyDown?.(e);
    },
    [onKeyDown],
  );

  return (
    <textarea
      ref={ref}
      value={code}
      placeholder="// past your code here ..."
      onChange={(e) => setCode(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      autoCapitalize="off"
      autoComplete="off"
      autoCorrect="off"
      data-gramm="false"
      className={codeEditorInputVariants({ className })}
      style={{ tabSize: 2 }}
      {...props}
    />
  );
});
CodeEditorInput.displayName = "CodeEditorInput";

export { CodeEditorInput, codeEditorInputVariants };

// ---------------------------------------------------------------------------
// CodeEditorHighlight
// ---------------------------------------------------------------------------

const codeEditorHighlightVariants = tv({
  base: [
    "pointer-events-none absolute inset-0 w-full h-full overflow-hidden p-4",
    "font-mono text-xs leading-[18px]",
    "z-[1]",
    // Reset Shiki-generated <pre> and <code> styles
    "[&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0",
    "[&_code]:block [&_code]:!bg-transparent",
    "[&_.line]:leading-[18px]",
  ],
});

export interface CodeEditorHighlightProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeEditorHighlightVariants> {}

const CodeEditorHighlight = React.forwardRef<
  HTMLDivElement,
  CodeEditorHighlightProps
>(({ className, ...props }, ref) => {
  const { code, highlightedHtml } = useCodeEditor();

  return (
    <div
      ref={ref}
      className={codeEditorHighlightVariants({ className })}
      {...(highlightedHtml
        ? { dangerouslySetInnerHTML: { __html: highlightedHtml } }
        : {})}
      {...props}
    >
      {!highlightedHtml && code ? (
        <pre className="!m-0 !bg-transparent !p-0">
          <code className="block !bg-transparent text-text-secondary">
            {code}
          </code>
        </pre>
      ) : null}
    </div>
  );
});
CodeEditorHighlight.displayName = "CodeEditorHighlight";

export { CodeEditorHighlight, codeEditorHighlightVariants };

// ---------------------------------------------------------------------------
// CodeEditorOverlay — container for Input + Highlight (CSS Grid stacking)
// ---------------------------------------------------------------------------

const codeEditorOverlayVariants = tv({
  base: "relative flex-1",
});

export interface CodeEditorOverlayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeEditorOverlayVariants> {}

const CodeEditorOverlay = React.forwardRef<
  HTMLDivElement,
  CodeEditorOverlayProps
>(({ className, ...props }, ref) => {
  return (
    <div
      className={codeEditorOverlayVariants({ className })}
      ref={ref}
      {...props}
    />
  );
});
CodeEditorOverlay.displayName = "CodeEditorOverlay";

export { CodeEditorOverlay, codeEditorOverlayVariants };
