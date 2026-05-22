"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  period: string;
  isLatest: boolean;
  accentColor: string;
  glowColor: string;
  bullets: string[];
  tags: string[];
}

const EXPERIENCES: Experience[] = [
  {
    role: "Associate Software Engineer Intern",
    company: "Mphasis",
    location: "Bengaluru, India (Remote)",
    duration: "4 months",
    period: "Jan 2026 – Apr 2026",
    isLatest: true,
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.12)",
    bullets: [
      "Developed backend services and REST APIs in C# and .NET Core for enterprise applications supporting 100,000+ users.",
      "Reduced API response latency by 25% through pipeline and query optimisations; resolved 10+ production-level defects.",
      "Applied OOP and scalable backend design principles; collaborated via Git, code reviews, and Agile sprint delivery.",
    ],
    tags: ["C#", ".NET Core", "ASP.NET Core", "Entity Framework", "REST APIs", "Git", "Agile"],
  },
  {
    role: "DevOps Intern",
    company: "Mroads",
    location: "Hyderabad, India",
    duration: "3 months",
    period: "Oct 2025 – Jan 2026",
    isLatest: false,
    accentColor: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.1)",
    bullets: [
      "Managed AWS infrastructure (EC2, S3, IAM) and Linux environments across production-grade applications.",
      "Built and maintained CI/CD pipelines using Bash and Python scripts, reducing manual deployment effort by 30%.",
      "Containerised workloads with Docker; implemented DevSecOps practices for secure and compliant deployments.",
    ],
    tags: ["AWS (EC2/S3/IAM)", "Docker", "CI/CD", "Linux", "Bash", "DevSecOps", "Python"],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function Timeline() {
  return (
    <section id="experience" className="py-28 px-6 md:px-8 max-w-6xl mx-auto">
      <motion.div {...fadeUp(0)} className="mb-16">
        <p className="text-xs font-bold tracking-widest text-emerald-400/80 uppercase mb-3">
          Experience
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Professional{" "}
          <span className="gradient-text-accent">Journey</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical track */}
        <div className="absolute left-6 top-0 bottom-0 w-px timeline-track hidden md:block" />

        <div className="space-y-7">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={idx}
              {...fadeUp(0.1 + idx * 0.15)}
              className="relative md:pl-16"
            >
              {/* Timeline dot */}
              <div className="absolute left-[18px] top-7 hidden md:flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.4 }}
                  className="h-4 w-4 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: exp.accentColor,
                    background: `${exp.accentColor}18`,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full pulse-available"
                    style={{ background: exp.accentColor }}
                  />
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.25 }}
                className="glass glass-hover rounded-2xl p-6 md:p-7 space-y-5 cursor-default card-vibrant"
                style={{
                  boxShadow: `0 0 0 1px ${exp.accentColor}15, 0 24px 64px rgba(0,0,0,0.4)`,
                }}
              >
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-black text-white">{exp.role}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span
                        className="flex items-center gap-1.5 font-bold"
                        style={{ color: exp.accentColor }}
                      >
                        <Briefcase size={12} />
                        {exp.company}
                      </span>
                      <span className="text-zinc-700">·</span>
                      <span className="flex items-center gap-1 text-zinc-600">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className="px-2.5 py-1 text-[10px] font-bold rounded-full border"
                      style={{
                        background: `${exp.accentColor}12`,
                        borderColor: `${exp.accentColor}30`,
                        color: exp.accentColor,
                      }}
                    >
                      {exp.isLatest ? "Most Recent" : "Concluded"}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-zinc-600">
                      <Calendar size={10} />
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                      <span
                        className="mt-2 h-1 w-1 rounded-full shrink-0"
                        style={{ background: exp.accentColor, opacity: 0.6 }}
                      />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.08, y: -1 }}
                      whileTap={{ scale: 0.93 }}
                      className="px-2.5 py-1 text-[10px] font-semibold rounded-lg border border-white/[0.06] text-zinc-600 cursor-default"
                      style={{ background: "rgba(255,255,255,0.025)" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
