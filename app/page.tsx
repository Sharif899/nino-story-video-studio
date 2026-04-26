"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, getSessions } from "@/lib/storage";
import { Project, StudioSession } from "@/lib/types";

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-violet-600/10 border border-violet-600/20 flex items-center justify-center text-violet-400">
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
        <p className="text-xs text-[var(--text-muted)]">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sessions, setSessions] = useState<StudioSession[]>([]);

  useEffect(() => {
    setProjects(getProjects());
    setSessions(getSessions());
  }, []);

  const recentSessions = sessions.slice(0, 5);

  return (
    <div className="p-6 flex flex-col gap-8 max-w-7xl mx-auto">
      {/* Welcome */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome to Nino Studio ✦
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Generate AI video concepts for crypto and AI projects on X
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Projects"
          value={projects.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
            </svg>
          }
        />
        <StatCard
          label="Videos Generated"
          value={sessions.length}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
          }
        />
        <StatCard
          label="Smart Mode"
          value="ON"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/projects"
            className="flex items-center gap-4 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-violet-500/50 hover:bg-violet-600/5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                New Project
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Add a crypto or AI project
              </p>
            </div>
          </Link>

          <Link
            href="/studio"
            className="flex items-center gap-4 p-5 bg-[var(--surface)] border border-[var(--border)] rounded-xl hover:border-violet-500/50 hover:bg-violet-600/5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">
                Generate Video
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                Create AI video concepts
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
            Recent Generations
          </h2>
          <div className="flex flex-col gap-2">
            {recentSessions.map((session, i) => {
              const project = projects.find(
                (p) => p.id === session.projectId
              );
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl"
                >
                  <div className="w-8 h-8 rounded-md overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                    {project?.logo ? (
                      <img
                        src={project.logo}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-violet-400">
                        {project?.name?.charAt(0).toUpperCase() || "?"}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                      {session.topic}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {project?.name} · {session.mode}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}