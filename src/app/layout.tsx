import type { Metadata } from "next";
import { IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-secondary",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "devroast — paste your code. get roasted.",
  description:
    "Drop your code and we'll rate it — brutally honest or full roast mode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased",
          jetbrainsMono.variable,
          ibmPlexMono.variable,
        )}
      >
        <nav className="flex h-14 items-center justify-between border-b border-border-primary bg-bg-page px-10">
          <Link href="/" className="flex items-center gap-2 font-mono">
            <span className="text-xl font-bold text-accent-green">&gt;</span>
            <span className="text-lg font-medium text-text-primary">
              devroast
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/leaderboard"
              className="font-mono text-[13px] text-text-secondary transition-colors hover:text-text-primary"
            >
              leaderboard
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
