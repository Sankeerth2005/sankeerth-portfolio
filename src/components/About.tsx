"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Cloud } from "lucide-react";
import Terminal from "./Terminal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const STRENGTHS = [
  {
    icon: Cpu,
    title: "AI & Automation",
    desc: "Building agentic systems and intelligent workflows using LLMs, GPT APIs, and Python.",
  },
  {
    icon: Code2,
    title: ".NET Backend",
    desc: "Designing scalable REST APIs with C#, ASP.NET Core, and Entity Framework Core.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Provisioning and automating infrastructure on AWS with Docker and CI/CD pipelines.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6 md:px-8 w-full">
      {/* Section label */}
      <motion.div {...fadeUp(0)} className="mb-16">
        <p className="text-xs font-semibold tracking-widest text-emerald-500/70 uppercase mb-3">
          About Me
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-xl">
          Engineer, builder, and{" "}
          <span className="gradient-text-accent">lifelong learner.</span>
        </h2>
      </motion.div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left — Bio & Strengths */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div {...fadeUp(0.1)} className="space-y-4 text-zinc-400 leading-relaxed">
            <p>
              I&apos;m a Computer Science graduate specializing in AI &amp; Machine
              Learning from Sreyas Institute of Engineering and Technology,
              Hyderabad. I graduated in May 2026 with a CGPA of{" "}
              <span className="text-white font-medium">8.51/10</span>.
            </p>
            <p>
              My work sits at the intersection of AI engineering, scalable
              backend systems, and cloud automation. I build things that are
              fast, reliable, and intelligent — from REST APIs to agentic
              pipelines.
            </p>
            <p>
              I believe the best software is invisible — it just works,
              effortlessly, and scales without drama.
            </p>
          </motion.div>

          {/* Key facts */}
          <motion.div {...fadeUp(0.2)} className="glass rounded-2xl p-5 space-y-3">
            <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase">
              Quick Facts
            </p>
            {[
              ["Location", "Hyderabad, India"],
              ["Degree", "BE CS (AI & ML) · 2026"],
              ["GPA", "8.51 / 10.0"],
              ["Status", "Open to full-time roles"],
            ].map(([key, val]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-zinc-600">{key}</span>
                <span className="text-zinc-300 font-medium">{val}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — Strengths + Terminal */}
        <div className="lg:col-span-7 space-y-6">
          {/* Strengths */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STRENGTHS.map((s, i) => (
              <motion.div
                key={s.title}
                {...fadeUp(0.1 + i * 0.1)}
                className="glass glass-hover rounded-2xl p-5 space-y-3 cursor-default"
              >
                <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <s.icon size={16} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Developer Console (preserved interactive feature) */}
          <motion.div {...fadeUp(0.4)}>
            <div className="mb-3 flex items-center gap-2">
              <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase">
                Developer Console
              </p>
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Interactive
              </span>
            </div>
            <Terminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
