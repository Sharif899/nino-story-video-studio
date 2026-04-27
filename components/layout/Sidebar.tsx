"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  {
    href: "/",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Projects",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
      </svg>
    ),
  },
  {
    href: "/studio",
    label: "Video Studio",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: "240px",
      minHeight: "100vh",
      position: "fixed",
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 50,
      display: "flex",
      flexDirection: "column",
      background: "rgba(8,8,14,0.97)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
      backdropFilter: "blur(20px)",
    }}>
      {/* Glow orb */}
      <div style={{
        position: "absolute",
        top: "-80px",
        left: "-80px",
        width: "250px",
        height: "250px",
        background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Logo */}
      <div style={{
        padding: "22px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "16px",
          color: "white",
          boxShadow: "0 4px 16px rgba(124,58,237,0.5)",
          flexShrink: 0,
        }}>N</div>
        <div>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#f1f0ff", lineHeight: 1.2 }}>
            Nino Studio
          </div>
          <div style={{ fontSize: "11px", color: "#4a4a6a", marginTop: "2px" }}>
            Video Generator
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{
        flex: 1,
        padding: "14px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        position: "relative",
        zIndex: 1,
      }}>
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                background: active ? "rgba(139,92,246,0.15)" : "transparent",
                color: active ? "#a78bfa" : "#5a5a7a",
                border: active ? "1px solid rgba(139,92,246,0.25)" : "1px solid transparent",
                boxShadow: active ? "0 0 20px rgba(139,92,246,0.08)" : "none",
                textDecoration: "none",
              }}
            >
              {item.icon}
              {item.label}
              {active && (
                <div style={{
                  marginLeft: "auto",
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#8b5cf6",
                  boxShadow: "0 0 8px #8b5cf6",
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{
        padding: "12px 10px",
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: "10px",
          background: "rgba(139,92,246,0.07)",
          border: "1px solid rgba(139,92,246,0.15)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "10px",
        }}>
          <div style={{
            width: "6px", height: "6px", borderRadius: "50%",
            background: "#8b5cf6",
            boxShadow: "0 0 8px #8b5cf6",
            flexShrink: 0,
            animation: "pulse-dot 1.5s ease-in-out infinite",
          }} />
          <span style={{ fontSize: "11px", color: "#8b5cf6", fontWeight: "600" }}>
            Smart Mode Active
          </span>
        </div>
        <div style={{ fontSize: "11px", color: "#3a3a5a", textAlign: "center" }}>
          made by Nino ✦
        </div>
      </div>
    </aside>
  );
}