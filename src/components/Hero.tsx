"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  FileText,
  Calendar,
  MapPin,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const ROLES = [
  "AI Engineer",
  "Backend Developer",
  ".NET Specialist",
  "Cloud Engineer",
  "Python Developer",
];

interface HeroProps {
  onOpenResume: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: "easeOut" as const },
});

export default function Hero({ onOpenResume }: HeroProps) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roleText, setRoleText] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(80);
  const [greeting, setGreeting] = useState("Good day");
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const current = ROLES[roleIdx];
    const timer = setTimeout(() => {
      if (isDeleting) {
        setRoleText(current.substring(0, charIdx - 1));
        setCharIdx((p) => p - 1);
        setTypingSpeed(38);
      } else {
        setRoleText(current.substring(0, charIdx + 1));
        setCharIdx((p) => p + 1);
        setTypingSpeed(85);
      }
      if (!isDeleting && charIdx === current.length) {
        setIsDeleting(true);
        setTypingSpeed(2200);
      } else if (isDeleting && charIdx === 0) {
        setIsDeleting(false);
        setRoleIdx((p) => (p + 1) % ROLES.length);
        setTypingSpeed(300);
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [roleIdx, charIdx, isDeleting, typingSpeed]);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const tick = () => {
      setIstTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: true,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-8 max-w-6xl mx-auto"
    >
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, #8b5cf6, transparent 70%)",
            top: "10%",
            left: "-10%",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-15"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, #10b981, transparent 70%)",
            top: "30%",
            right: "0%",
          }}
        />
      </div>

      {/* Available badge */}
      <motion.div {...fadeUp(0.1)} className="mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-xs font-medium text-zinc-300 float-badge border border-purple-500/15">
          <Sparkles size={11} className="text-purple-400" />
          {greeting} — Available for new opportunities
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-available" />
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* LEFT — Text content */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <motion.h1
              {...fadeUp(0.2)}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight"
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Sai Sankeerth
              </span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #8b5cf6 60%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Anchuru.
              </span>
            </motion.h1>

            <motion.div {...fadeUp(0.35)} className="mt-5 flex items-center gap-2.5">
              <span className="text-lg md:text-xl font-semibold text-zinc-300">
                {roleText}
              </span>
              <span className="terminal-cursor-blink" />
            </motion.div>
          </div>

          <motion.p {...fadeUp(0.45)} className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-xl">
            Building intelligent systems, scalable .NET APIs, and automated cloud
            pipelines. Turning complex problems into elegant, production-ready solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.55)} className="flex flex-wrap items-center gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              className="flex items-center gap-2 px-6 py-3.5 text-sm font-bold rounded-xl cursor-pointer btn-shimmer"
              style={{
                background: "linear-gradient(135deg, #10b981, #8b5cf6)",
                color: "white",
                boxShadow: "0 8px 32px rgba(16,185,129,0.25), 0 2px 8px rgba(139,92,246,0.2)",
              }}
            >
              View Projects
              <ArrowRight size={14} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenResume}
              className="flex items-center gap-2 px-5 py-3.5 glass glass-hover text-sm font-semibold text-zinc-200 rounded-xl cursor-pointer"
            >
              <FileText size={14} className="text-emerald-400" />
              Resume / CV
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold rounded-xl cursor-pointer border border-purple-500/25 text-purple-400 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
            >
              <Calendar size={14} />
              Book a Call
            </motion.a>
          </motion.div>

          {/* Meta row */}
          <motion.div
            {...fadeUp(0.65)}
            className="flex flex-wrap items-center gap-5 text-xs text-zinc-700 pt-2 border-t border-white/[0.05]"
          >
            <span className="flex items-center gap-1.5 text-zinc-600">
              <MapPin size={11} />
              Hyderabad, India
            </span>
            <span className="h-3 w-px bg-white/[0.06]" />
            <span className="text-zinc-600">IST · {istTime}</span>
            <span className="h-3 w-px bg-white/[0.06]" />
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 glow-dot" />
              Open to work
            </span>
          </motion.div>
        </div>

        {/* RIGHT — Photo + Stat card */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.4, ease: "easeOut" as const }}
          className="lg:col-span-5 flex flex-col items-center gap-5"
        >
          {/* ── PHOTO ── */}
          <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" as const }}
            className="relative cursor-default"
          >
            {/* Gradient glow ring behind photo */}
            <div
              className="absolute -inset-[3px] rounded-[2rem] opacity-80"
              style={{
                background: "linear-gradient(135deg, #10b981, #8b5cf6, #3b82f6)",
                filter: "blur(12px)",
                zIndex: 0,
              }}
            />
            {/* Solid gradient border */}
            <div
              className="absolute -inset-[2px] rounded-[2rem]"
              style={{
                background: "linear-gradient(135deg, #10b981, #8b5cf6, #3b82f6)",
                zIndex: 1,
              }}
            />

            {/* Photo container */}
            <div
              className="relative rounded-[1.85rem] overflow-hidden"
              style={{
                width: "240px",
                height: "290px",
                zIndex: 2,
              }}
            >
              <Image
                src="/me - Copy.jpg"
                alt="Sai Sankeerth Anchuru"
                fill
                sizes="240px"
                className="object-cover object-top"
                priority
              />
              {/* Subtle dark overlay at bottom for blending */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{
                  background: "linear-gradient(to top, rgba(3,3,7,0.5), transparent)",
                }}
              />
            </div>

            {/* Floating name badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10"
            >
              <div
                className="px-4 py-2 rounded-xl text-center whitespace-nowrap"
                style={{
                  background: "rgba(3,3,7,0.88)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.1)",
                }}
              >
                <p className="text-xs font-black text-white">Sai Sankeerth Anchuru</p>
                <p className="text-[10px] font-medium" style={{ color: "#10b981" }}>
                  AI & Backend Engineer
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── STAT CARD ── */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.25 }}
            className="w-full glass glass-hover rounded-2xl p-5 space-y-4 card-vibrant cursor-default mt-6"
            style={{
              boxShadow: "0 0 0 1px rgba(139,92,246,0.1), 0 16px 48px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                Status
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 pulse-available" />
                Available
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Internships", value: "2", color: "#10b981" },
                { label: "Projects", value: "3+", color: "#8b5cf6" },
                { label: "CGPA", value: "8.51", color: "#3b82f6" },
              ].map((s) => (
                <div key={s.label} className="space-y-1">
                  <p className="text-xl font-black" style={{ color: s.color }}>
                    {s.value}
                  </p>
                  <p className="text-[9px] text-zinc-700 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-white/[0.05]">
              {["Python", ".NET Core", "AWS", "Docker", "GPT API"].map((t) => (
                <motion.span
                  key={t}
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-2.5 py-1 text-[9px] font-semibold rounded-lg border border-white/[0.07] text-zinc-600 cursor-default"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-700 hover:text-zinc-500 transition-colors cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
      </motion.button>
    </section>
  );
}
