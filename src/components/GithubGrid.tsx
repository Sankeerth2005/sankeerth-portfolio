"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const GITHUB_USERNAME = "Sankeerth2005";
const WEEKS = 20;
const DAYS_PER_WEEK = 7;
const TOTAL_CELLS = WEEKS * DAYS_PER_WEEK;

// Generate a realistic looking contribution pattern
function generateContributions(): number[] {
  const data: number[] = [];
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const rand = Math.random();
    if (rand < 0.45) data.push(0);
    else if (rand < 0.68) data.push(1);
    else if (rand < 0.82) data.push(2);
    else if (rand < 0.93) data.push(3);
    else data.push(4);
  }
  return data;
}

function getCellColor(level: number): string {
  switch (level) {
    case 0:
      return "bg-white/[0.04]";
    case 1:
      return "bg-emerald-500/20";
    case 2:
      return "bg-emerald-500/40";
    case 3:
      return "bg-emerald-500/65";
    case 4:
      return "bg-emerald-500";
    default:
      return "bg-white/[0.04]";
  }
}

const PINNED_REPOS = [
  {
    name: "DukaanLedger",
    desc: "Multi-tenant SaaS retail POS platform with AI analytics",
    lang: "JavaScript",
    color: "#f1e05a",
    stars: 4,
    forks: 1,
  },
  {
    name: "AI-Text-Rewriter",
    desc: "Automated document processing with hot-swappable LLM modules",
    lang: "Python",
    color: "#3572A5",
    stars: 7,
    forks: 2,
  },
  {
    name: "Blockchain-Optimizer",
    desc: "ML-powered transaction efficiency engine for distributed ledgers",
    lang: "Python",
    color: "#3572A5",
    stars: 3,
    forks: 0,
  },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

const ForkIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
    <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function GithubGrid() {
  // Initialize with all-zero arrays on SSR to avoid hydration mismatch.
  // Populate with random data only after client mount.
  const [contributions, setContributions] = useState<number[]>(
    () => new Array(TOTAL_CELLS).fill(0)
  );
  const [totalContributions, setTotalContributions] = useState(0);

  useEffect(() => {
    const data = generateContributions();
    setContributions(data);
    setTotalContributions(data.reduce((sum, val) => sum + (val > 0 ? val * 3 + 1 : 0), 0));
  }, []);

  return (
    <section id="github" className="py-28 px-6 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp(0)} className="mb-16">
        <p className="text-xs font-semibold tracking-widest text-emerald-500/70 uppercase mb-3">
          Activity
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">GitHub Activity</h2>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-zinc-600 hover:text-white transition-colors"
          >
            <GithubIcon />
            @{GITHUB_USERNAME}
            <ArrowUpRight size={12} />
          </a>
        </div>
      </motion.div>

      {/* Contribution Grid */}
      <motion.div {...fadeUp(0.1)} className="glass glass-hover rounded-2xl p-6 md:p-7 mb-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-semibold text-zinc-400">
            {totalContributions.toLocaleString("en-US")} contributions in the last 20 weeks
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-700">
            <span>Less</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className={`h-2.5 w-2.5 rounded-sm ${getCellColor(l)}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        <div
          className="github-grid grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${WEEKS}, 1fr)`,
          }}
        >
          {Array.from({ length: WEEKS }, (_, w) =>
            Array.from({ length: DAYS_PER_WEEK }, (_, d) => {
              const idx = w * DAYS_PER_WEEK + d;
              const level = contributions[idx] ?? 0;
              return (
                <div
                  key={`${w}-${d}`}
                  className={`github-cell h-2.5 rounded-sm ${getCellColor(level)}`}
                  title={`${level > 0 ? level * 3 + 1 : 0} contributions`}
                />
              );
            })
          )}
        </div>
      </motion.div>

      {/* Pinned Repos */}
      <motion.div {...fadeUp(0.2)}>
        <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase mb-5">
          Pinned Repositories
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PINNED_REPOS.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              {...fadeUp(0.05 + idx * 0.08)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.25 }}
              className="glass glass-hover rounded-xl p-5 space-y-3 block cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <GithubIcon />
                  {repo.name}
                </div>
                <ArrowUpRight size={12} className="text-zinc-700" />
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">{repo.desc}</p>

              <div className="flex items-center gap-4 text-[10px] text-zinc-600">
                <span className="flex items-center gap-1">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: repo.color }}
                  />
                  {repo.lang}
                </span>
                <span className="flex items-center gap-1">
                  <StarIcon />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <ForkIcon />
                  {repo.forks}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
