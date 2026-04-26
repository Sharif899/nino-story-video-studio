"use client";

import { GeneratedOutput, ContentMode, SmartConfig } from "@/lib/types";
import CopyButton from "@/components/ui/CopyButton";

interface OutputPanelProps {
  output: GeneratedOutput;
  mode: ContentMode;
  smartConfig: SmartConfig;
}

interface OutputSectionProps {
  title: string;
  content: string;
  accent?: boolean;
}

function OutputSection({ title, content, accent }: OutputSectionProps) {
  return (
    <div
      className={`
        flex flex-col gap-3 p-4 rounded-xl border transition-all duration-200
        ${accent
          ? "bg-violet-600/5 border-violet-600/20"
          : "bg-[var(--surface-2)] border-[var(--border)]"
        }
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          {title}
        </h3>
        <CopyButton text={content} />
      </div>
      <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}

export default function OutputPanel({
  output,
  mode,
  smartConfig,
}: OutputPanelProps) {
  const fullOutput = `
=== STORY CONCEPT ===
${output.storyConcept}

=== AI VIDEO PROMPT ===
${output.aiVideoPrompt}

=== SCRIPT ===
${output.script}

=== X CAPTION ===
${output.xCaption}

=== LOGO PLACEMENT ===
${output.logoPlacement}

=== WATERMARK ===
${output.watermark}
  `.trim();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-[var(--text-primary)]">
            Generated Output
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {mode} · {smartConfig.videoLength}
          </p>
        </div>
        <CopyButton text={fullOutput} />
      </div>

      {/* Smart Config Badge */}
      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 rounded-md bg-[var(--surface-3)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
          🎨 {smartConfig.visualStyle.split(",")[0]}
        </span>
        <span className="px-2 py-1 rounded-md bg-[var(--surface-3)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
          🎭 {smartConfig.tone.split(",")[0]}
        </span>
        <span className="px-2 py-1 rounded-md bg-[var(--surface-3)] border border-[var(--border)] text-xs text-[var(--text-muted)]">
          ⏱ {smartConfig.videoLength}
        </span>
      </div>

      {/* Output Sections */}
      <OutputSection
        title="Story Concept"
        content={output.storyConcept}
        accent
      />
      <OutputSection
        title="AI Video Prompt"
        content={output.aiVideoPrompt}
      />
      <OutputSection
        title="Script"
        content={output.script}
        accent
      />
      <OutputSection
        title="X Caption"
        content={output.xCaption}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <OutputSection
          title="Logo Placement"
          content={output.logoPlacement}
        />
        <OutputSection
          title="Watermark"
          content={output.watermark}
        />
      </div>
    </div>
  );
}