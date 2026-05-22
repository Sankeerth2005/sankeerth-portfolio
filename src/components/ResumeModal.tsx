"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Printer, X, FileText, Loader2 } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html2pdfModule = await import(/* webpackIgnore: false */ "html2pdf.js");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const html2pdf = (html2pdfModule as any).default ?? html2pdfModule;
      const opt = {
        margin: [8, 8, 8, 8],
        filename: "Sai_Sankeerth_Anchuru_Resume.pdf",
        image: { type: "jpeg", quality: 0.99 },
        html2canvas: {
          scale: 2.5,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      await html2pdf().set(opt).from(resumeRef.current).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setIsDownloading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="relative w-full max-w-3xl glass-elevated rounded-2xl overflow-hidden flex flex-col z-10 max-h-[90vh] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.07] shrink-0 bg-[#0a0a12]/80">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center">
                  <FileText size={14} className="text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Sai Sankeerth Anchuru</p>
                  <p className="text-[10px] text-zinc-600">AI & ML Engineer · Backend Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-black text-xs font-bold rounded-xl cursor-pointer transition-colors btn-shimmer"
                >
                  {isDownloading ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Download size={12} />
                  )}
                  {isDownloading ? "Generating…" : "Download PDF"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-2 glass glass-hover rounded-xl text-xs font-medium text-zinc-400 hover:text-white cursor-pointer btn-shimmer"
                >
                  <Printer size={12} />
                  Print
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 text-zinc-600 hover:text-white cursor-pointer rounded-lg hover:bg-white/[0.05]"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Resume */}
            <div className="flex-1 overflow-y-auto bg-zinc-100">
              {/* A4 Resume content — white background for PDF fidelity */}
              <div
                ref={resumeRef}
                id="resume-print-area"
                className="resume-sheet bg-white text-gray-900 mx-auto"
                style={{
                  width: "210mm",
                  minHeight: "297mm",
                  padding: "16mm 16mm 14mm 16mm",
                  fontFamily: "'Arial', 'Helvetica', sans-serif",
                  fontSize: "9.5pt",
                  lineHeight: "1.4",
                  color: "#1a1a1a",
                }}
              >
                {/* ── Name & Contact ── */}
                <div style={{ textAlign: "center", marginBottom: "10px" }}>
                  <h1 style={{ fontSize: "20pt", fontWeight: 800, letterSpacing: "1px", margin: 0, color: "#111" }}>
                    SAI SANKEERTH ANCHURU
                  </h1>
                  <p style={{ fontSize: "8.5pt", color: "#444", margin: "4px 0 0" }}>
                    +91 6305250039 · anchurusaisankeerth@gmail.com
                  </p>
                  <p style={{ fontSize: "8.5pt", color: "#444", margin: "2px 0 0" }}>
                    linkedin.com/in/saisankeerthanchuru · github.com/Sankeerth2005 · Hyderabad, India
                  </p>
                </div>

                <hr style={{ border: "none", borderTop: "1.5px solid #222", margin: "8px 0 7px" }} />

                {/* ── Summary ── */}
                <SectionHeading>SUMMARY</SectionHeading>
                <p style={{ margin: "3px 0 8px", color: "#333", fontSize: "9pt" }}>
                  Computer Science graduate (AI &amp; ML, May 2026) with hands-on internship experience in
                  backend development, REST APIs, and cloud infrastructure. Built and shipped .NET/Java services
                  on enterprise applications serving 100K+ users, maintained AWS-based CI/CD pipelines, and
                  developed full-stack SaaS projects. Looking to contribute as a Software Engineer or Backend Developer.
                </p>

                {/* ── Experience ── */}
                <SectionHeading>EXPERIENCE</SectionHeading>

                <JobEntry
                  role="Associate Software Engineer Intern"
                  company="Mphasis"
                  location="Bengaluru"
                  period="Jan 2026 – Apr 2026"
                  bullets={[
                    "Developed backend services and REST APIs in C# and .NET for enterprise applications supporting 100,000+ users.",
                    "Reduced API response latency by 25% through pipeline and query optimisations; resolved 10+ production-level defects.",
                    "Applied OOP and scalable backend design principles; collaborated via Git, code reviews, and Agile sprint delivery.",
                  ]}
                />

                <JobEntry
                  role="DevOps Intern"
                  company="Mroads"
                  location="Hyderabad"
                  period="Oct 2025 – Jan 2026"
                  bullets={[
                    "Managed AWS infrastructure (EC2, S3, IAM) and Linux environments across production-grade applications.",
                    "Built and maintained CI/CD pipelines using Bash and Python scripts, reducing manual deployment effort by 30%.",
                    "Containerised workloads with Docker; implemented DevSecOps practices for secure and compliant deployments.",
                  ]}
                />

                {/* ── Projects ── */}
                <SectionHeading>PROJECTS</SectionHeading>

                <ProjectEntry
                  name="DukaanLedger — Multi-Tenant SaaS Retail Platform"
                  tech="React.js · Spring Boot · REST APIs · PostgreSQL · AWS"
                  bullets={[
                    "Built a SaaS retail management platform with inventory, billing, and analytics modules on AWS.",
                    "Implemented RBAC, multi-tenant data isolation, and modular microservices backend with PostgreSQL.",
                  ]}
                />

                <ProjectEntry
                  name="AI-Based Auto Text Rewriter"
                  tech="Python · GPT API · Docker · AWS"
                  bullets={[
                    "Built a Python automation tool using GPT API for context-aware text rewriting and summarisation at scale.",
                    "Deployed on AWS via Docker with a modular architecture supporting plug-in replacement of AI model backends.",
                  ]}
                />

                <ProjectEntry
                  name="AI-Driven Blockchain Performance Optimisation"
                  tech="Python · Machine Learning · Data Analysis"
                  bullets={[
                    "Built Python ML models to analyse blockchain transaction datasets and identify throughput bottlenecks.",
                    "Applied data-driven optimisation strategies that improved transaction scalability and system efficiency.",
                  ]}
                />

                {/* ── Technical Skills ── */}
                <SectionHeading>TECHNICAL SKILLS</SectionHeading>
                <div style={{ margin: "3px 0 8px" }}>
                  {[
                    ["Languages", "Python, C#, Java, JavaScript, SQL"],
                    ["Backend", ".NET, REST APIs, Spring Boot, Node.js, Express.js, Microservices"],
                    ["Frontend", "React.js, Angular, HTML, CSS"],
                    ["Databases", "PostgreSQL, MongoDB"],
                    ["Cloud & DevOps", "AWS (EC2, S3, IAM), Docker, CI/CD Pipelines, Linux, Bash"],
                    ["Core CS", "Data Structures & Algorithms, OOP, DBMS, Operating Systems, System Design"],
                    ["Tools", "Git, GitHub, Postman, Jira"],
                  ].map(([cat, val]) => (
                    <p key={cat} style={{ margin: "2px 0", fontSize: "9pt", color: "#333" }}>
                      <strong style={{ color: "#111" }}>{cat}:</strong> {val}
                    </p>
                  ))}
                </div>

                {/* ── Certifications ── */}
                <SectionHeading>CERTIFICATIONS</SectionHeading>
                <ul style={{ margin: "3px 0 8px", paddingLeft: "14px" }}>
                  {[
                    "Oracle Cloud Infrastructure Foundations Associate",
                    "Salesforce Agentforce Specialist — AI-powered agent workflows and automation",
                    "SAP Business Data Cloud",
                    "AI Fluency: Frameworks & Foundations — Anthropic",
                  ].map((c) => (
                    <li key={c} style={{ margin: "2px 0", fontSize: "9pt", color: "#333" }}>
                      {c}
                    </li>
                  ))}
                </ul>

                {/* ── Education ── */}
                <SectionHeading>EDUCATION</SectionHeading>
                <div style={{ margin: "3px 0 8px" }}>
                  <p style={{ margin: 0, fontSize: "9.5pt" }}>
                    <strong>B.E. Computer Science (AI &amp; ML)</strong>
                    <span style={{ color: "#555", fontWeight: 400 }}>
                      {" "}· Sreyas Institute of Engineering and Technology, Hyderabad
                      {" "}| May 2026 | CGPA: 8.51 / 10
                    </span>
                  </p>
                </div>

                {/* ── Achievements ── */}
                <SectionHeading>ACHIEVEMENTS &amp; LEADERSHIP</SectionHeading>
                <ul style={{ margin: "3px 0", paddingLeft: "14px" }}>
                  {[
                    "1st Prize — Research Paper Presentation (2025): Presented AI-based optimisation research to an industry and academic panel.",
                    "2nd Prize — Robotics Challenge, IIT Mumbai: Demonstrated rapid prototyping under competition conditions.",
                    "Student Council Lead — Organised technical events with 300+ participants; coordinated teams and logistics end-to-end.",
                  ].map((a) => (
                    <li key={a} style={{ margin: "2px 0", fontSize: "9pt", color: "#333" }}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── Helper sub-components (rendered inside the white resume area) ── */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h2 style={{
        fontSize: "9.5pt",
        fontWeight: 700,
        letterSpacing: "0.8px",
        margin: "0 0 2px",
        color: "#111",
        textTransform: "uppercase" as const,
      }}>
        {children}
      </h2>
      <hr style={{ border: "none", borderTop: "1px solid #ccc", margin: "0 0 4px" }} />
    </>
  );
}

function JobEntry({
  role, company, location, period, bullets,
}: {
  role: string; company: string; location: string; period: string; bullets: string[];
}) {
  return (
    <div style={{ marginBottom: "7px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: "9.5pt", color: "#111" }}>
          {role}{" "}
          <span style={{ fontWeight: 400, color: "#555" }}>
            {company} · {location}
          </span>
        </p>
        <span style={{ fontSize: "8.5pt", color: "#666", whiteSpace: "nowrap" as const, marginLeft: "8px" }}>
          {period}
        </span>
      </div>
      <ul style={{ margin: "3px 0 0", paddingLeft: "14px" }}>
        {bullets.map((b) => (
          <li key={b} style={{ fontSize: "9pt", color: "#333", margin: "2px 0" }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectEntry({
  name, tech, bullets,
}: {
  name: string; tech: string; bullets: string[];
}) {
  return (
    <div style={{ marginBottom: "6px" }}>
      <p style={{ margin: 0, fontSize: "9.5pt" }}>
        <strong style={{ color: "#111" }}>{name}</strong>
        <span style={{ color: "#666", fontSize: "8.5pt" }}> {tech}</span>
      </p>
      <ul style={{ margin: "2px 0 0", paddingLeft: "14px" }}>
        {bullets.map((b) => (
          <li key={b} style={{ fontSize: "9pt", color: "#333", margin: "1.5px 0" }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
