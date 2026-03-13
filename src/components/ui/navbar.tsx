import Link from "next/link";
import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const navbarVariants = tv({
  base: "flex h-14 items-center justify-between border-b border-border-primary bg-bg-page px-10",
});

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {}

export function Navbar({ className, children, ...props }: NavbarProps) {
  return (
    <nav className={navbarVariants({ className })} {...props}>
      <Link href="/" className="flex items-center gap-2 font-mono">
        <span className="text-xl font-bold text-accent-green">&gt;</span>
        <span className="text-lg font-medium text-text-primary">devroast</span>
      </Link>
      <div className="flex items-center gap-6">{children}</div>
    </nav>
  );
}

const navLinkVariants = tv({
  base: "font-mono text-[13px] text-text-secondary transition-colors hover:text-text-primary",
});

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  href: string;
}

export function NavLink({ className, href, ...props }: NavLinkProps) {
  return (
    <Link href={href} className={navLinkVariants({ className })} {...props} />
  );
}
