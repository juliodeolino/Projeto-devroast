import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const cardVariants = tv({
  base: "rounded-lg border bg-card text-card-foreground shadow-sm",
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp className={cardVariants({ className })} ref={ref} {...props} />
    );
  },
);
Card.displayName = "Card";

export { Card, cardVariants };

const cardHeaderVariants = tv({
  base: "flex flex-col space-y-1.5 p-6",
});

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  asChild?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cardHeaderVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

export { CardHeader, cardHeaderVariants };

const cardTitleVariants = tv({
  base: "font-semibold leading-none tracking-tight",
});

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof cardTitleVariants> {
  asChild?: boolean;
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3";
    return (
      <Comp className={cardTitleVariants({ className })} ref={ref} {...props} />
    );
  },
);
CardTitle.displayName = "CardTitle";

export { CardTitle, cardTitleVariants };

const cardDescriptionVariants = tv({
  base: "text-sm text-muted-foreground",
});

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof cardDescriptionVariants> {
  asChild?: boolean;
}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      className={cardDescriptionVariants({ className })}
      ref={ref}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

export { CardDescription, cardDescriptionVariants };

const cardContentVariants = tv({
  base: "p-6 pt-0",
});

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {
  asChild?: boolean;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cardContentVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
CardContent.displayName = "CardContent";

export { CardContent, cardContentVariants };

const cardFooterVariants = tv({
  base: "flex items-center p-6 pt-0",
});

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {
  asChild?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cardFooterVariants({ className })}
        ref={ref}
        {...props}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

export { CardFooter, cardFooterVariants };
