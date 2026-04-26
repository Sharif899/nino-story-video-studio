export type ContentMode =
  | "Explainer"
  | "Conversation"
  | "Insight"
  | "Mini Movie"
  | "Problem → Solution"
  | "Dev Breakdown";

export interface Project {
  id: string;
  name: string;
  logo: string | null;
  docsUrl: string;
  xHandle: string;
  githubUrl: string;
  summary: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SmartConfig {
  storyStructure: string;
  tone: string;
  visualStyle: string;
  videoLength: string;
  characterSetup: string;
}

export interface GeneratedOutput {
  storyConcept: string;
  aiVideoPrompt: string;
  script: string;
  xCaption: string;
  logoPlacement: string;
  watermark: string;
}

export interface StudioSession {
  projectId: string;
  topic: string;
  mode: ContentMode;
  smartConfig: SmartConfig;
  output: GeneratedOutput;
  createdAt: string;
}