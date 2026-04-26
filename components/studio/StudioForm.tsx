"use client";

import { useState, useEffect } from "react";
import { Project, ContentMode, SmartConfig } from "@/lib/types";
import { getProjects } from "@/lib/storage";
import { generateSmartConfig } from "@/lib/smartMode";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const CONTENT_MODES: ContentMode[] = [
  "Explainer",
  "Conversation",
  "Insight",
  "Mini Movie",
  "Problem → Solution",
  "Dev Breakdown",
];

interface StudioFormProps {
  onGenerate: (
    project: Project,
    topic: string,
    mode: ContentMode,
    smartConfig: SmartConfig
  ) => void;
  loading: boolean;
  initialProjectId?: string;
}

export default function StudioForm({
  onGenerate,
  loading,
  initialProjectId,
}: StudioFormProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState(
    initialProjectId || ""
  );
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState<ContentMode>("Explainer");
  const [smartConfig, setSmartConfig] = useState<SmartConfig>(
    generateSmartConfig("Explainer")
  );
  const [smartMode, setSmartMode] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  useEffect(() => {
    if (smartMode) {
      setSmartConfig(generateSmartConfig(mode));
    }
  }, [mode, smartMode]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleGenerate = () => {
    if (!selectedProject) {
      setError("Please select a project");
      return;
    }
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }
    setError("");
    onGenerate(selectedProject, topic, mode, smartConfig);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Project Select */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          Select Project
        </label>
        {projects.length === 0 ? (
          <div className="p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-center">
            <p className="text-sm text-[var(--text-muted)]">
              No projects yet.{" "}
              <a href="/projects" className="text-violet-400 hover:underline">
                Create one first
              </a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-200
                  ${
                    selectedProjectId === project.id
                      ? "border-violet-500 bg-violet-600/10"
                      : "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-2)]"
                  }
                `}
              >
                <div className="w-8 h-8 rounded-md overflow-hidden bg-[var(--surface-3)] flex items-center justify-center flex-shrink-0">
                  {project.logo ? (
                    <img
                      src={project.logo}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-violet-400">
                      {project.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {project.name}
                  </p>
                  {project.xHandle && (
                    <p className="text-xs text-[var(--text-muted)] truncate">
                      {project.xHandle}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Topic */}
      <Input
        label="Video Topic"
        placeholder="e.g. How Solana achieves 65k TPS, Why DeFi is the future..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      {/* Content Mode */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          Content Mode
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CONTENT_MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`
                px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 text-left
                ${
                  mode === m
                    ? "border-violet-500 bg-violet-600/10 text-violet-400"
                    : "border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-secondary)] hover:border-[var(--border-2)] hover:text-[var(--text-primary)]"
                }
              `}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Smart Mode Toggle */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]">
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Smart Mode
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Auto-configure story structure, tone & visuals
          </p>
        </div>
        <button
          onClick={() => setSmartMode(!smartMode)}
          className={`
            relative w-11 h-6 rounded-full transition-colors duration-200
            ${smartMode ? "bg-violet-600" : "bg-[var(--surface-3)]"}
          `}
        >
          <span
            className={`
              absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
              ${smartMode ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </button>
      </div>

      {/* Smart Config Preview */}
      {smartMode && (
        <div className="flex flex-col gap-2 p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--border)]">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
            Smart Config — {mode}
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {Object.entries(smartConfig).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="text-xs text-[var(--text-muted)] w-32 flex-shrink-0 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        loading={loading}
        size="lg"
        className="w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        Generate Video Concept
      </Button>
    </div>
  );
}