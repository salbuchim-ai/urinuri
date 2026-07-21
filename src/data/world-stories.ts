import type { CountryId } from "@/types/story";

export type WorldStory = {
  countryId: CountryId;
  countryLabel: string;
  category: "Traditional Folktale" | "Classic Legend";
  title: string;
  slug: string;
  description: string;
  retelling: string;
  culturalContext: string;
  imageSrc: string;
  imageAlt: string;
};

export const worldStories: WorldStory[] = [
  {
    countryId: "japan",
    countryLabel: "Japan",
    category: "Traditional Folktale",
    title: "Momotaro (Peach Boy)",
    slug: "momotaro",
    description: "A beloved Japanese folktale about a boy born from a giant peach who sets out with his animal friends to defeat the ogres of Onigashima.",
    retelling: "An elderly couple finds a giant peach floating down the river. Inside is a baby boy they name Momotaro, or Peach Boy. When he grows up, he travels to Onigashima with a dog, a monkey, and a pheasant, sharing his food and courage with each new friend.",
    culturalContext: "Momotaro is one of Japan's best-known folktales. Details change across regions and retellings, but the story often celebrates courage, cooperation, and generous friendship.",
    imageSrc: "/generated/stories/momotaro.png",
    imageAlt: "Momotaro traveling with his animal friends through a traditional Japanese landscape",
  },
  {
    countryId: "korea",
    countryLabel: "Korea",
    category: "Traditional Folktale",
    title: "The Sun and the Moon",
    slug: "the-sun-and-the-moon",
    description: "A classic Korean folktale about a brother and sister whose escape from a tiger explains how the sun and moon came to shine in the sky.",
    retelling: "A brother and sister run from a hungry tiger and climb a tall tree. They ask the heavens for help, and a strong golden rope carries them safely upward. The brother becomes the sun and the sister becomes the moon, lighting the world together.",
    culturalContext: "This Korean folktale is an origin story that imagines how the sun and moon came to be. Many versions share the same siblings and tiger while changing the ending and the lesson.",
    imageSrc: "/generated/stories/the-sun-and-the-moon.png",
    imageAlt: "The sun and moon above a traditional Korean mountain village",
  },
  {
    countryId: "china",
    countryLabel: "China",
    category: "Classic Legend",
    title: "The Monkey King",
    slug: "the-monkey-king",
    description: "Meet Sun Wukong, the legendary Monkey King whose magical powers and daring adventures appear in the Chinese classic Journey to the West.",
    retelling: "Sun Wukong is born from a magical stone and soon discovers that he can leap, learn, and transform in surprising ways. His journey is full of mountains, clouds, puzzles, and companions who teach him that great power is strongest when guided by wisdom.",
    culturalContext: "The Monkey King is a central figure in Journey to the West, a Chinese classic traditionally associated with Wu Cheng'en. Stories about Sun Wukong appear in many adaptations, each with its own emphasis and style.",
    imageSrc: "/generated/stories/the-monkey-king.png",
    imageAlt: "The Monkey King flying above the mountains with his magical staff",
  },
];

export function getWorldStory(countryId: string, slug: string) {
  return worldStories.find((story) => story.countryId === countryId && story.slug === slug);
}
