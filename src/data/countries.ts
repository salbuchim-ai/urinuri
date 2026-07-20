import type { StoryOption } from "@/types/story";

export const countries: StoryOption[] = [
  {
    id: "korea",
    title: "Korea",
    emoji: "🏯",
    description: "Palaces, mountain villages, and warm folktales.",
    iconBackground: "bg-rose-100",
    sceneClass: "from-rose-200 via-orange-100 to-emerald-100",
  },
  {
    id: "japan",
    title: "Japan",
    emoji: "🗻",
    description: "Cherry blossoms, lanterns, and magical legends.",
    iconBackground: "bg-pink-100",
    sceneClass: "from-pink-200 via-sky-100 to-emerald-100",
  },
  {
    id: "china",
    title: "China",
    emoji: "🐉",
    description: "Cloudy peaks, old villages, and dragon stories.",
    iconBackground: "bg-amber-100",
    sceneClass: "from-amber-200 via-yellow-100 to-emerald-100",
  },
];
