"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Dashboard",
    description: "Welcome to Nino Story Video Studio",
  },
  "/projects": {
    title: "Projects",
    description: "Manage your crypto and AI projects",
  },
  "/studio": {
    title: "Video Studio",
    description: "Generate AI video concepts and scripts",
  },
};

export default function Header() {
  const pathname = usePathname();
  const page = pageTitles[pathname] || pageTitles["/"];

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--surface)] flex items-center px-6 gap-4">
      <div className="flex-1">
        <h1 className="text-base font-semibold text-[var(--text-primary)]">
          {page.title}
        </h1>
        <p className="text-xs text-[var(--text-muted)]">{page.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-600/10 border border-violet-600/20">
          <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span className="text-xs text-violet-400 font-medium">
            Smart Mode ON
          </span>
        </div>
      </div>
    </header>
  );
}