import type { StoryOption } from "@/types/story";

export const countries: StoryOption[] = [
  {
    id: "japan",
    title: "Japan",
    description: "Cherry blossoms, lanterns, and magical legends.",
    iconBackground: "bg-pink-100",
    sceneClass: "from-sky-100 via-pink-100 to-emerald-100",
  },
  {
    id: "korea",
    title: "Korea",
    description: "Palaces, mountain villages, and warm folktales.",
    iconBackground: "bg-sky-100",
    sceneClass: "from-sky-200 via-indigo-100 to-emerald-100",
  },
  {
    id: "china",
    title: "China",
    description: "Cloudy peaks, old villages, and dragon stories.",
    iconBackground: "bg-amber-100",
    sceneClass: "from-rose-100 via-amber-100 to-emerald-100",
  },
];
