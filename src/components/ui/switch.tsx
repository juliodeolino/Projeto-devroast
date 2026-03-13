"use client";

import { Switch as BaseSwitch } from "@base-ui-components/react/switch";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const switchVariants = tv({
  slots: {
    root: "group relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[checked]:bg-accent-green data-[unchecked]:bg-[#1F1F1F]",
    thumb:
      "pointer-events-none block rounded-full shadow-lg ring-0 transition-all duration-200 data-[checked]:bg-black data-[unchecked]:bg-zinc-500",
  },
  variants: {
    size: {
      default: {
        root: "h-[22px] w-[40px] p-[3px] border-2 border-transparent",
        thumb:
          "h-4 w-4 data-[checked]:translate-x-[14px] data-[unchecked]:translate-x-0",
      },
      sm: {
        root: "h-4 w-7 p-0.5 border-transparent",
        thumb:
          "h-3 w-3 data-[checked]:translate-x-3 data-[unchecked]:translate-x-0",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof BaseSwitch.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size, ...props }, ref) => {
    const { root, thumb } = switchVariants({ size });

    return (
      <BaseSwitch.Root
        className={root({
          className: className as string | undefined,
        })}
        {...props}
        ref={ref}
      >
        <BaseSwitch.Thumb className={thumb()} />
      </BaseSwitch.Root>
    );
  },
);
Switch.displayName = "Switch";

export { Switch, switchVariants };
