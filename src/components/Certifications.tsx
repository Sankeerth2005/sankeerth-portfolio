"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const CERTS = [
  {
    title: "SALESFORCE Certified Agentforce Specialist",
    issuer: "Salesforce",
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.08)",
    border: "rgba(59,130,246,0.25)",
    emoji: "⚡",
    link: "/Certificates/salesforce.jpg",
  },
  {
    title: "Oracle Certified Foundations Associate",
    issuer: "Oracle",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.25)",
    emoji: "☁️",
    link: "/Certificates/oracle.jpg",
  },
  {
    title: "SAP Certified - SAP Business Data Cloud",
    issuer: "SAP",
    color: "#10b981",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    emoji: "📊",
    link: "/Certificates/sap.jpg",
  },
  {
    title: "AI Fluency : Frameworks & Foundations",
    issuer: "Anthropic",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.08)",
    border: "rgba(139,92,246,0.25)",
    emoji: "🤖",
    link: "/Certificates/anthropic.jpg",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 px-6 md:px-8 max-w-6xl mx-auto">
      <motion.div {...fadeUp(0)} className="mb-16">
        <p className="text-xs font-bold tracking-widest text-orange-400/80 uppercase mb-3">
          Credentials
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Certifications &{" "}
          <span style={{
            background: "linear-gradient(135deg, #f97316, #f59e0b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Achievements
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {CERTS.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -7, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" as const }}
            className="glass rounded-2xl p-5 space-y-3 cursor-default card-vibrant"
            style={{
              borderColor: cert.border,
              boxShadow: `0 0 0 1px ${cert.border}, 0 20px 48px rgba(0,0,0,0.5)`,
            }}
          >
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: cert.bg, border: `1px solid ${cert.border}` }}
            >
              {cert.emoji}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-white leading-tight">{cert.title}</p>
              <p className="text-xs text-zinc-600 leading-relaxed">{cert.issuer}</p>
            </div>
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer w-fit"
              style={{ color: cert.color }}
            >
              <ExternalLink size={10} />
              View Certificate
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <motion.div {...fadeUp(0.3)}>
        <p className="text-xs font-bold tracking-widest text-zinc-600 uppercase mb-5">
          Awards & Leadership
        </p>
        <div className="space-y-3">
          {[
            {
              icon: "🥇",
              title: "1st Prize — Research Paper Presentation (2025)",
              desc: "Presented AI-based optimisation research to an industry and academic panel.",
              color: "#f59e0b",
            },
            {
              icon: "🥈",
              title: "2nd Prize — Robotics Challenge, IIT Mumbai",
              desc: "Demonstrated rapid prototyping under competition conditions.",
              color: "#a1a1aa",
            },
            {
              icon: "👑",
              title: "Student Council Lead",
              desc: "Organised technical events with 300+ participants; coordinated teams and logistics end-to-end.",
              color: "#8b5cf6",
            },
          ].map((ach) => (
            <motion.div
              key={ach.title}
              whileHover={{ x: 6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="flex items-start gap-4 p-4 glass glass-hover rounded-xl cursor-default"
            >
              <span className="text-xl shrink-0 mt-0.5">{ach.icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{ach.title}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{ach.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
