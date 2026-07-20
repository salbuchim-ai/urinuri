import type { StoryOption } from "@/types/story";

export const adventures: StoryOption[] = [
  {
    id: "mystic-mountain",
    title: "Mystic Mountain",
    description: "Follow a secret path to a mountain above the clouds.",
    iconBackground: "bg-emerald-100",
    sceneClass: "from-sky-200 via-emerald-100 to-green-200",
  },
  {
    id: "underwater-kingdom",
    title: "Underwater Kingdom",
    description: "Dive below the waves to meet a sparkling royal world.",
    iconBackground: "bg-sky-100",
    sceneClass: "from-sky-300 via-cyan-100 to-blue-200",
  },
  {
    id: "moonlit-forest",
    title: "Moonlit Forest",
    description: "Discover a glowing forest where the trees whisper at night.",
    iconBackground: "bg-violet-100",
    sceneClass: "from-indigo-300 via-violet-100 to-emerald-200",
  },
];
