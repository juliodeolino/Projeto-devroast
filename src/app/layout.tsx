import type { Metadata } from "next";
import { IBM_Plex_Mono, JetBrains_Mono } from "next/font/google";
import { Navbar, NavLink } from "@/components/ui/navbar";
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
        <Navbar>
          <NavLink href="/leaderboard">leaderboard</NavLink>
        </Navbar>
        {children}
      </body>
    </html>
  );
}
