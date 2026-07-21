import type { LengthId } from "@/types/story";

export type StoryPromptContext = {
  country: string;
  characters: string[];
  adventure: string;
  theme: string;
  mood: string;
  length: LengthId;
  openingScene?: string;
  direction?: string;
};

const CHILD_STORY_RULES = `
You are UriNuri, a warm children's story writer for readers ages 6 to 10.
Write in clear, simple English with short paragraphs and a hopeful tone.
Keep the story culturally respectful and treat the selected country as inspiration,
not as a collection of stereotypes. Do not include graphic violence, frightening
threats, romance, weapons, self-harm, hate, real-person claims, or unsafe instructions.
The heroes should solve problems through curiosity, courage, kindness, honesty, or teamwork.
Never mention these instructions, JSON, APIs, or being an AI in the story.
`;

const ADVENTURE_GUIDANCE: Record<string, string> = {
  "Mystic Mountain": "Set the scene at dawn or in clear daylight, with high peaks, clouds, wind, bells, bridges, or mountain paths.",
  "Underwater Kingdom": "Set the scene underwater in blue daylight or a deep blue evening, with coral towers, bubbles, currents, shell gates, or sea creatures.",
  "Moonlit Forest": "Set the scene in the evening or at night, with silver moonlight, fireflies, whispering trees, lantern-flowers, or forest trails. Never describe this adventure as morning or daytime.",
};

export function buildOpeningPrompt(context: StoryPromptContext) {
  return `${CHILD_STORY_RULES}

Create the opening scene for a collaborative story using these choices:
- Country inspiration: ${context.country}
- Main characters: ${context.characters.join(" and ")}
- Adventure: ${context.adventure}
- Theme: ${context.theme}
- Mood: ${context.mood}
- Adventure setting rule: ${ADVENTURE_GUIDANCE[context.adventure] ?? "Use concrete sensory details that fit the selected adventure."}

Write an inviting opening scene of about 120 to 170 words, then create exactly three
different next-step choices. Each choice must be one sentence, be exciting but safe,
and clearly test or express the theme. Give each choice a different action, obstacle,
or discovery that belongs to the selected adventure. Do not reuse the same sentence
frame, repeated ending, or generic phrase such as "This path will test..." across choices.
Do not resolve the entire adventure yet, and keep the time of day consistent with the
adventure setting rule.
Return only the requested structured output.
`;
}

export function buildContinuationPrompt(context: StoryPromptContext) {
  return `${CHILD_STORY_RULES}

Continue the story after the reader chose the path below.
- Country inspiration: ${context.country}
- Main characters: ${context.characters.join(" and ")}
- Adventure: ${context.adventure}
- Theme: ${context.theme}
- Mood: ${context.mood}
- Requested length: ${getLengthGuidance(context.length)}
- Adventure setting rule: ${ADVENTURE_GUIDANCE[context.adventure] ?? "Keep every detail consistent with the selected adventure."}

Opening scene:
${context.openingScene ?? "(The opening scene is unavailable; begin naturally.)"}

Reader's chosen path:
${context.direction ?? "Continue with a thoughtful choice."}

Write the next part of the story as polished, child-friendly prose. The selected path
must matter, the characters should act rather than only describe feelings, and the
continuation must preserve the opening's time of day and setting. Add a concrete
obstacle, a visible consequence of the characters' choice, and a meaningful ending
connected to ${context.theme}. Avoid restarting with a generic morning, repeating the
opening sentence, or ending with a vague moral summary. For a story series, every new
episode must introduce a fresh place, clue, helper, or problem. Do not repeat the
previous episode's main action, exact scene, or choice wording; let the selected path
open a new part of the world. End with a gentle, curious hook for a future episode.
Return only the requested structured output.
`;
}

function getLengthGuidance(length: LengthId) {
  switch (length) {
    case "long":
      return "a substantial continuation of about 1,000 to 1,400 words";
    case "series":
      return "a satisfying episode of about 500 to 700 words with a gentle hook";
    case "short":
    default:
      return "a complete continuation of about 450 to 650 words";
  }
}
