import type { StoryOption } from "@/types/story";

export function buildIntro(
  country: StoryOption,
  character: StoryOption,
  adventure: StoryOption,
  mood: StoryOption,
) {
  return `${character.title} woke up in a ${mood.title.toLowerCase()} morning in ${country.title}. A tiny golden map pointed toward ${adventure.title}. With a brave breath and a curious smile, ${character.title} followed the first sparkling footprint. Somewhere beyond the next hill, a new friend was waiting for help.`;
}

export function buildDirections(adventure: StoryOption, theme: StoryOption) {
  return [
    `Follow the bright trail into ${adventure.title} and look for the friend who needs your help.`,
    `Take the hidden path and solve a clever puzzle that will reveal the secret of ${adventure.title}.`,
    `Gather a small team, choose the kindest idea, and make a surprising new beginning in ${adventure.title}.`,
  ].map((direction) => `${direction} This path will test ${theme.title.toLowerCase()}.`);
}

export function buildStory(
  country: StoryOption,
  character: StoryOption,
  adventure: StoryOption,
  theme: StoryOption,
  mood: StoryOption,
  direction: string,
) {
  return [
    `${character.title} began the journey in ${country.title}, carrying a little compass and a very big question. The road to ${adventure.title} shimmered with the ${mood.title.toLowerCase()} feeling of a story just beginning.`,
    `At the first turning, ${character.title} remembered the story’s promise: ${direction} Every step became easier when ${character.title} paused to notice the world, listen carefully, and make room for a new friend.`,
    `The secret at the heart of the adventure was not a treasure to keep. It was a chance to practice ${theme.title.toLowerCase()} and to discover that even a small choice can brighten a whole village.`,
    `When the stars appeared above ${adventure.title}, ${character.title} returned home with the compass still in hand. The needle pointed forward, ready for the next page, the next question, and another story made together.`,
  ].join("\n\n");
}

export function buildTitle(character: StoryOption, adventure: StoryOption) {
  return `${character.title} and the Secret of ${adventure.title}`;
}
