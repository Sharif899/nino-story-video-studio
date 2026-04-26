import ProjectList from "@/components/projects/ProjectList";

export default function ProjectsPage() {
  return (
    <div className="p-6">
      <ProjectList showSelectButton={false} />
    </div>
  );
}