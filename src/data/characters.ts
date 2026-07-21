import type { CharacterOption } from "@/types/story";

export const characters: CharacterOption[] = [
  {
    id: "tiger",
    assetFolder: "tiger",
    title: "Tiger",
    description: "Brave, bright, and ready to lead the way.",
    iconBackground: "bg-orange-100",
    display: {
      blinkDelay: "-0.4s",
    },
  },
  {
    id: "dragon",
    assetFolder: "dragon",
    title: "Dragon",
    description: "A graceful East Asian dragon with horns and whiskers.",
    iconBackground: "bg-emerald-100",
    display: {
      blinkDelay: "-1.1s",
    },
  },
  {
    id: "crow",
    assetFolder: "crow",
    title: "Crow",
    description: "Clever, curious, and always spotting hidden clues.",
    iconBackground: "bg-slate-200",
    display: {
      cardFrontScale: 0.72,
      blinkDelay: "-2.2s",
    },
  },
  {
    id: "monkey",
    assetFolder: "monkey",
    title: "Monkey",
    description: "Playful, quick, and full of surprising ideas.",
    iconBackground: "bg-yellow-100",
    display: {
      blinkDelay: "-1.7s",
    },
  },
  {
    id: "fox",
    assetFolder: "fox",
    title: "Fox",
    description: "A thoughtful explorer with a clever plan.",
    iconBackground: "bg-amber-100",
    display: {
      cardFrontOffsetX: 0,
      blinkDelay: "-0.8s",
    },
  },
  {
    id: "rabbit",
    assetFolder: "rabbit",
    title: "Rabbit",
    description: "Kind-hearted, speedy, and always helping friends.",
    iconBackground: "bg-pink-100",
    display: {
      cardFrontOffsetX: 0,
      blinkDelay: "-1.5s",
    },
  },
  {
    id: "panda",
    assetFolder: "panda",
    title: "Panda",
    description: "Gentle, patient, and stronger than they look.",
    iconBackground: "bg-sky-100",
    display: {
      blinkDelay: "-2.8s",
    },
  },
];
