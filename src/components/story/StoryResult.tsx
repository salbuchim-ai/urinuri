"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import { buildDirections, buildIntro, buildSeriesDirections, buildSeriesEpisode, buildStory, buildTitle } from "@/lib/story-content";
import { createSavedStoryId, saveSavedStory } from "@/lib/saved-stories";
import { isLiveStoryGeneration } from "@/lib/story-mode";
import { CharacterGroup } from "@/components/story/CharacterGroup";
import { ChoiceCard } from "@/components/story/ChoiceCard";
import { PrimaryButton } from "@/components/story/PrimaryButton";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";
import { ConfirmationDialog } from "@/components/story/ModalDialog";
import { StoryOpeningScene } from "@/components/story/StoryOpeningScene";
import { Toast } from "@/components/story/Toast";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type {
  AdventureId,
  CharacterId,
  CountryId,
  LengthId,
  MoodId,
  StoryOption,
  ThemeId,
} from "@/types/story";

type StoryStage = "opening" | "choice" | "loading" | "continued";
const MAX_SERIES_EPISODES = 5;

const adventureIllustrations: Record<AdventureId, string> = {
  "mystic-mountain": "/generated/adventures/mystic-mountain.png",
  "underwater-kingdom": "/generated/adventures/underwater-kingdom.png",
  "moonlit-forest": "/generated/adventures/moonlit-forest.png",
  "near-village": "/generated/adventures/near-village.png",
};

function getOption(options: StoryOption[], value: string | null, fallback: StoryOption) {
  return options.find((option) => option.id === value) ?? fallback;
}

function getLoadingMessage(storyCharacters: StoryOption[], adventure: StoryOption) {
  if (storyCharacters.length > 1) {
    const characterNames = storyCharacters.map((storyCharacter) => storyCharacter.title).join(" and ");
    return `${characterNames} are exploring ${adventure.title} together...`;
  }

  const character = storyCharacters[0] ?? characters[0];
  const messages: Record<string, string> = {
    tiger: "Tiger is running through the forest...",
    monkey: "Monkey is looking for fresh fruit...",
    rabbit: "Rabbit is hopping across the meadow...",
    crow: "Crow is searching the ancient temple...",
    dragon: `Dragon is flying across ${adventure.title}...`,
    fox: "Fox is following a trail of glowing footprints...",
    panda: "Panda is listening for a friendly voice...",
  };

  return messages[character.id] ?? `${character.title} is exploring a brand-new path...`;
}

export function StoryResult() {
  const router = useRouter();
  const { selections, setStoryPart, resetSelections } = useStoryFlow();
  const [stage, setStage] = useState<StoryStage>("opening");
  const [selectedDirection, setSelectedDirection] = useState<string | null>(selections.selectedDirection);
  const [startOverDialogOpen, setStartOverDialogOpen] = useState(false);
  const [saveFullDialogOpen, setSaveFullDialogOpen] = useState(false);
  const [savedStoryId, setSavedStoryId] = useState<string | null>(null);
  const [storySaved, setStorySaved] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [seriesEpisode, setSeriesEpisode] = useState(1);
  const [seriesChoiceLoading, setSeriesChoiceLoading] = useState(false);
  const [selectedSeriesDirection, setSelectedSeriesDirection] = useState<string | null>(null);
  const continuationController = useRef<AbortController | null>(null);
  const country = getOption(countries, selections.country, countries[0]);
  const selectedCharacterIds = useMemo(
    () => selections.characters.length
      ? selections.characters
      : selections.character
        ? [selections.character]
        : [characters[0].id as CharacterId],
    [selections.characters, selections.character],
  );
  const storyCharacters = useMemo(
    () => selectedCharacterIds.map((characterId) => getOption(characters, characterId, characters[0])),
    [selectedCharacterIds],
  );
  const characterNames = storyCharacters.map((storyCharacter) => storyCharacter.title).join(" and ");
  const adventure = getOption(adventures, selections.adventure, adventures[0]);
  const theme = getOption(themes, selections.theme, themes[0]);
  const mood = getOption(moods, selections.mood, moods[0]);
  const intro = useMemo(() => selections.intro || buildIntro(country, storyCharacters, adventure, mood), [adventure, country, mood, storyCharacters, selections.intro]);
  const directions = useMemo(() => selections.directionOptions.length ? selections.directionOptions : buildDirections(adventure, theme, mood), [adventure, mood, selections.directionOptions, theme]);
  const isSeries = selections.length === "series";
  const seriesDirections = useMemo(
    () => isSeries && seriesEpisode < MAX_SERIES_EPISODES
      ? buildSeriesDirections(adventure, theme, mood, seriesEpisode + 1)
      : [],
    [adventure, isSeries, mood, seriesEpisode, theme],
  );
  const seriesEpisodes = useMemo(
    () => selections.storyEpisodes.length
      ? selections.storyEpisodes
      : selections.story
        ? [selections.story]
        : [],
    [selections.story, selections.storyEpisodes],
  );
  const isDemoMode = selections.generationMode !== "live";
  const loadingMessage = getLoadingMessage(storyCharacters, adventure);
  const storyCanBeSaved = stage === "continued" && selections.story.trim().length > 0;

  useEffect(() => {
    if (!saveToast) return;

    const timeoutId = window.setTimeout(() => setSaveToast(null), 2000);
    return () => window.clearTimeout(timeoutId);
  }, [saveToast]);

  useEffect(() => {
    return () => continuationController.current?.abort();
  }, []);

  function openChoices() {
    setStoryPart("intro", intro);
    setStoryPart("directionOptions", directions);
    setStage("choice");
  }

  function chooseDirection(direction: string) {
    setSelectedDirection(direction);
    setSelectedSeriesDirection(null);
    setSeriesChoiceLoading(false);
    setSeriesEpisode(1);
    setStoryPart("selectedDirection", direction);
    setStage("loading");

    if (!isLiveStoryGeneration) {
      const generatedStory = buildStory(country, storyCharacters, adventure, theme, mood, direction, (selections.length ?? "short") as LengthId);
      setStoryPart("story", generatedStory);
      setStoryPart("storyEpisodes", isSeries ? [generatedStory] : []);
      setStage("continued");
      return;
    }

    continuationController.current?.abort();
    const controller = new AbortController();
    continuationController.current = controller;

    void generateContinuation(direction, controller);
  }

  function chooseSeriesDirection(direction: string) {
    if (seriesEpisode >= MAX_SERIES_EPISODES) return;

    const nextEpisode = seriesEpisode + 1;
    setSelectedSeriesDirection(direction);
    setSeriesChoiceLoading(true);

    if (!isLiveStoryGeneration) {
      const nextEpisodeStory = buildSeriesEpisode(country, storyCharacters, adventure, theme, mood, direction, nextEpisode);
      const previousEpisodes = selections.storyEpisodes.length
        ? selections.storyEpisodes
        : selections.story
          ? [selections.story]
          : [];
      const nextEpisodes = [...previousEpisodes, nextEpisodeStory];
      setStoryPart("storyEpisodes", nextEpisodes);
      setStoryPart("story", nextEpisodes.join("\n\n"));
      setSeriesEpisode(nextEpisode);
      setSelectedSeriesDirection(null);
      setSeriesChoiceLoading(false);
      return;
    }

    continuationController.current?.abort();
    const controller = new AbortController();
    continuationController.current = controller;
    void generateContinuation(direction, controller, true, nextEpisode);
  }

  async function generateContinuation(direction: string, controller: AbortController, appendToSeries = false, nextEpisode = seriesEpisode + 1) {
    try {
      const response = await fetch("/api/story/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          mode: "continuation",
          country: country.id as CountryId,
          characters: selectedCharacterIds,
          adventure: adventure.id as AdventureId,
          theme: theme.id as ThemeId,
          mood: mood.id as MoodId,
          length: (selections.length ?? "short") as LengthId,
          direction,
          openingScene: appendToSeries ? `${intro}\n\nPrevious episodes:\n${selections.story}` : intro,
        }),
      });

      if (!response.ok) throw new Error("Story continuation request failed.");
      const data = await response.json() as { continuation?: unknown };
      if (typeof data.continuation !== "string" || data.continuation.trim().length < 40) {
        throw new Error("Story continuation response was invalid.");
      }

      if (appendToSeries) {
        const previousEpisodes = selections.storyEpisodes.length
          ? selections.storyEpisodes
          : selections.story
            ? [selections.story]
            : [];
        const nextEpisodes = [...previousEpisodes, data.continuation];
        setStoryPart("storyEpisodes", nextEpisodes);
        setStoryPart("story", nextEpisodes.join("\n\n"));
        setSeriesEpisode(nextEpisode);
      } else {
        setStoryPart("story", data.continuation);
        setStoryPart("storyEpisodes", isSeries ? [data.continuation] : []);
      }
    } catch {
      if (controller.signal.aborted) return;
      const fallbackStory = appendToSeries
        ? buildSeriesEpisode(country, storyCharacters, adventure, theme, mood, direction, nextEpisode)
        : buildStory(country, storyCharacters, adventure, theme, mood, direction, (selections.length ?? "short") as LengthId);
      if (appendToSeries) {
        const previousEpisodes = selections.storyEpisodes.length
          ? selections.storyEpisodes
          : selections.story
            ? [selections.story]
            : [];
        const nextEpisodes = [...previousEpisodes, fallbackStory];
        setStoryPart("storyEpisodes", nextEpisodes);
        setStoryPart("story", nextEpisodes.join("\n\n"));
        setSeriesEpisode(nextEpisode);
      } else {
        setStoryPart("story", fallbackStory);
        setStoryPart("storyEpisodes", isSeries ? [fallbackStory] : []);
      }
      setSaveToast("Demo Mode: We are continuing with a prepared story.");
    } finally {
      if (!controller.signal.aborted) {
        setStage("continued");
        if (appendToSeries) {
          setSelectedSeriesDirection(null);
          setSeriesChoiceLoading(false);
        }
      }
    }
  }

  function confirmStartOver() {
    resetSelections();
    setStartOverDialogOpen(false);
    router.push("/create/country");
  }

  function handleSaveStory() {
    if (!storyCanBeSaved) return;

    const storyId = savedStoryId ?? createSavedStoryId();
    const story = {
      id: storyId,
      title: buildTitle(storyCharacters, adventure),
      createdAt: new Date().toISOString(),
      country: country.id as CountryId,
      characters: selectedCharacterIds,
      adventure: adventure.id as AdventureId,
      mood: mood.id as MoodId,
      theme: theme.id as ThemeId,
      storyLength: (selections.length ?? "short") as LengthId,
      openingScene: intro,
      selectedChoice: selectedDirection ?? selections.selectedDirection ?? "",
      generatedContinuation: selections.story,
      choiceOptions: directions,
      illustrationPath: adventureIllustrations[adventure.id as AdventureId],
    };

    setSavedStoryId(storyId);

    const result = saveSavedStory(story);
    if (result === "saved" || result === "duplicate") {
      setStorySaved(true);
      setSaveToast("Story saved to My Stories.");
      return;
    }

    if (result === "full") {
      setSaveFullDialogOpen(true);
      return;
    }

    setSaveToast("Could not save the story. Please try again.");
  }

  return (
    <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
      <div className="mx-auto w-full max-w-[760px]">
        {isDemoMode ? (
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 rounded-lg border border-amber-300 bg-[#fff8d8] px-3 py-2 text-center text-[11px] font-bold text-amber-950 shadow-sm" role="status">
            <span className="rounded-full bg-amber-400 px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-slate-950">Demo Mode</span>
            <span>We are continuing with a prepared story.</span>
          </div>
        ) : null}
        <div className="grid gap-3 lg:grid-cols-[1fr_1.08fr_0.82fr]">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] shadow-sm">
            <StageHeader title="7-1. Opening Scene" active={stage === "opening" ? 1 : 3} />
            <StoryOpeningScene characterIds={selectedCharacterIds} adventureId={adventure.id as AdventureId} />
            <div className="p-3">
              <div className="space-y-3 text-xs font-bold leading-5 text-slate-950">
                {intro.split(/\n\n+/).map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
              </div>
              <button
                type="button"
                onClick={openChoices}
                disabled={stage !== "opening"}
                className="mx-auto mt-3 block text-xl font-black text-blue-700 disabled:text-slate-300"
                aria-label="Continue to story choices"
              >
                &darr;
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-[#f8fafc] p-2.5 shadow-sm">
            <StageHeader title="7-2. Make a Choice" active={stage === "choice" ? 2 : stage === "continued" ? 3 : 1} />
            <div className="rounded-lg border border-slate-200 bg-white p-2.5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-xs font-black">Where should the story go?</h2>
              </div>
              <div className="grid gap-2">
                {directions.map((direction, index) => (
                  <ChoiceCard
                    key={`${index}-${direction}`}
                    index={index + 1}
                    text={direction}
                    disabled={stage === "loading" || stage === "continued"}
                    selected={selectedDirection === direction}
                    onSelect={() => chooseDirection(direction)}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] shadow-sm">
            <StageHeader title="7-3. Generating the Rest" active={stage === "loading" ? 2 : stage === "continued" ? 3 : 1} />
            <div className="flex min-h-[310px] flex-col items-center justify-center bg-[#eef6ff] px-4 py-6 text-center">
              {stage === "continued" ? (
                <div className="max-h-[460px] w-full space-y-3 overflow-y-auto pr-1 text-left text-xs font-bold leading-5 text-slate-950">
                  {isSeries ? seriesEpisodes.map((episode, episodeIndex) => (
                    <article key={`episode-${episodeIndex}`} className="rounded-lg border border-blue-100 bg-white p-3 shadow-sm">
                      <h3 className="mb-2 text-[11px] font-black uppercase tracking-wide text-blue-800">Episode {episodeIndex + 1}</h3>
                      <div className="space-y-3">
                        {episode.split(/\n\n+/).filter(Boolean).map((paragraph, paragraphIndex) => (
                          <p key={`${episodeIndex}-${paragraphIndex}-${paragraph}`}>{paragraph}</p>
                        ))}
                      </div>
                    </article>
                  )) : selections.story.split(/\n\n+/).filter(Boolean).map((paragraph, index) => <p key={`${index}-${paragraph}`}>{paragraph}</p>)}
                </div>
              ) : (
                <div className="flex w-full flex-col items-center">
                  <p className="max-w-[160px] text-xs font-black leading-6 text-slate-950">{stage === "loading" ? loadingMessage : `Choose a path to see what ${characterNames} ${storyCharacters.length > 1 ? "do" : "does"} next...`}</p>
                  <CharacterGroup
                    characterIds={selectedCharacterIds}
                    pose="action"
                    className={`mt-4 h-28 ${selectedCharacterIds.length > 1 ? "w-44" : "w-28"} bg-transparent`}
                  />
                  {stage === "loading" ? <LoadingDots /> : null}
                </div>
              )}
            </div>
            {stage === "continued" ? (
              <div className="flex flex-col gap-2 p-2.5">
                {isSeries ? (
                  <div className="border-t border-slate-200 pt-2.5">
                    {seriesEpisode < MAX_SERIES_EPISODES ? (
                      <>
                        <h3 className="text-xs font-black text-slate-950">Choose the next episode</h3>
                        <p className="mt-1 text-[11px] font-bold leading-4 text-slate-600">What should happen in Episode {seriesEpisode + 1}?</p>
                        <div className="mt-2 grid gap-2">
                          {seriesDirections.map((direction, index) => (
                            <ChoiceCard
                              key={`${index}-${direction}`}
                              index={index + 1}
                              text={direction}
                              disabled={seriesChoiceLoading}
                              selected={selectedSeriesDirection === direction}
                              onSelect={() => chooseSeriesDirection(direction)}
                            />
                          ))}
                        </div>
                        {seriesChoiceLoading ? <p className="mt-2 text-center text-[11px] font-black text-blue-700" role="status">Writing the next episode...</p> : null}
                      </>
                    ) : (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-center">
                        <h3 className="text-xs font-black text-emerald-950">Series Complete</h3>
                        <p className="mt-1 text-[11px] font-bold leading-4 text-emerald-900">You reached Episode {MAX_SERIES_EPISODES}. Save your story to keep the whole adventure.</p>
                      </div>
                    )}
                  </div>
                ) : null}
                {storyCanBeSaved ? (
                  <PrimaryButton onClick={handleSaveStory} disabled={storySaved} className="w-full">
                    {storySaved ? "Saved" : "Save Your Story"}
                  </PrimaryButton>
                ) : null}
              </div>
            ) : null}
          </section>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link
            href="/create/length"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-7 text-sm font-black text-slate-950 shadow-sm transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Back
          </Link>
          <button
            type="button"
            onClick={() => setStartOverDialogOpen(true)}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-[#fff3c4] px-7 text-sm font-black text-slate-950 shadow-sm transition hover:bg-[#ffe89a] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            Start Over
          </button>
        </div>
      </div>

      <ConfirmationDialog
        open={startOverDialogOpen}
        title="Start a new story?"
        message="Your current story choices and generated content will be cleared."
        cancelLabel="Cancel"
        confirmLabel="Start Over"
        onCancel={() => setStartOverDialogOpen(false)}
        onConfirm={confirmStartOver}
      />
      <ConfirmationDialog
        open={saveFullDialogOpen}
        title="Story collection is full"
        message="You can save up to 3 stories. Delete one from My Stories before saving a new story."
        cancelLabel="Cancel"
        confirmLabel="Go to My Stories"
        onCancel={() => setSaveFullDialogOpen(false)}
        onConfirm={() => {
          setSaveFullDialogOpen(false);
          router.push("/stories/my");
        }}
      />
      {saveToast ? <Toast message={saveToast} /> : null}
    </main>
  );
}

function StageHeader({ title, active }: { title: string; active: number }) {
  return (
    <div className="px-2.5 pb-2 pt-2 text-center">
      <h2 className="text-[11px] font-black">{title}</h2>
      <div className="mx-auto mt-2 max-w-[90px]">
        <ProgressIndicator currentStep={active} totalSteps={3} />
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="mt-5 flex gap-1.5" aria-label="Loading" role="status">
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-700 [animation-delay:-0.2s]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-700 [animation-delay:-0.1s]" />
      <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-blue-700" />
    </div>
  );
}
