"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import { buildDirections, buildIntro, buildStory } from "@/lib/story-content";
import { CharacterSprite } from "@/components/story/CharacterSprite";
import { ChoiceCard } from "@/components/story/ChoiceCard";
import { PrimaryButton } from "@/components/story/PrimaryButton";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";
import { StoryOpeningScene } from "@/components/story/StoryOpeningScene";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type { AdventureId, CharacterId, StoryOption } from "@/types/story";

type StoryStage = "opening" | "choice" | "loading" | "continued";

function getOption(options: StoryOption[], value: string | null, fallback: StoryOption) {
  return options.find((option) => option.id === value) ?? fallback;
}

function getLoadingMessage(character: StoryOption, adventure: StoryOption) {
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
  const country = getOption(countries, selections.country, countries[0]);
  const character = getOption(characters, selections.character, characters[0]);
  const adventure = getOption(adventures, selections.adventure, adventures[0]);
  const theme = getOption(themes, selections.theme, themes[0]);
  const mood = getOption(moods, selections.mood, moods[0]);
  const intro = useMemo(() => selections.intro || buildIntro(country, character, adventure, mood), [adventure, character, country, mood, selections.intro]);
  const directions = useMemo(() => selections.directionOptions.length ? selections.directionOptions : buildDirections(adventure, theme), [adventure, selections.directionOptions, theme]);
  const loadingMessage = getLoadingMessage(character, adventure);

  useEffect(() => {
    if (stage !== "loading" || !selectedDirection) return;

    const timeoutId = window.setTimeout(() => {
      setStoryPart("story", buildStory(country, character, adventure, theme, mood, selectedDirection));
      setStage("continued");
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [adventure, character, country, mood, selectedDirection, setStoryPart, stage, theme]);

  function openChoices() {
    setStoryPart("intro", intro);
    setStoryPart("directionOptions", directions);
    setStage("choice");
  }

  function chooseDirection(direction: string) {
    setSelectedDirection(direction);
    setStoryPart("selectedDirection", direction);
    setStage("loading");
  }

  function startAnotherStory() {
    resetSelections();
    router.push("/create/country");
  }

  function goHome() {
    resetSelections();
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
      <div className="mx-auto w-full max-w-[760px]">
        <header className="mb-3 text-center">
          <h1 className="text-xl font-black tracking-tight">7. Story Result (Choose the Path)</h1>
        </header>

        <div className="grid gap-3 lg:grid-cols-[1fr_1.08fr_0.82fr]">
          <section className="overflow-hidden rounded-lg border border-slate-200 bg-[#f8fafc] shadow-sm">
            <StageHeader title="7-1. Opening Scene" active={stage === "opening" ? 1 : 3} />
            <StoryOpeningScene characterId={character.id as CharacterId} adventureId={adventure.id as AdventureId} />
            <div className="p-3">
              <div className="space-y-3 text-xs font-bold leading-5 text-slate-950">
                {intro.split(". ").reduce<string[]>((paragraphs, sentence, index, all) => {
                  if (index % 2 === 0) paragraphs.push(`${sentence}${all[index + 1] ? `. ${all[index + 1]}` : ""}`);
                  return paragraphs;
                }, []).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <button
                type="button"
                onClick={openChoices}
                disabled={stage !== "opening"}
                className="mx-auto mt-3 block text-xl font-black text-blue-700 disabled:text-slate-300"
                aria-label="Continue to story choices"
              >
                ↓
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
                    key={direction}
                    index={index + 1}
                    text={direction}
                    disabled={stage !== "choice"}
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
                <div className="space-y-3 text-xs font-bold leading-5 text-slate-950">
                  {selections.story.split("\n\n").slice(-2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              ) : (
                <>
                  <p className="max-w-[160px] text-xs font-black leading-6 text-slate-950">{stage === "loading" ? loadingMessage : `Choose a path to see what ${character.title} does next...`}</p>
                  <CharacterSprite characterId={character.id as CharacterId} pose="action" label={character.title} hideSourceLabel className="mt-5 h-24 w-24 bg-transparent" />
                  {stage === "loading" ? <LoadingDots /> : null}
                </>
              )}
            </div>
            {stage === "continued" ? (
              <div className="flex flex-col gap-2 p-2.5">
                <PrimaryButton onClick={startAnotherStory} className="w-full">Create Another Story</PrimaryButton>
                <button type="button" onClick={goHome} className="text-xs font-black text-blue-700 underline">Back to Home</button>
              </div>
            ) : null}
          </section>
        </div>
      </div>
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
