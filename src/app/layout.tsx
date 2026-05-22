import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Sankeerth Anchuru — AI Engineer & Backend Developer",
  description:
    "Portfolio of Sai Sankeerth Anchuru — AI & Python Engineer, .NET Backend Developer, Cloud & DevOps Specialist. Building intelligent systems, scalable APIs, and automated cloud pipelines.",
  keywords:
    "Sai Sankeerth Anchuru, AI Engineer, Python Developer, .NET Developer, Backend Engineer, Cloud DevOps, Portfolio, Hyderabad, India, Mphasis, Mroads",
  authors: [{ name: "Sai Sankeerth Anchuru" }],
  openGraph: {
    title: "Sai Sankeerth Anchuru — AI Engineer & Backend Developer",
    description:
      "Next-generation developer portfolio — AI, .NET backend, cloud infrastructure, and intelligent automation.",
    type: "website",
    locale: "en_US",
    siteName: "Sai Sankeerth Anchuru",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Sankeerth Anchuru — AI Engineer & Backend Developer",
    description:
      "Next-generation developer portfolio — AI, .NET backend, cloud infrastructure, and intelligent automation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="bg-[#050505] text-[#fafafa] font-sans selection:bg-emerald-500/20 selection:text-emerald-400 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
