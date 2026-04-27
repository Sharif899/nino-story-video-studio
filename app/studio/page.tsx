"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  const [key, setKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("nino_api_key") || "";
    setHasKey(!!stored);
    setKey(stored);
  }, []);

  const handleSave = () => {
    localStorage.setItem("nino_api_key", key.trim());
    setHasKey(true);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    localStorage.removeItem("nino_api_key");
    setKey("");
    setHasKey(false);
  };

  return (
    <div style={{ padding: "32px 28px", maxWidth: "600px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#f1f0ff", marginBottom: "6px" }}>Settings</h2>
        <p style={{ fontSize: "13px", color: "#4a4a6a" }}>Configure your Anthropic API key for AI generation</p>
      </div>

      <div style={{
        background: "#0c0c12", border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "20px", padding: "28px",
        display: "flex", flexDirection: "column", gap: "20px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
          }}>🔑</div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#f1f0ff" }}>Anthropic API Key</div>
            <div style={{ fontSize: "11px", color: "#4a4a6a", marginTop: "2px" }}>
              Stored locally on your device only. Never sent to GitHub.
            </div>
          </div>
          {hasKey && (
            <div style={{
              marginLeft: "auto", fontSize: "11px", color: "#10b981",
              padding: "3px 10px", borderRadius: "20px",
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
            }}>✓ Active</div>
          )}
        </div>

        <input
          type="password"
          value={key}
          onChange={e => setKey(e.target.value)}
          placeholder="sk-ant-api03-..."
          style={{
            width: "100%", padding: "12px 16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", fontSize: "13px",
            color: "#f1f0ff", fontFamily: "'JetBrains Mono', monospace",
          }}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1, padding: "11px",
              background: saved ? "rgba(16,185,129,0.2)" : "linear-gradient(135deg, #7c3aed, #5b21b6)",
              color: saved ? "#10b981" : "white",
              border: saved ? "1px solid rgba(16,185,129,0.3)" : "none",
              borderRadius: "10px", fontSize: "13px", fontWeight: "700",
              cursor: "pointer", transition: "all 0.2s ease",
              fontFamily: "inherit",
            }}
          >
            {saved ? "✓ Saved!" : "Save API Key"}
          </button>
          {hasKey && (
            <button
              onClick={handleClear}
              style={{
                padding: "11px 20px",
                background: "rgba(244,63,94,0.1)",
                color: "#f43f5e",
                border: "1px solid rgba(244,63,94,0.2)",
                borderRadius: "10px", fontSize: "13px", fontWeight: "600",
                cursor: "pointer", fontFamily: "inherit",
              }}
            >Clear</button>
          )}
        </div>

        <div style={{
          padding: "12px 16px", borderRadius: "10px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
          fontSize: "12px", color: "#4a4a6a", lineHeight: "1.6",
        }}>
          Get your API key at <a href="https://console.anthropic.com/settings/keys" target="_blank" style={{ color: "#8b5cf6" }}>console.anthropic.com</a>
        </div>
      </div>
    </div>
  );
}