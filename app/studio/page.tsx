"use client";

import { useState } from "react";
import { Project, ContentMode, SmartConfig, GeneratedOutput } from "@/lib/types";
import { generateStudioOutput } from "@/lib/generate";
import { saveSession } from "@/lib/storage";
import { generateId } from "@/lib/storage";
import StudioForm from "@/components/studio/StudioForm";
import OutputPanel from "@/components/studio/OutputPanel";

export default function StudioPage() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<GeneratedOutput | null>(null);
  const [currentMode, setCurrentMode] = useState<ContentMode>("Explainer");
  const [currentSmartConfig, setCurrentSmartConfig] = useState<SmartConfig>({
    storyStructure: "",
    tone: "",
    visualStyle: "",
    videoLength: "",
    characterSetup: "",
  });
  const [error, setError] = useState("");

  const handleGenerate = async (
    project: Project,
    topic: string,
    mode: ContentMode,
    smartConfig: SmartConfig
  ) => {
    setLoading(true);
    setError("");
    setOutput(null);
    setCurrentMode(mode);
    setCurrentSmartConfig(smartConfig);

    try {
      const result = await generateStudioOutput(
        project,
        topic,
        mode,
        smartConfig
      );
      setOutput(result);

      saveSession({
        projectId: project.id,
        topic,
        mode,
        smartConfig,
        output: result,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left — Form */}
          <div className="flex flex-col gap-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
              <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                Video Studio
              </h2>
              <p className="text-xs text-[var(--text-muted)] mb-6">
                Configure your video concept and generate AI-powered content
              </p>
              <StudioForm
                onGenerate={handleGenerate}
                loading={loading}
              />
            </div>
          </div>

          {/* Right — Output */}
          <div className="flex flex-col gap-4">
            {loading && (
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-12 flex flex-col items-center justify-center gap-4">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full border-2 border-violet-600/20" />
                  <div className="absolute inset-0 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Generating your video concept...
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    This takes a few seconds
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            {output && !loading && (
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6">
                <OutputPanel
                  output={output}
                  mode={currentMode}
                  smartConfig={currentSmartConfig}
                />
              </div>
            )}

            {!output && !loading && !error && (
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-12 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-violet-600/10 border border-violet-600/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-violet-400"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Your output will appear here
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Fill in the form and click Generate
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}