"use client";

import { Project } from "@/lib/types";
import Button from "@/components/ui/Button";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onSelect?: (project: Project) => void;
}

export default function ProjectCard({ project, onEdit, onDelete, onSelect }: ProjectCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-4 hover:border-[var(--border-2)] transition-all duration-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
          {project.logo ? (
            <img src={project.logo} alt={project.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-bold text-violet-400">{project.name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">{project.name}</h3>
          {project.xHandle && <p className="text-xs text-violet-400 truncate">{project.xHandle}</p>}
        </div>
      </div>
      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">{project.summary}</p>
      <div className="flex gap-2 flex-wrap">
        {project.docsUrl && (
          <a href={project.docsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-violet-400 transition-colors">Docs</a>
        )}
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--text-muted)] hover:text-violet-400 transition-colors">GitHub</a>
        )}
      </div>
      <div className="flex gap-2 pt-1 border-t border-[var(--border)]">
        {onSelect && (
          <Button variant="primary" size="sm" onClick={() => onSelect(project)} className="flex-1">Use in Studio</Button>
        )}
        <Button variant="secondary" size="sm" onClick={() => onEdit(project)} className={onSelect ? "" : "flex-1"}>Edit</Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(project.id)}>Del</Button>
      </div>
    </div>
  );
}
