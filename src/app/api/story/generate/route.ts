import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import { generateContinuation, generateOpening, MissingOpenAIKeyError } from "@/lib/openai";
import type { StoryPromptContext } from "@/lib/story-prompt";
import type { AdventureId, CharacterId, CountryId, LengthId, MoodId, ThemeId } from "@/types/story";

export const runtime = "nodejs";

type StoryGenerationInput = {
  mode: "opening" | "continuation";
  country: CountryId;
  characters: CharacterId[];
  adventure: AdventureId;
  theme: ThemeId;
  mood: MoodId;
  length: LengthId;
  direction?: string;
  openingScene?: string;
};

class InvalidStoryRequestError extends Error {}

export async function POST(request: Request) {
  let input: StoryGenerationInput;

  try {
    input = parseRequest(await request.json());
  } catch (error) {
    if (error instanceof InvalidStoryRequestError || error instanceof SyntaxError) {
      return Response.json({ error: "Invalid story generation request." }, { status: 400 });
    }

    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const context = toPromptContext(input);

  try {
    if (input.mode === "opening") {
      return Response.json(await generateOpening(context));
    }

    return Response.json(await generateContinuation(context));
  } catch (error) {
    if (error instanceof MissingOpenAIKeyError) {
      return Response.json(
        { error: "OpenAI is not configured. Add OPENAI_API_KEY to .env.local." },
        { status: 503 },
      );
    }

    console.error("Story generation failed.", error);
    return Response.json(
      { error: "The story service is temporarily unavailable." },
      { status: 502 },
    );
  }
}

function parseRequest(value: unknown): StoryGenerationInput {
  if (!value || typeof value !== "object") throw new InvalidStoryRequestError();

  const body = value as Record<string, unknown>;
  const mode = body.mode;
  const country = getKnownId(body.country, countries, "country");
  const adventure = getKnownId(body.adventure, adventures, "adventure");
  const theme = getKnownId(body.theme, themes, "theme");
  const mood = getKnownId(body.mood, moods, "mood");
  const length = getKnownId(body.length, [
    { id: "short" },
    { id: "long" },
    { id: "series" },
  ], "length");

  if (mode !== "opening" && mode !== "continuation") throw new InvalidStoryRequestError();

  const charactersValue = body.characters;
  if (!Array.isArray(charactersValue) || charactersValue.length < 1 || charactersValue.length > 2) {
    throw new InvalidStoryRequestError();
  }

  const characterIds = charactersValue.map((character) => getKnownId(character, characters, "character"));
  if (new Set(characterIds).size !== characterIds.length) throw new InvalidStoryRequestError();

  const direction = getOptionalText(body.direction, 400);
  const openingScene = getOptionalText(body.openingScene, 3_000);
  if (mode === "continuation" && !direction) throw new InvalidStoryRequestError();

  return {
    mode,
    country: country as CountryId,
    characters: characterIds as CharacterId[],
    adventure: adventure as AdventureId,
    theme: theme as ThemeId,
    mood: mood as MoodId,
    length: length as LengthId,
    ...(direction ? { direction } : {}),
    ...(openingScene ? { openingScene } : {}),
  };
}

function toPromptContext(input: StoryGenerationInput): StoryPromptContext {
  return {
    country: findTitle(countries, input.country),
    characters: input.characters.map((id) => findTitle(characters, id)),
    adventure: findTitle(adventures, input.adventure),
    theme: findTitle(themes, input.theme),
    mood: findTitle(moods, input.mood),
    length: input.length,
    ...(input.direction ? { direction: input.direction } : {}),
    ...(input.openingScene ? { openingScene: input.openingScene } : {}),
  };
}

function getKnownId(
  value: unknown,
  options: Array<{ id: string }>,
  field: string,
) {
  if (typeof value !== "string" || !options.some((option) => option.id === value)) {
    throw new InvalidStoryRequestError(`Invalid ${field}.`);
  }

  return value;
}

function getOptionalText(value: unknown, maxLength: number) {
  if (value === undefined) return undefined;
  if (typeof value !== "string") throw new InvalidStoryRequestError();

  const text = value.trim();
  if (text.length === 0 || text.length > maxLength) throw new InvalidStoryRequestError();
  return text;
}

function findTitle(options: Array<{ id: string; title: string }>, id: string) {
  return options.find((option) => option.id === id)?.title ?? id;
}
