import { ContentMode, SmartConfig } from "./types";

export function generateSmartConfig(mode: ContentMode): SmartConfig {
  switch (mode) {
    case "Dev Breakdown":
      return {
        storyStructure: "Problem → Code → Result → Impact",
        tone: "Technical, precise, minimal",
        visualStyle: "Code editor aesthetic, dark terminal, syntax highlighting",
        videoLength: "15–20 seconds",
        characterSetup: "No characters. Text + code overlays only",
      };

    case "Mini Movie":
      return {
        storyStructure: "Setup → Conflict → Resolution → Revelation",
        tone: "Cinematic, dramatic, emotional",
        visualStyle: "Cinematic widescreen, moody lighting, depth of field",
        videoLength: "20 seconds",
        characterSetup: "2 characters with distinct personalities and dialogue",
      };

    case "Explainer":
      return {
        storyStructure: "Hook → Context → Core Idea → Takeaway",
        tone: "Clear, confident, educational",
        visualStyle: "Clean motion graphics, structured text overlays",
        videoLength: "12–15 seconds",
        characterSetup: "Single voiceover narrator, no on-screen characters",
      };

    case "Insight":
      return {
        storyStructure: "Bold Statement → Evidence → Implication",
        tone: "Minimal, thought-provoking, sharp",
        visualStyle: "Text-only, high contrast, single color accent",
        videoLength: "8–12 seconds",
        characterSetup: "No characters. Pure text and data visuals",
      };

    case "Conversation":
      return {
        storyStructure: "Question → Debate → Agreement → CTA",
        tone: "Casual, engaging, relatable",
        visualStyle: "Split screen or alternating character shots",
        videoLength: "15–20 seconds",
        characterSetup: "2 characters: a skeptic and a believer in the topic",
      };

    case "Problem → Solution":
      return {
        storyStructure: "Pain Point → Struggle → Discovery → Solution → Result",
        tone: "Empathetic, motivational, clear",
        visualStyle: "Before/after contrast, warm to cool color shift",
        videoLength: "15–20 seconds",
        characterSetup: "Single protagonist experiencing and solving the problem",
      };

    default:
      return {
        storyStructure: "Hook → Core → Takeaway",
        tone: "Neutral, clear",
        visualStyle: "Clean and minimal",
        videoLength: "15 seconds",
        characterSetup: "No characters",
      };
  }
}