"use client";

import { useState } from "react";
import { Project, ContentMode, SmartConfig, GeneratedOutput } from "@/lib/types";
import { generateStudioOutput } from "@/lib/generate";
import { saveSession } from "@/lib/storage";
import StudioForm from "@/components/studio/StudioForm";
import OutputPanel from "@/components/studio/OutputPanel";

export default function StudioPage() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<GeneratedOutput | null>(null);
  const [currentMode, setCurrentMode] = useState<ContentMode>("Explainer");
  const [currentConfig, setCurrentConfig] = useState<SmartConfig>({
    storyStructure: "", tone: "", visualStyle: "", videoLength: "", characterSetup: ""
  });
  const [error, setError] = useState("");

  const handleGenerate = async (project: Project, topic: string, mode: ContentMode, config: SmartConfig) => {
    setLoading(true);
    setError("");
    setOutput(null);
    setCurrentMode(mode);
    setCurrentConfig(config);
    try {
      const result = await generateStudioOutput(project, topic, mode, config);
      setOutput(result);
      saveSession({ projectId: project.id, topic, mode, smartConfig: config, output: result, createdAt: new Date().toISOString() });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "32px 28px" }}>
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#f1f0ff", marginBottom: "6px" }}>Video Studio</h2>
        <p style={{ fontSize: "13px", color: "#4a4a6a" }}>Configure your concept and generate AI-powered video content</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "420px 1fr", gap: "24px", alignItems: "start" }}>
        {/* Left - Form */}
        <div style={{
          background: "#0c0c12", border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "20px", padding: "24px",
          position: "sticky", top: "80px",
        }}>
          <StudioForm onGenerate={handleGenerate} loading={loading} />
        </div>

        {/* Right - Output */}
        <div>
          {loading && (
            <div style={{
              background: "#0c0c12", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "60px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
            }}>
              <div style={{ position: "relative", width: "48px", height: "48px" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(139,92,246,0.2)" }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid transparent", borderTopColor: "#8b5cf6", animation: "spin 0.8s linear infinite" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#f1f0ff", marginBottom: "4px" }}>Generating your concept...</div>
                <div style={{ fontSize: "12px", color: "#4a4a6a" }}>Claude is crafting your video story</div>
              </div>
              <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {error && !loading && (
            <div style={{
              background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.2)",
              borderRadius: "20px", padding: "24px", textAlign: "center",
              fontSize: "13px", color: "#f43f5e",
            }}>{error}</div>
          )}

          {output && !loading && (
            <div style={{
              background: "#0c0c12", border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "24px",
            }}>
              <OutputPanel output={output} mode={currentMode} smartConfig={currentConfig} />
            </div>
          )}

          {!output && !loading && !error && (
            <div style={{
              background: "#0c0c12", border: "1px dashed rgba(139,92,246,0.2)",
              borderRadius: "20px", padding: "80px 24px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center",
            }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "18px",
                background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px", color: "#8b5cf6",
              }}>⬡</div>
              <div>
                <div style={{ fontSize: "15px", fontWeight: "600", color: "#f1f0ff", marginBottom: "6px" }}>Output appears here</div>
                <div style={{ fontSize: "13px", color: "#4a4a6a" }}>Fill in the form and click Generate</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}