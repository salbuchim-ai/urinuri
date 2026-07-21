import type { StoryOption } from "@/types/story";

export const lengths: StoryOption[] = [
  {
    id: "short",
    title: "Short Story",
    description: "About 800 words",
    iconBackground: "bg-pink-100",
    iconSrc: "/generated/ui/short-story.png",
  },
  {
    id: "long",
    title: "Long Story",
    description: "About 3,000 words in the full version",
    iconBackground: "bg-emerald-100",
    iconSrc: "/generated/ui/long-story.png",
  },
  {
    id: "series",
    title: "Story Series",
    description: "Choose the next episode after each chapter",
    iconBackground: "bg-yellow-100",
    iconSrc: "/generated/ui/story-series.png",
  },
];
