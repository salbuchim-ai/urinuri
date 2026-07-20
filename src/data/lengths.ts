import type { StoryOption } from "@/types/story";

export const lengths: StoryOption[] = [
  {
    id: "short",
    title: "Short Story",
    emoji: "📖",
    description: "About 800 words for a quick adventure.",
    iconBackground: "bg-lime-100",
  },
  {
    id: "long",
    title: "Long Story",
    emoji: "📚",
    description: "About 3,000 words for a deeper journey.",
    iconBackground: "bg-emerald-100",
  },
  {
    id: "series",
    title: "Story Series",
    emoji: "🌟",
    description: "Continue the story for as long as you like.",
    iconBackground: "bg-amber-100",
  },
];
