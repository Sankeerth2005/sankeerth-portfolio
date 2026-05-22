"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Loader2,
  CheckCircle,
  Mail,
  Calendar,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
});

const SOCIALS = [
  {
    label: "Email",
    value: "anchurusaisankeerth@gmail.com",
    href: "mailto:anchurusaisankeerth@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/saisankeerthanchuru",
    href: "https://linkedin.com/in/saisankeerthanchuru",
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "github.com/Sankeerth2005",
    href: "https://github.com/Sankeerth2005",
    icon: GithubIcon,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    // Simulate async send
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setFormData({ name: "", email: "", message: "" });
    }, 3500);
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-8 max-w-6xl mx-auto">
      {/* Section label */}
      <motion.div {...fadeUp(0)} className="mb-16">
        <p className="text-xs font-semibold tracking-widest text-emerald-500/70 uppercase mb-3">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white max-w-xl">
          Let&apos;s build something{" "}
          <span className="gradient-text-accent">remarkable</span> together.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left — Contact info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Intro */}
          <motion.p {...fadeUp(0.1)} className="text-zinc-400 leading-relaxed">
            I&apos;m open to full-time opportunities, freelance projects,
            collaborations, and interesting conversations. Feel free to reach
            out — I respond within 24 hours.
          </motion.p>

          {/* Social links */}
          <motion.div {...fadeUp(0.15)} className="space-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass glass-hover rounded-xl group cursor-pointer"
              >
                <div className="h-9 w-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5 transition-all">
                  <s.icon size={15} className="text-zinc-500 group-hover:text-emerald-500 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-0.5">
                    {s.label}
                  </p>
                  <p className="text-sm text-zinc-400 group-hover:text-white transition-colors truncate">
                    {s.value}
                  </p>
                </div>
                <ArrowUpRight size={12} className="text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0" />
              </a>
            ))}
          </motion.div>

          {/* Book a call CTA */}
          <motion.div {...fadeUp(0.25)}>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/35 rounded-xl text-sm font-semibold text-emerald-500 transition-all cursor-pointer btn-shimmer"
            >
              <Calendar size={16} />
              Schedule a 30-min call
              <ArrowUpRight size={13} />
            </a>
          </motion.div>

          {/* Location */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex items-center gap-2 text-xs text-zinc-700"
          >
            <MapPin size={11} />
            Hyderabad, India · Available remotely worldwide
          </motion.div>
        </div>

        {/* Right — Contact form */}
        <motion.div {...fadeUp(0.2)} className="lg:col-span-7">
          <div className="glass glass-hover rounded-2xl p-7 md:p-8">
            {status === "sent" ? (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle size={24} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Message sent!</p>
                  <p className="text-sm text-zinc-500 mt-1">
                    Thanks for reaching out — I&apos;ll get back to you soon.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="form-input resize-none"
                    placeholder="Tell me about your project or opportunity..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white hover:bg-zinc-100 disabled:opacity-60 text-black text-sm font-semibold rounded-xl transition-all cursor-pointer btn-shimmer disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
