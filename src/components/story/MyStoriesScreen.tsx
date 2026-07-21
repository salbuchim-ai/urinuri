"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { lengths } from "@/data/lengths";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import { ConfirmationDialog } from "@/components/story/ModalDialog";
import { Toast } from "@/components/story/Toast";
import {
  deleteSavedStory,
  loadSavedStories,
  MAX_SAVED_STORIES,
  SAVED_STORIES_CHANGE_EVENT,
  SAVED_STORIES_STORAGE_KEY,
} from "@/lib/saved-stories";
import type { SavedStory } from "@/types/story";

const validIllustrationPaths = new Set([
  "/generated/adventures/mystic-mountain.png",
  "/generated/adventures/underwater-kingdom.png",
  "/generated/adventures/moonlit-forest.png",
  "/generated/adventures/near-village.png",
]);

export function MyStoriesScreen() {
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SavedStory | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const storageSnapshot = useSyncExternalStore(
    subscribeToSavedStories,
    getSavedStoriesSnapshot,
    getServerSavedStoriesSnapshot,
  );
  const stories = storageSnapshot === null ? [] : loadSavedStories();

  useEffect(() => {
    if (!toast) return;

    const timeoutId = window.setTimeout(() => setToast(null), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  const selectedStory = stories.find((story) => story.id === selectedStoryId) ?? null;

  function confirmDelete() {
    if (!deleteTarget) return;

    const deleted = deleteSavedStory(deleteTarget.id);
    setDeleteTarget(null);

    if (deleted) {
      setToast("Story deleted.");
    } else {
      setToast("Could not delete the story. Please try again.");
    }
  }

  if (storageSnapshot === null) {
    return (
      <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
        <div className="mx-auto w-full max-w-[760px] rounded-lg border border-slate-200 bg-[#f8fafc] p-5 text-center shadow-sm">
          <p className="text-sm font-bold text-slate-600">Loading stories...</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
        <div className="mx-auto w-full max-w-[760px]">
          {selectedStory ? (
            <SavedStoryDetail story={selectedStory} onBack={() => setSelectedStoryId(null)} />
          ) : (
            <section className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4 shadow-sm sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-black text-sky-950">Your story collection</p>
                <p className="text-sm font-black text-slate-600">{stories.length} / {MAX_SAVED_STORIES} Saved</p>
              </div>

              {stories.length === 0 ? (
                <div className="mt-10 rounded-lg border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
                  <h2 className="text-xl font-black">No stories saved yet</h2>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    Create a story and save it to see it here.
                  </p>
                  <Link
                    href="/create/country"
                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg border border-[#f3b400] bg-[#ffbf00] px-6 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#ffc933] focus:outline-none focus:ring-4 focus:ring-yellow-200"
                  >
                    Create a Story
                  </Link>
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  {stories.map((story) => (
                    <SavedStoryCard
                      key={story.id}
                      story={story}
                      onRead={() => setSelectedStoryId(story.id)}
                      onDelete={() => setDeleteTarget(story)}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <ConfirmationDialog
        open={Boolean(deleteTarget)}
        title="Delete this story?"
        message="This story will be removed from My Stories."
        cancelLabel="Cancel"
        confirmLabel="Delete"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
      {toast ? <Toast message={toast} /> : null}
    </>
  );
}

function subscribeToSavedStories(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener("storage", callback);
  window.addEventListener(SAVED_STORIES_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(SAVED_STORIES_CHANGE_EVENT, callback);
  };
}

function getSavedStoriesSnapshot() {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(SAVED_STORIES_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function getServerSavedStoriesSnapshot() {
  return null;
}

function SavedStoryCard({
  story,
  onRead,
  onDelete,
}: {
  story: SavedStory;
  onRead: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-black text-slate-950">{story.title}</h2>
          <p className="mt-1 text-xs font-bold text-slate-500">Saved {formatSavedDate(story.createdAt)}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={onRead}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#f3b400] bg-[#ffbf00] px-4 text-xs font-black text-slate-950 transition hover:bg-[#ffc933] focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            Read Story
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-4 text-xs font-black text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-3 grid gap-1 text-xs font-bold leading-5 text-slate-700 sm:grid-cols-2">
        <p>Characters: {getCharacterNames(story)}</p>
        <p>Country: {getTitle(countries, story.country)}</p>
        <p>Adventure: {getTitle(adventures, story.adventure)}</p>
      </div>
      <p className="mt-3 border-t border-slate-100 pt-3 text-sm font-medium leading-6 text-slate-600">
        {getExcerpt(story.generatedContinuation)}
      </p>
      {story.storyLength === "series" ? (
        <div className="mt-4 border-t border-slate-100 pt-3">
          <p className="text-xs font-black text-slate-600">Series options</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              disabled
              title="Continue Story will be available in a future update."
              className="inline-flex min-h-10 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-4 text-xs font-black text-slate-400"
            >
              Continue Story
            </button>
            <button
              type="button"
              disabled
              title="Finish Story will be available in a future update."
              className="inline-flex min-h-10 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-4 text-xs font-black text-slate-400"
            >
              Finish Story
            </button>
          </div>
          <p className="mt-2 text-[11px] font-bold text-slate-400">These options are coming soon.</p>
        </div>
      ) : null}
    </article>
  );
}

function SavedStoryDetail({ story, onBack }: { story: SavedStory; onBack: () => void }) {
  const illustrationPath = story.illustrationPath && validIllustrationPaths.has(story.illustrationPath)
    ? story.illustrationPath
    : null;

  return (
    <section className="rounded-lg border border-slate-200 bg-[#f8fafc] p-4 shadow-sm sm:p-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-4 text-xs font-black text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        Back to My Stories
      </button>

      <h2 className="mt-5 text-2xl font-black text-slate-950">{story.title}</h2>
      <p className="mt-1 text-xs font-bold text-slate-500">Saved {formatSavedDate(story.createdAt)}</p>

      {illustrationPath ? (
        <div className="relative mt-5 h-48 overflow-hidden rounded-lg border border-slate-200 bg-sky-100">
          <Image
            src={illustrationPath}
            alt=""
            fill
            unoptimized
            sizes="760px"
            className="pixel-art pixel-scene-drift object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
      ) : null}

      <dl className="mt-5 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm sm:grid-cols-2">
        <StoryDetailItem label="Country" value={getTitle(countries, story.country)} />
        <StoryDetailItem label="Characters" value={getCharacterNames(story)} />
        <StoryDetailItem label="Adventure" value={getTitle(adventures, story.adventure)} />
        <StoryDetailItem label="Mood" value={getTitle(moods, story.mood)} />
        <StoryDetailItem label="Theme" value={getTitle(themes, story.theme)} />
        <StoryDetailItem label="Story Length" value={getTitle(lengths, story.storyLength)} />
      </dl>

      <div className="mt-5 space-y-5 text-sm font-medium leading-7 text-slate-800">
        <StoryTextSection title="Opening Scene" text={story.openingScene} />
        <StoryTextSection title="Selected Choice" text={story.selectedChoice || "No choice recorded."} />
        <StoryTextSection title="Generated Continuation" text={story.generatedContinuation} />
      </div>
    </section>
  );
}

function StoryDetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 font-bold text-slate-950">{value}</dd>
    </div>
  );
}

function StoryTextSection({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h3 className="text-base font-black text-sky-950">{title}</h3>
      <div className="mt-2 space-y-3">
        {text.split("\n\n").map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
      </div>
    </section>
  );
}

function getTitle(options: { id: string; title: string }[], id: string) {
  return options.find((option) => option.id === id)?.title ?? id;
}

function getCharacterNames(story: SavedStory) {
  return story.characters.map((characterId) => getTitle(characters, characterId)).join(" + ");
}

function getExcerpt(text: string) {
  const normalizedText = text.replace(/\s+/g, " ").trim();
  return normalizedText.length > 150 ? `${normalizedText.slice(0, 150).trim()}...` : normalizedText;
}

function formatSavedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}
