import { Project, StudioSession } from "./types";

const PROJECTS_KEY = "nino_projects";
const SESSIONS_KEY = "nino_sessions";

export function getProjects(): Project[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(PROJECTS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProject(project: Project): void {
  const projects = getProjects();
  const existing = projects.findIndex((p) => p.id === project.id);
  if (existing >= 0) {
    projects[existing] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getProjectById(id: string): Project | null {
  return getProjects().find((p) => p.id === id) || null;
}

export function getSessions(): StudioSession[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(SESSIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveSession(session: StudioSession): void {
  const sessions = getSessions();
  sessions.unshift(session);
  const trimmed = sessions.slice(0, 50);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(trimmed));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}