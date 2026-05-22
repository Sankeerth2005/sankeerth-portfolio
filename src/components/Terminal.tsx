"use client";

import React, { useState, useRef, useEffect } from "react";
import { TerminalSquare, AlertCircle, ChevronRight } from "lucide-react";

interface LogEntry {
  type: "input" | "output" | "info" | "error" | "system";
  text: string;
}

const COMMAND_RESPONSES: Record<string, string> = {
  help: `
Available commands:
  <span class="text-emerald-500">bio.md</span>          Display profile and background
  <span class="text-emerald-500">skills.sys</span>      List technical skill areas
  <span class="text-emerald-500">projects.db</span>     View project index
  <span class="text-emerald-500">connect.net</span>     Show contact channels
  <span class="text-emerald-500">clear</span>           Clear console output
  <span class="text-emerald-500">exit</span>            Reset session
`,
  "bio.md": `
Name:           Sai Sankeerth Anchuru
Specialization: AI/ML Engineering · .NET Backend · Cloud DevOps
Location:       Hyderabad, India
Education:      BE CS (AI & ML), Sreyas Institute, CGPA 8.51

CS graduate building Python-based automation tools, AI-driven applications, 
and scalable .NET backends. I focus on reducing operational friction through 
intelligent automation, scalable APIs, and well-architected cloud pipelines.
`,
  "skills.sys": `
AI & ML:         Python · GPT API · Gemini API · LLM Integration · Agentic Systems
Backend:         C# · .NET Core · ASP.NET Core · Entity Framework · Spring Boot
Cloud & DevOps:  AWS (EC2/S3/IAM) · Docker · CI/CD · Shell Scripting · DevSecOps
Frontend:        React.js · Angular · TypeScript · Tailwind CSS
Tools:           Git · OOP · DSA · System Design · Agile/Scrum
`,
  "projects.db": `
Project Index:
  [1] <strong class="text-emerald-400">DukaanLedger</strong>       — Multi-tenant SaaS Retail POS Platform
  [2] <strong class="text-sky-400">AI Text Rewriter</strong>     — Enterprise GPT-powered document automation
  [3] <strong class="text-emerald-400">Blockchain Optimizer</strong> — ML-driven transaction efficiency engine

Type <span class="text-zinc-400">'decompile [project]'</span> (e.g., 'decompile dukaanledger') for details.
`,
  "connect.net": `
Contact Channels:
  Email:    <a href="mailto:anchurusaisankeerth@gmail.com" class="text-emerald-400 hover:underline">anchurusaisankeerth@gmail.com</a>
  LinkedIn: <a href="https://linkedin.com/in/saisankeerthanchuru" target="_blank" class="text-emerald-400 hover:underline">linkedin.com/in/saisankeerthanchuru</a>
  GitHub:   <a href="https://github.com/Sankeerth2005" target="_blank" class="text-emerald-400 hover:underline">github.com/Sankeerth2005</a>
`,
};

const PROJECT_SPECS: Record<
  string,
  { title: string; summary: string; tech: string; architecture: string }
> = {
  dukaanledger: {
    title: "DukaanLedger — Multi-Tenant SaaS Retail POS Platform",
    summary:
      "Enterprise-grade POS and financial reporting system with AI-assisted analytics and multi-tenant data isolation.",
    tech: "React.js, Spring Boot, REST APIs, AWS, GPT API, PostgreSQL",
    architecture: `
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│   React.js UI   │───▶│  Spring Boot REST   │───▶│  Microservices  │
│   [RBAC Roles]  │    │  [JWT Auth Gateway] │    │  [Inventory/POS]│
└─────────────────┘    └─────────────────────┘    └──────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│ AWS RDS Secure  │◀───│  AI Analytics Node  │◀───│  Redis Cache     │
│ [Isolated DBs]  │    │  [GPT API Insights] │    │  [Tx Sync]       │
└─────────────────┘    └─────────────────────┘    └──────────────────┘
`,
  },
  textrewriter: {
    title: "AI-Based Auto Text Rewriter Pipeline",
    summary:
      "Scalable enterprise automation service for rewriting and synthesizing bulk document repositories with hot-swappable LLM modules.",
    tech: "Python, GPT API, Gemini API, FastAPI, Docker, AWS ECS",
    architecture: `
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│  Document Input │───▶│  FastAPI Broker     │───▶│  Docker Pool     │
│  [PDF/DOC/TXT]  │    │  [Request Handler]  │    │  [Async Workers] │
└─────────────────┘    └─────────────────────┘    └──────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│  Output Docs    │◀───│  AWS ECS Cluster    │◀───│  LLM Swap Layer  │
│  [Rewritten]    │    │  [Auto-scaling]     │    │  [GPT/Gemini]    │
└─────────────────┘    └─────────────────────┘    └──────────────────┘
`,
  },
  blockchain: {
    title: "AI-Driven Blockchain Performance Optimizer",
    summary:
      "ML module that analyzes transaction speed variances and scales efficiency across distributed ledger models.",
    tech: "Python, Scikit-learn, Pandas, NumPy, Data Analysis",
    architecture: `
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│ Distributed     │───▶│  Telemetry Ingest   │───▶│  Scikit-learn ML │
│ [Block Logs]    │    │  [Pandas Normalize] │    │  [Classification]│
└─────────────────┘    └─────────────────────┘    └──────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│  Optimized Node │◀───│  Dispatch Signal    │◀───│  Predictive Map  │
│  [Gas Optimized]│    │  [Throughput Adj]   │    │  [Bottlenecks]   │
└─────────────────┘    └─────────────────────┘    └──────────────────┘
`,
  },
};

export default function Terminal() {
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "system", text: "Developer Console v1.0.0 — Interactive Portfolio Explorer" },
    { type: "info", text: 'Type <span class="text-emerald-500">\'help\'</span> to see available commands.' },
  ]);
  const [inputVal, setInputVal] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const execute = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    const newHistory = [...history, { type: "input" as const, text: trimmed }];

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "exit") {
      setHistory([
        ...newHistory,
        { type: "system" as const, text: "Session reset. Welcome back." },
        { type: "info" as const, text: 'Type <span class="text-emerald-500">\'help\'</span> to get started.' },
      ]);
      return;
    }

    if (cmd.startsWith("decompile ")) {
      const key = cmd.replace("decompile ", "").trim();
      if (PROJECT_SPECS[key]) {
        const spec = PROJECT_SPECS[key];
        setHistory([
          ...newHistory,
          {
            type: "output" as const,
            text: `<strong class="text-white">${spec.title}</strong><br/><span class="text-zinc-500 text-[11px]">${spec.summary}</span><br/><br/>Tech Stack: ${spec.tech}<br/><br/>Architecture:<pre class="text-emerald-500/80 text-[10px] leading-snug font-mono whitespace-pre overflow-x-auto mt-1">${spec.architecture}</pre>`,
          },
        ]);
      } else {
        setHistory([
          ...newHistory,
          { type: "error" as const, text: `Project '${key}' not found. Try 'decompile dukaanledger'` },
        ]);
      }
      return;
    }

    let mapped = cmd;
    if (cmd === "skills") mapped = "skills.sys";
    if (cmd === "bio") mapped = "bio.md";
    if (cmd === "projects") mapped = "projects.db";
    if (cmd === "contact") mapped = "connect.net";

    if (COMMAND_RESPONSES[mapped]) {
      setHistory([...newHistory, { type: "output" as const, text: COMMAND_RESPONSES[mapped] }]);
    } else {
      setHistory([
        ...newHistory,
        { type: "error" as const, text: `Command '${trimmed}' not recognized. Type 'help' for options.` },
      ]);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(inputVal);
      setInputVal("");
    }
  };

  return (
    <div className="flex flex-col h-80 bg-[#0a0a0c]/90 border border-white/[0.07] rounded-xl overflow-hidden font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-[#0d0d10] px-4 py-2.5 border-b border-white/[0.06] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-800 border border-white/[0.06]" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-800 border border-white/[0.06]" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-800 border border-white/[0.06]" />
          </div>
          <span className="text-zinc-600 text-[10px] flex items-center gap-1.5 ml-2">
            <TerminalSquare size={11} className="text-zinc-700" />
            sankeerth ~ console
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[9px] text-emerald-600 font-medium">
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
          Connected
        </span>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-2 terminal-scroll select-text">
        {history.map((entry, idx) => {
          if (entry.type === "input") {
            return (
              <div key={idx} className="flex items-start gap-1.5">
                <ChevronRight size={10} className="text-emerald-500 mt-0.5 shrink-0" />
                <span className="text-white">{entry.text}</span>
              </div>
            );
          } else if (entry.type === "system") {
            return (
              <div key={idx} className="text-zinc-600 text-[10px]">
                {entry.text}
              </div>
            );
          } else if (entry.type === "info") {
            return (
              <div
                key={idx}
                className="text-zinc-500 text-[11px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: entry.text }}
              />
            );
          } else if (entry.type === "error") {
            return (
              <div key={idx} className="flex items-start gap-1.5 text-red-400/80 bg-red-500/[0.04] border border-red-500/10 px-3 py-2 rounded-lg">
                <AlertCircle size={11} className="shrink-0 mt-0.5" />
                <span>{entry.text}</span>
              </div>
            );
          } else {
            return (
              <div
                key={idx}
                className="text-zinc-400 leading-relaxed pl-2 border-l border-white/[0.05]"
                dangerouslySetInnerHTML={{ __html: entry.text }}
              />
            );
          }
        })}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#080809] border-t border-white/[0.05] shrink-0">
        <ChevronRight size={11} className="text-emerald-500 shrink-0" />
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a command..."
          className="flex-1 bg-transparent text-white outline-none border-none caret-emerald-500 placeholder:text-zinc-700 text-xs"
          autoComplete="off"
          spellCheck="false"
        />
        <span className="terminal-cursor-blink" />
      </div>

      {/* Quick commands */}
      <div className="flex items-center gap-1.5 bg-[#07070a] px-3.5 py-1.5 border-t border-white/[0.04] overflow-x-auto text-[9px] shrink-0">
        <span className="text-zinc-700 shrink-0">Quick:</span>
        {["bio.md", "skills.sys", "projects.db", "connect.net", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => execute(cmd)}
            className="px-2 py-0.5 border border-white/[0.06] text-zinc-600 rounded hover:bg-emerald-500/5 hover:border-emerald-500/20 hover:text-emerald-500 cursor-pointer transition-all shrink-0"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
