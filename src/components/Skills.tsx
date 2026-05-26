"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface SkillCategory {
  name: string;
  color: "green" | "purple" | "blue" | "orange";
  skills: string[];
}

const CATEGORIES: SkillCategory[] = [
  {
    name: "AI & Machine Learning",
    color: "purple",
    skills: ["Python", "GPT API", "Gemini API", "LLM Integration", "Prompt Engineering", "Agentic Systems", "AI Automation", "Scikit-learn", "Pandas", "NumPy"],
  },
  {
    name: "Backend & APIs",
    color: "green",
    skills: ["C#", ".NET Core", "ASP.NET Core", "Entity Framework", "REST APIs", "Java", "Spring Boot", "Microservices", "FastAPI", "Node.js"],
  },
  {
    name: "Cloud & DevOps",
    color: "blue",
    skills: ["AWS EC2", "AWS S3", "AWS IAM", "Docker", "CI/CD Pipelines", "Linux", "Bash Scripting", "DevSecOps"],
  },
  {
    name: "Frontend",
    color: "purple",
    skills: ["React.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    name: "Tools & Concepts",
    color: "green",
    skills: ["Git", "GitHub", "OOP", "DSA", "System Design", "Agile / Scrum", "PostgreSQL", "MongoDB"],
  },
];

const COLOR_MAP = {
  green: {
    tab: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    badge: "skill-badge-green",
    dot: "bg-emerald-500",
  },
  purple: {
    tab: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    badge: "skill-badge-purple",
    dot: "bg-purple-500",
  },
  blue: {
    tab: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    badge: "skill-badge-blue",
    dot: "bg-blue-500",
  },
  orange: {
    tab: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    badge: "skill-badge-green",
    dot: "bg-orange-500",
  },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayCategories = activeCategory
    ? CATEGORIES.filter((c) => c.name === activeCategory)
    : CATEGORIES;

  return (
    <section id="skills" className="py-28 px-6 md:px-8 w-full">
      <motion.div {...fadeUp(0)} className="mb-16">
        <p className="text-xs font-bold tracking-widest text-purple-400/80 uppercase mb-3">
          Skills
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Technical{" "}
          <span className="gradient-text-vivid">Expertise</span>
        </h2>
      </motion.div>

      {/* Filter tabs */}
      <motion.div {...fadeUp(0.1)} className="flex flex-wrap gap-2 mb-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(null)}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
            activeCategory === null
              ? "bg-white text-black border-white"
              : "border-white/[0.1] text-zinc-500 hover:text-zinc-300 hover:border-white/[0.2]"
          }`}
        >
          All
        </motion.button>
        {CATEGORIES.map((cat) => {
          const colors = COLOR_MAP[cat.color];
          return (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.name
                  ? colors.tab
                  : "border-white/[0.07] text-zinc-600 hover:text-zinc-400 hover:border-white/[0.12]"
              }`}
            >
              {cat.name}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skills grid */}
      <div className="space-y-8">
        {displayCategories.map((category, catIdx) => {
          const colors = COLOR_MAP[category.color];
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: catIdx * 0.07, ease: "easeOut" as const }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                <span className="text-sm font-bold text-white">{category.name}</span>
                <span className="h-px flex-1 bg-white/[0.05]" />
                <span className="text-xs text-zinc-700">{category.skills.length}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.93 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.025 }}
                    className={`skill-badge ${colors.badge} px-3.5 py-2 text-xs font-semibold rounded-xl border border-white/[0.07] text-zinc-400 cursor-default`}
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
