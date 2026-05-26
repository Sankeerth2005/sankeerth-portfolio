"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Calendar, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [time, setTime] = useState("");

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = ["home", "about", "experience", "projects", "skills", "certifications", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live IST clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Kolkata",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" as const }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4 no-print"
      >
        <div
          className={`w-full max-w-4xl flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
            scrolled
              ? "glass-elevated shadow-2xl shadow-black/40"
              : "glass"
          }`}
        >
          {/* Logo / Branding */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/15 transition-colors">
              <span className="text-emerald-500 text-xs font-bold">S</span>
            </div>
            <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:block">
              Sankeerth
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Clock */}
            <span className="hidden lg:block text-xs text-zinc-600 font-mono tabular-nums">
              IST {time}
            </span>

            <div className="hidden lg:block h-4 w-px bg-white/10" />

            {/* Resume */}
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white glass glass-hover rounded-lg cursor-pointer transition-all duration-200 btn-shimmer"
            >
              <FileText size={12} />
              Resume
            </button>

            {/* Book a Call */}
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg cursor-pointer transition-all duration-200 btn-shimmer"
            >
              <Calendar size={12} />
              Book Call
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 glass-elevated rounded-2xl p-4 space-y-1 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="h-px bg-white/[0.06] my-2" />
            <button
              onClick={() => { onOpenResume(); setMobileOpen(false); }}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] rounded-xl transition-all cursor-pointer"
            >
              View Resume
            </button>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <Calendar size={14} />
              Book a Call
              <ArrowUpRight size={12} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
