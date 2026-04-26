"use client";

import { useState, useRef } from "react";
import { Project } from "@/lib/types";
import { generateId, saveProject } from "@/lib/storage";
import Button from "@/components/ui/Button";
import Input, { Textarea } from "@/components/ui/Input";

interface ProjectFormProps {
  project?: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm({
  project,
  onSave,
  onCancel,
}: ProjectFormProps) {
  const [form, setForm] = useState({
    name: project?.name || "",
    docsUrl: project?.docsUrl || "",
    xHandle: project?.xHandle || "",
    githubUrl: project?.githubUrl || "",
    summary: project?.summary || "",
    notes: project?.notes || "",
    logo: project?.logo || null as string | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Project name is required";
    if (!form.summary.trim()) e.summary = "Summary is required";
    return e;
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((f) => ({ ...f, logo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const now = new Date().toISOString();
    const saved: Project = {
      id: project?.id || generateId(),
      name: form.name.trim(),
      logo: form.logo,
      docsUrl: form.docsUrl.trim(),
      xHandle: form.xHandle.trim(),
      githubUrl: form.githubUrl.trim(),
      summary: form.summary.trim(),
      notes: form.notes.trim(),
      createdAt: project?.createdAt || now,
      updatedAt: now,
    };

    saveProject(saved);
    onSave(saved);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Logo Upload */}
      <div className="flex items-center gap-4">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-16 h-16 rounded-xl border-2 border-dashed border-[var(--border)] flex items-center justify-center cursor-pointer hover:border-violet-500 transition-colors overflow-hidden bg-[var(--surface-2)]"
        >
          {form.logo ? (
            <img
              src={form.logo}
              alt="logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[var(--text-muted)]"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Project Logo
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Click to upload (PNG, JPG)
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>
      </div>

      {/* Fields */}
      <Input
        label="Project Name *"
        placeholder="e.g. Solana, Chainlink, Hyperliquid"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        error={errors.name}
      />

      <Input
        label="X Handle"
        placeholder="@projecthandle"
        value={form.xHandle}
        onChange={(e) => setForm((f) => ({ ...f, xHandle: e.target.value }))}
      />

      <Input
        label="Docs URL"
        placeholder="https://docs.project.xyz"
        value={form.docsUrl}
        onChange={(e) => setForm((f) => ({ ...f, docsUrl: e.target.value }))}
      />

      <Input
        label="GitHub URL"
        placeholder="https://github.com/project"
        value={form.githubUrl}
        onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
      />

      <Textarea
        label="Project Summary *"
        placeholder="Brief description of what this project does..."
        value={form.summary}
        onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))}
        error={errors.summary}
        rows={3}
      />

      <Textarea
        label="Custom Notes"
        placeholder="Any extra context, talking points, or style preferences..."
        value={form.notes}
        onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        rows={3}
      />

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          {project ? "Save Changes" : "Create Project"}
        </Button>
      </div>
    </div>
  );
}