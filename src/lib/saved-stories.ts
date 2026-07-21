import type { SavedStory } from "@/types/story";

export const SAVED_STORIES_STORAGE_KEY = "urinuri.savedStories";
export const SAVED_STORIES_CHANGE_EVENT = "urinuri:saved-stories-change";
export const MAX_SAVED_STORIES = 3;

export type SaveStoryResult = "saved" | "duplicate" | "full" | "error";

export function createSavedStoryId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `story-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function loadSavedStories(): SavedStory[] {
  if (typeof window === "undefined") return [];

  try {
    const storedValue = window.localStorage.getItem(SAVED_STORIES_STORAGE_KEY);
    if (!storedValue) return [];

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue) || !parsedValue.every(isSavedStory)) return [];

    return parsedValue
      .slice(0, MAX_SAVED_STORIES)
      .sort((first, second) => second.createdAt.localeCompare(first.createdAt));
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.warn("UriNuri saved stories could not be loaded.");
    }
    return [];
  }
}

export function saveSavedStory(story: SavedStory): SaveStoryResult {
  if (typeof window === "undefined") return "error";

  const stories = loadSavedStories();
  if (stories.some((savedStory) => savedStory.id === story.id)) return "duplicate";
  if (stories.length >= MAX_SAVED_STORIES) return "full";

  try {
    window.localStorage.setItem(
      SAVED_STORIES_STORAGE_KEY,
      JSON.stringify([story, ...stories].slice(0, MAX_SAVED_STORIES)),
    );
    notifySavedStoriesChanged();
    return "saved";
  } catch {
    return "error";
  }
}

export function deleteSavedStory(storyId: string) {
  if (typeof window === "undefined") return false;

  try {
    const stories = loadSavedStories();
    const nextStories = stories.filter((story) => story.id !== storyId);
    if (nextStories.length === stories.length) return false;

    window.localStorage.setItem(SAVED_STORIES_STORAGE_KEY, JSON.stringify(nextStories));
    notifySavedStoriesChanged();
    return true;
  } catch {
    return false;
  }
}

function isSavedStory(value: unknown): value is SavedStory {
  if (!value || typeof value !== "object") return false;

  const story = value as Partial<SavedStory>;
  return (
    typeof story.id === "string" &&
    typeof story.title === "string" &&
    typeof story.createdAt === "string" &&
    isNonEmptyString(story.country) &&
    Array.isArray(story.characters) &&
    story.characters.length >= 1 &&
    story.characters.length <= 2 &&
    story.characters.every(isNonEmptyString) &&
    isNonEmptyString(story.adventure) &&
    isNonEmptyString(story.mood) &&
    isNonEmptyString(story.theme) &&
    isNonEmptyString(story.storyLength) &&
    typeof story.openingScene === "string" &&
    typeof story.selectedChoice === "string" &&
    typeof story.generatedContinuation === "string"
  );
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function notifySavedStoriesChanged() {
  window.dispatchEvent(new Event(SAVED_STORIES_CHANGE_EVENT));
}
