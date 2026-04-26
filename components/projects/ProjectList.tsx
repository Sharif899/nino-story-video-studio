"use client";

import { useState, useEffect } from "react";
import { Project } from "@/lib/types";
import { getProjects, deleteProject } from "@/lib/storage";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface ProjectListProps {
  onSelect?: (project: Project) => void;
  showSelectButton?: boolean;
}

export default function ProjectList({
  onSelect,
  showSelectButton = false,
}: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleSave = (project: Project) => {
    setProjects(getProjects());
    setModalOpen(false);
    setEditingProject(undefined);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteProject(deleteConfirm);
      setProjects(getProjects());
      setDeleteConfirm(null);
    }
  };

  const handleNewProject = () => {
    setEditingProject(undefined);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--text-muted)]">
            {projects.length} project{projects.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        <Button onClick={handleNewProject}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New Project
        </Button>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center">
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
              className="text-[var(--text-muted)]"
            >
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              No projects yet
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Create your first project to get started
            </p>
          </div>
          <Button onClick={handleNewProject}>Create First Project</Button>
        </div>
      )}

      {/* Grid */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={showSelectButton ? onSelect : undefined}
            />
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProject(undefined);
        }}
        title={editingProject ? "Edit Project" : "New Project"}
        size="lg"
      >
        <ProjectForm
          project={editingProject}
          onSave={handleSave}
          onCancel={() => {
            setModalOpen(false);
            setEditingProject(undefined);
          }}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Project"
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            Are you sure you want to delete this project? This action cannot be
            undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDelete}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}