"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const leaderboardData = [
  {
    rank: 1,
    score: "1.2",
    code: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ],
    lang: "javascript",
    isTop: true,
  },
  {
    rank: 2,
    score: "1.8",
    code: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ],
    lang: "typescript",
    isTop: false,
  },
  {
    rank: 3,
    score: "2.1",
    code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
    lang: "sql",
    isTop: false,
  },
];

export default function Home() {
  const [roastMode, setRoastMode] = useState(true);
  const [code, setCode] = useState("");

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 16);

  return (
    <main className="flex flex-col items-center gap-8 px-10 pt-20 pb-0">
      {/* Hero Title */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-4xl font-bold text-accent-green">
            $
          </span>
          <h1 className="font-mono text-4xl font-bold text-text-primary">
            paste your code. get roasted.
          </h1>
        </div>
        <p className="font-secondary text-sm text-text-secondary">
          {
            "// drop your code below and we'll rate it — brutally honest or full roast mode"
          }
        </p>
      </div>

      {/* Code Editor */}
      <div className="w-full max-w-[780px] overflow-hidden rounded-none border border-border-primary bg-bg-input">
        {/* Window Header */}
        <div className="flex h-10 items-center border-b border-border-primary px-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-accent-red" />
            <div className="h-3 w-3 rounded-full bg-accent-amber" />
            <div className="h-3 w-3 rounded-full bg-accent-green" />
          </div>
        </div>

        {/* Code Area */}
        <div className="flex min-h-[360px]">
          {/* Line Numbers */}
          <div className="flex flex-col gap-2 border-r border-border-primary bg-bg-surface px-3 py-4">
            {Array.from({ length: lineCount }, (_, i) => (
              <span
                key={i}
                className="text-right font-mono text-xs leading-[18px] text-text-tertiary select-none"
                style={{ minWidth: "1.5rem" }}
              >
                {i + 1}
              </span>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// paste your code here..."
            spellCheck={false}
            className="flex-1 resize-none bg-transparent p-4 font-mono text-xs leading-[18px] text-text-primary placeholder:text-text-tertiary focus:outline-none"
            style={{ lineHeight: "18px" }}
          />
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex w-full max-w-[780px] items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Switch
              checked={roastMode}
              onCheckedChange={setRoastMode}
              defaultChecked
            />
            <span
              className={`font-mono text-[13px] ${roastMode ? "text-accent-green" : "text-text-secondary"}`}
            >
              roast mode
            </span>
          </div>
          <span className="font-secondary text-xs text-text-tertiary">
            // maximum sarcasm enabled
          </span>
        </div>

        <Button disabled={code.trim().length === 0}>$ roast_my_code</Button>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-center gap-6">
        <span className="font-secondary text-xs text-text-tertiary">
          2,847 codes roasted
        </span>
        <span className="font-mono text-xs text-text-tertiary">&middot;</span>
        <span className="font-secondary text-xs text-text-tertiary">
          avg score: 4.2/10
        </span>
      </div>

      {/* Spacer */}
      <div className="h-[60px]" />

      {/* Leaderboard Preview */}
      <div className="flex w-full max-w-[960px] flex-col gap-6">
        {/* Title Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-accent-green">
              //
            </span>
            <span className="font-mono text-sm font-bold text-text-primary">
              shame_leaderboard
            </span>
          </div>
          <Link
            href="/leaderboard"
            className="flex items-center gap-1 border border-border-primary px-3 py-1.5 font-mono text-xs text-text-secondary transition-colors hover:text-text-primary"
          >
            {"$ view_all >>"}
          </Link>
        </div>

        {/* Subtitle */}
        <p className="font-secondary text-[13px] text-text-tertiary">
          // the worst code on the internet, ranked by shame
        </p>

        {/* Table */}
        <div className="w-full border border-border-primary">
          {/* Table Header */}
          <div className="flex h-10 items-center bg-bg-surface px-5 border-b border-border-primary">
            <span className="w-[50px] font-mono text-xs font-medium text-text-tertiary">
              #
            </span>
            <span className="w-[70px] font-mono text-xs font-medium text-text-tertiary">
              score
            </span>
            <span className="flex-1 font-mono text-xs font-medium text-text-tertiary">
              code
            </span>
            <span className="w-[100px] font-mono text-xs font-medium text-text-tertiary">
              lang
            </span>
          </div>

          {/* Table Rows */}
          {leaderboardData.map((row) => (
            <div
              key={row.rank}
              className={`flex items-start px-5 py-4 ${row.rank < 3 ? "border-b border-border-primary" : ""}`}
            >
              <span
                className={`w-[50px] font-mono text-xs ${row.isTop ? "text-accent-amber" : "text-text-secondary"}`}
              >
                {row.rank}
              </span>
              <span className="w-[70px] font-mono text-xs font-bold text-accent-red">
                {row.score}
              </span>
              <div className="flex flex-1 flex-col gap-[3px]">
                {row.code.map((line) => (
                  <span
                    key={line}
                    className={`font-mono text-xs ${line.startsWith("//") || line.startsWith("--") ? "text-[#8B8B8B]" : "text-text-primary"}`}
                  >
                    {line}
                  </span>
                ))}
              </div>
              <span className="w-[100px] font-mono text-xs text-text-secondary">
                {row.lang}
              </span>
            </div>
          ))}
        </div>

        {/* Fade Hint */}
        <div className="flex justify-center px-0 py-4">
          <span className="font-secondary text-xs text-text-tertiary">
            showing top 3 of 2,847 &middot;{" "}
            <Link
              href="/leaderboard"
              className="text-text-tertiary transition-colors hover:text-text-secondary"
            >
              {"view full leaderboard >>"}
            </Link>
          </span>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-[60px]" />
    </main>
  );
}
