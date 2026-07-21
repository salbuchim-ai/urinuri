import OpenAI from "openai";
import type { StoryPromptContext } from "@/lib/story-prompt";
import { buildContinuationPrompt, buildOpeningPrompt } from "@/lib/story-prompt";

export type StoryOpeningResponse = {
  openingScene: string;
  directionOptions: string[];
};

export type StoryContinuationResponse = {
  continuation: string;
};

export class MissingOpenAIKeyError extends Error {
  constructor() {
    super("OPENAI_API_KEY is not configured.");
    this.name = "MissingOpenAIKeyError";
  }
}

const openingFormat = {
  type: "json_schema" as const,
  name: "story_opening",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      openingScene: { type: "string" },
      directionOptions: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
      },
    },
    required: ["openingScene", "directionOptions"],
  },
};

const continuationFormat = {
  type: "json_schema" as const,
  name: "story_continuation",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      continuation: { type: "string" },
    },
    required: ["continuation"],
  },
};

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) throw new MissingOpenAIKeyError();

  return new OpenAI({ apiKey });
}

function getModel() {
  return process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
}

export function isOpenAIConfigured() {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export async function generateOpening(context: StoryPromptContext): Promise<StoryOpeningResponse> {
  const client = getClient();
  const response = await client.responses.create({
    model: getModel(),
    instructions: "Return JSON that matches the supplied story_opening schema exactly.",
    input: buildOpeningPrompt(context),
    max_output_tokens: 900,
    store: false,
    text: { format: openingFormat },
  });

  const result = parseJsonResponse<StoryOpeningResponse>(response.output_text);
  const directionOptions = Array.isArray(result.directionOptions)
    ? result.directionOptions.map((option) => typeof option === "string" ? option.trim() : option)
    : [];
  if (
    typeof result.openingScene !== "string" ||
    result.openingScene.trim().length < 40 ||
    !Array.isArray(result.directionOptions) ||
    directionOptions.length !== 3 ||
    directionOptions.some((option) => typeof option !== "string" || option.length < 10) ||
    new Set(directionOptions.map((option) => option.toLowerCase())).size !== 3
  ) {
    throw new Error("OpenAI returned an invalid story opening.");
  }

  return {
    openingScene: result.openingScene.trim(),
    directionOptions: directionOptions as string[],
  };
}

export async function generateContinuation(context: StoryPromptContext): Promise<StoryContinuationResponse> {
  const client = getClient();
  const response = await client.responses.create({
    model: getModel(),
    instructions: "Return JSON that matches the supplied story_continuation schema exactly.",
    input: buildContinuationPrompt(context),
    max_output_tokens: getContinuationTokenLimit(context.length),
    store: false,
    text: { format: continuationFormat },
  });

  const result = parseJsonResponse<StoryContinuationResponse>(response.output_text);
  if (typeof result.continuation !== "string" || result.continuation.trim().length < 80) {
    throw new Error("OpenAI returned an invalid story continuation.");
  }

  return { continuation: result.continuation.trim() };
}

function parseJsonResponse<T>(outputText: string): T {
  if (!outputText.trim()) throw new Error("OpenAI returned an empty response.");

  try {
    return JSON.parse(outputText) as T;
  } catch {
    throw new Error("OpenAI returned malformed structured output.");
  }
}

function getContinuationTokenLimit(length: StoryPromptContext["length"]) {
  switch (length) {
    case "long":
      return 4_500;
    case "series":
      return 2_200;
    case "short":
    default:
      return 2_000;
  }
}
