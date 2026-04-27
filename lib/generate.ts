import { ContentMode, GeneratedOutput, Project, SmartConfig } from "./types";

function getApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("nino_api_key") || "";
}

export async function generateStudioOutput(
  project: Project,
  topic: string,
  mode: ContentMode,
  smartConfig: SmartConfig
): Promise<GeneratedOutput> {
  const apiKey = getApiKey();

  if (!apiKey) {
    throw new Error("No API key found. Go to Settings and add your Anthropic API key.");
  }

  const prompt = buildPrompt(project, topic, mode, smartConfig);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content
    .map((c: { type: string; text?: string }) => c.type === "text" ? c.text : "")
    .join("");

  return parseOutput(text);
}

function buildPrompt(
  project: Project,
  topic: string,
  mode: ContentMode,
  smartConfig: SmartConfig
): string {
  return `You are Nino, an AI video concept generator for crypto and AI projects.

PROJECT DETAILS:
- Name: ${project.name}
- X Handle: ${project.xHandle}
- Summary: ${project.summary}
- Docs: ${project.docsUrl}
- GitHub: ${project.githubUrl}
- Notes: ${project.notes}

VIDEO REQUEST:
- Topic: ${topic}
- Content Mode: ${mode}

SMART MODE CONFIG:
- Story Structure: ${smartConfig.storyStructure}
- Tone: ${smartConfig.tone}
- Visual Style: ${smartConfig.visualStyle}
- Video Length: ${smartConfig.videoLength}
- Character Setup: ${smartConfig.characterSetup}

Generate a complete video concept. Return ONLY this exact format:

[STORY CONCEPT]
Write 2-3 sentences describing the core story concept.

[AI VIDEO PROMPT]
Write a detailed AI video generation prompt for tools like Runway, Kling, or Sora.

[SCRIPT]
Write the full voiceover or dialogue script. Keep within video length.

[X CAPTION]
Write an engaging X caption with relevant hashtags. Max 280 characters.

[LOGO PLACEMENT]
Describe exactly where and how the project logo should appear.

[WATERMARK]
Describe the "made by Nino" watermark placement and style.`;
}

function parseOutput(text: string): GeneratedOutput {
  const extract = (tag: string): string => {
    const regex = new RegExp(`\\[${tag}\\]\\s*([\\s\\S]*?)(?=\\[|$)`, "i");
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

  return {
    storyConcept: extract("STORY CONCEPT"),
    aiVideoPrompt: extract("AI VIDEO PROMPT"),
    script: extract("SCRIPT"),
    xCaption: extract("X CAPTION"),
    logoPlacement: extract("LOGO PLACEMENT"),
    watermark: extract("WATERMARK"),
  };
}