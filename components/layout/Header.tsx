"use client";

import { usePathname } from "next/navigation";

const pages: Record<string, { title: string; sub: string }> = {
  "/": { title: "Dashboard", sub: "Welcome to Nino Story Video Studio" },
  "/projects": { title: "Projects", sub: "Manage your crypto & AI projects" },
  "/studio": { title: "Video Studio", sub: "Generate AI video concepts and scripts" },
  "/settings": { title: "Settings", sub: "Configure your API key and preferences" },
};

export default function Header() {
  const pathname = usePathname();
  const page = pages[pathname] || pages["/"];

  return (
    <header style={{
      height: "64px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: "rgba(6,6,8,0.9)",
      backdropFilter: "blur(20px)",
      display: "flex",
      alignItems: "center",
      padding: "0 28px",
      gap: "16px",
      position: "sticky",
      top: 0,
      zIndex: 40,
    }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: "15px", fontWeight: "600", color: "#f1f0ff", lineHeight: 1.2 }}>
          {page.title}
        </h1>
        <p style={{ fontSize: "11px", color: "#4a4a6a", marginTop: "2px" }}>{page.sub}</p>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "6px 12px", borderRadius: "20px",
        background: "rgba(139,92,246,0.1)",
        border: "1px solid rgba(139,92,246,0.2)",
      }}>
        <div style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#8b5cf6", boxShadow: "0 0 8px #8b5cf6",
        }} />
        <span style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: "600" }}>Smart Mode ON</span>
      </div>
    </header>
  );
}