import type * as React from "react";
import { tv } from "tailwind-variants";

const scoreRingVariants = tv({
  base: "relative flex items-center justify-center",
});

interface ScoreRingProps extends React.HTMLAttributes<HTMLDivElement> {
  score: number;
  total?: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreRing({
  score,
  total = 100,
  size = 180,
  strokeWidth = 4,
  className,
  children,
  ...props
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (score / total) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={scoreRingVariants({ className })}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle with Gradient */}
        <defs>
          <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-green)" />
            <stop offset="100%" stopColor="var(--color-accent-amber)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#score-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          <span className="text-4xl font-bold font-mono">{score}</span>
        )}
      </div>
    </div>
  );
}
