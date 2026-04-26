"use client";

import { Project } from "@/lib/types";
import Button from "@/components/ui/Button";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onSelect?: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
  onSelect,
}: ProjectCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-4 hover:border-[var(--border-2)] transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
          {project.logo ? (
            <img
              src={project.logo}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-violet-400">
              {project.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {project.name}
          </h3>
          {project.xHandle && (
            <p className="text-xs text-violet-400 truncate">{project.xHandle}</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
        {project.summary}
      </p>

      {/* Links */}
      <div className="flex gap-2 flex-wrap">
        {project.docsUrl && (
          
            href={project.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Docs
          </a>
        )}
        {project.githubUrl && (
          
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-muted)] hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
            GitHub
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-[var(--border)]">
        {onSelect && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onSelect(project)}
            className="flex-1"
          >
            Use in Studio
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onEdit(project)}
          className={onSelect ? "" : "flex-1"}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(project.id)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </Button>
      </div>
    </div>
  );
}