"use client";

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

// --- Context ---

interface ScoreRingContextValue {
  score: number;
  total: number;
  size: number;
  strokeWidth: number;
  radius: number;
  circumference: number;
  offset: number;
  percentage: number;
}

const ScoreRingContext = React.createContext<ScoreRingContextValue | null>(
  null,
);

function useScoreRing() {
  const context = React.useContext(ScoreRingContext);
  if (!context) {
    throw new Error(
      "ScoreRing compound components must be used within <ScoreRing>",
    );
  }
  return context;
}

// --- ScoreRing (Root) ---

const scoreRingVariants = tv({
  base: "relative flex items-center justify-center",
});

export interface ScoreRingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scoreRingVariants> {
  score: number;
  total?: number;
  size?: number;
  strokeWidth?: number;
}

const ScoreRing = React.forwardRef<HTMLDivElement, ScoreRingProps>(
  (
    {
      score,
      total = 100,
      size = 180,
      strokeWidth = 4,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = (score / total) * 100;
    const offset = circumference - (percentage / 100) * circumference;

    const contextValue = React.useMemo(
      () => ({
        score,
        total,
        size,
        strokeWidth,
        radius,
        circumference,
        offset,
        percentage,
      }),
      [
        score,
        total,
        size,
        strokeWidth,
        radius,
        circumference,
        offset,
        percentage,
      ],
    );

    return (
      <ScoreRingContext.Provider value={contextValue}>
        <div
          className={scoreRingVariants({ className })}
          style={{ width: size, height: size }}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      </ScoreRingContext.Provider>
    );
  },
);
ScoreRing.displayName = "ScoreRing";

export { ScoreRing, scoreRingVariants };

// --- ScoreRingSvg ---

export interface ScoreRingSvgProps extends React.SVGAttributes<SVGSVGElement> {}

const ScoreRingSvg = React.forwardRef<SVGSVGElement, ScoreRingSvgProps>(
  ({ className, children, ...props }, ref) => {
    const { size } = useScoreRing();
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className ?? "rotate-[-90deg]"}
        ref={ref}
        {...props}
      >
        {children}
      </svg>
    );
  },
);
ScoreRingSvg.displayName = "ScoreRingSvg";

export { ScoreRingSvg };

// --- ScoreRingTrack ---

export interface ScoreRingTrackProps
  extends React.SVGAttributes<SVGCircleElement> {}

const ScoreRingTrack = React.forwardRef<SVGCircleElement, ScoreRingTrackProps>(
  (props, ref) => {
    const { size, radius, strokeWidth } = useScoreRing();
    return (
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={strokeWidth}
        ref={ref}
        {...props}
      />
    );
  },
);
ScoreRingTrack.displayName = "ScoreRingTrack";

export { ScoreRingTrack };

// --- ScoreRingIndicator ---

export interface ScoreRingIndicatorProps
  extends React.SVGAttributes<SVGCircleElement> {
  gradientId?: string;
}

const ScoreRingIndicator = React.forwardRef<
  SVGCircleElement,
  ScoreRingIndicatorProps
>(({ gradientId = "score-gradient", className, ...props }, ref) => {
  const { size, radius, strokeWidth, circumference, offset } = useScoreRing();
  return (
    <>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-accent-green)" />
          <stop offset="100%" stopColor="var(--color-accent-amber)" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className={className ?? "transition-all duration-1000 ease-out"}
        ref={ref}
        {...props}
      />
    </>
  );
});
ScoreRingIndicator.displayName = "ScoreRingIndicator";

export { ScoreRingIndicator };

// --- ScoreRingLabel ---

const scoreRingLabelVariants = tv({
  base: "absolute inset-0 flex flex-col items-center justify-center",
});

export interface ScoreRingLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scoreRingLabelVariants> {}

const ScoreRingLabel = React.forwardRef<HTMLDivElement, ScoreRingLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={scoreRingLabelVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
ScoreRingLabel.displayName = "ScoreRingLabel";

export { ScoreRingLabel, scoreRingLabelVariants };
