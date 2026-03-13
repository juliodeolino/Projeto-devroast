import type * as React from "react";
import { tv } from "tailwind-variants";

const tableVariants = tv({
  base: "w-full text-sm",
});

const tableHeaderVariants = tv({
  base: "[&_tr]:border-b",
});

const tableBodyVariants = tv({
  base: "[&_tr:last-child]:border-0",
});

const tableRowVariants = tv({
  base: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
});

const tableCellVariants = tv({
  base: "p-4 align-middle [&:has([role=checkbox])]:pr-0",
});

const tableHeadVariants = tv({
  base: "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
});

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return <table className={tableVariants({ className })} {...props} />;
}

export function TableHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={tableHeaderVariants({ className })} {...props} />;
}

export function TableBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={tableBodyVariants({ className })} {...props} />;
}

export function TableRow({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={tableRowVariants({ className })} {...props} />;
}

export function TableCell({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={tableCellVariants({ className })} {...props} />;
}

export function TableHead({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={tableHeadVariants({ className })} {...props} />;
}
