"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import GithubGrid from "@/components/GithubGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";
import ScrollProgress from "@/components/ScrollProgress";

// Three.js background — client-only, no SSR
const PremiumBackground = dynamic(
  () => import("@/components/PremiumBackground"),
  { ssr: false }
);

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050505] text-[#fafafa] overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-400">
        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Three.js immersive background */}
        <PremiumBackground />

        {/* Floating minimal navbar */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Hero — cinematic entry */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Divider */}
        <div className="section-divider max-w-6xl mx-auto" />

        {/* About — editorial split layout */}
        <About />

        <div className="section-divider max-w-6xl mx-auto" />

        {/* Experience — premium vertical timeline */}
        <Timeline />

        <div className="section-divider max-w-6xl mx-auto" />

        {/* Projects — product showcase */}
        <Projects />

        <div className="section-divider max-w-6xl mx-auto" />

        {/* Skills — elegant badge cloud */}
        <Skills />

        <div className="section-divider max-w-6xl mx-auto" />

        {/* Education & Certifications */}
        <Certifications />

        <div className="section-divider max-w-6xl mx-auto" />

        {/* GitHub Activity */}
        <GithubGrid />

        <div className="section-divider max-w-6xl mx-auto" />

        {/* Contact — premium form + cal.com */}
        <Contact />

        {/* Footer */}
        <Footer onOpenResume={() => setIsResumeOpen(true)} />

        {/* Resume modal — holographic CV viewer */}
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      </div>
    </SmoothScroll>
  );
}
