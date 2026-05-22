"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, LucideIcon, Layers, Cpu, Cloud } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDesc: string;
  tech: string[];
  category: string;
  icon: LucideIcon;
  accentColor: string;
  glowColor: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: "dukaanledger",
    name: "DukaanLedger",
    tagline: "Multi-Tenant SaaS Retail Platform",
    description: "SaaS retail management platform with inventory, billing, and analytics running on AWS.",
    longDesc: "Full-stack multi-tenant SaaS platform for retail management. Features real-time inventory tracking, billing, analytics dashboards, RBAC, and modular microservices architecture.",
    tech: ["React.js", "Spring Boot", "PostgreSQL", "AWS", "REST APIs", "Docker"],
    category: "Full-Stack",
    icon: Layers,
    accentColor: "#10b981",
    glowColor: "rgba(16,185,129,0.15)",
    featured: true,
    githubUrl: "https://github.com/Sankeerth2005",
    highlights: [
      "Multi-tenant data isolation with RBAC and role-based access control",
      "Modular microservices backend with PostgreSQL and REST APIs",
      "Inventory, billing, and analytics modules deployed on AWS",
    ],
  },
  {
    id: "text-rewriter",
    name: "AI Auto Text Rewriter",
    tagline: "GPT-Powered Content Automation",
    description: "Python automation tool using GPT API for context-aware text rewriting and summarisation at scale.",
    longDesc: "Production-grade AI automation tool that rewrites and summarises text using GPT API. Deployed on AWS via Docker with a modular plug-in architecture for swapping AI backends.",
    tech: ["Python", "GPT API", "Docker", "AWS", "FastAPI"],
    category: "AI / Automation",
    icon: Cpu,
    accentColor: "#8b5cf6",
    glowColor: "rgba(139,92,246,0.15)",
    featured: false,
    githubUrl: "https://github.com/Sankeerth2005",
    highlights: [
      "Context-aware text rewriting and summarisation at scale",
      "Modular architecture with plug-in AI model replacement",
      "Containerised AWS deployment via Docker",
    ],
  },
  {
    id: "blockchain-opt",
    name: "Blockchain Performance Optimiser",
    tagline: "ML-Driven Transaction Analysis",
    description: "Python ML models to analyse blockchain transaction datasets and identify throughput bottlenecks.",
    longDesc: "Data science project applying machine learning to blockchain transaction datasets. Identifies throughput bottlenecks and applies data-driven optimisation strategies to improve scalability.",
    tech: ["Python", "Scikit-learn", "Pandas", "Machine Learning", "Data Analysis"],
    category: "ML / Data",
    icon: Cloud,
    accentColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.15)",
    featured: false,
    githubUrl: "https://github.com/Sankeerth2005",
    highlights: [
      "ML models to identify blockchain transaction bottlenecks",
      "Data-driven optimisation improving transaction throughput",
      "Scalability analysis across multiple blockchain datasets",
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-28 px-6 md:px-8 max-w-6xl mx-auto">
      <motion.div {...fadeUp(0)} className="mb-16">
        <p className="text-xs font-bold tracking-widest text-blue-400/80 uppercase mb-3">
          Work
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Featured{" "}
          <span className="gradient-text-purple">Projects</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {PROJECTS.map((project, idx) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.id}
              {...fadeUp(0.08 + idx * 0.1)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedProject(project)}
              className="glass glass-hover rounded-2xl p-6 space-y-4 cursor-pointer card-vibrant flex flex-col"
              style={{
                boxShadow: `0 0 0 1px ${project.accentColor}12, 0 16px 48px rgba(0,0,0,0.4)`,
              }}
            >
              {/* Icon + category */}
              <div className="flex items-center justify-between">
                <div
                  className="h-11 w-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${project.accentColor}14`,
                    border: `1px solid ${project.accentColor}30`,
                  }}
                >
                  <Icon size={20} style={{ color: project.accentColor }} />
                </div>
                <span
                  className="px-2.5 py-1 text-[10px] font-bold rounded-full border"
                  style={{
                    background: `${project.accentColor}10`,
                    borderColor: `${project.accentColor}25`,
                    color: project.accentColor,
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <div>
                <h3 className="text-base font-black text-white mb-1">{project.name}</h3>
                <p className="text-xs font-medium" style={{ color: project.accentColor }}>
                  {project.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-500 leading-relaxed flex-1">
                {project.description}
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-medium rounded-md border border-white/[0.06] text-zinc-600"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-2 py-0.5 text-[10px] text-zinc-700">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* "View details" hint */}
              <div className="flex items-center gap-1 text-xs text-zinc-700 hover:text-zinc-500 transition-colors pt-1 border-t border-white/[0.05]">
                <span>View details</span>
                <ArrowUpRight size={11} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* GitHub link */}
      <motion.div {...fadeUp(0.4)} className="text-center">
        <motion.a
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          href="https://github.com/Sankeerth2005"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 glass glass-hover rounded-full text-sm font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <GithubIcon />
          More on GitHub
          <ArrowUpRight size={12} />
        </motion.a>
      </motion.div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="relative w-full max-w-xl glass-elevated rounded-2xl p-7 space-y-6 z-10 max-h-[85vh] overflow-y-auto"
              style={{
                boxShadow: `0 0 0 1px ${selectedProject.accentColor}20, 0 40px 80px rgba(0,0,0,0.7)`,
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.05]"
              >
                <X size={16} />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: `${selectedProject.accentColor}14`,
                    border: `1px solid ${selectedProject.accentColor}30`,
                  }}
                >
                  <selectedProject.icon size={22} style={{ color: selectedProject.accentColor }} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{selectedProject.name}</h3>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: selectedProject.accentColor }}>
                    {selectedProject.tagline}
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed">{selectedProject.longDesc}</p>

              {/* Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Highlights</p>
                {selectedProject.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span
                      className="mt-2 h-1 w-1 rounded-full shrink-0"
                      style={{ background: selectedProject.accentColor, opacity: 0.7 }}
                    />
                    {h}
                  </div>
                ))}
              </div>

              {/* Tech */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-white/[0.07] text-zinc-400"
                      style={{ background: "rgba(255,255,255,0.025)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {selectedProject.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: selectedProject.accentColor }}
                >
                  <GithubIcon />
                  View on GitHub
                  <ArrowUpRight size={12} />
                </motion.a>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
