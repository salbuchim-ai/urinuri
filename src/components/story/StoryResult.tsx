"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import { lengths } from "@/data/lengths";
import { buildStory, buildTitle } from "@/lib/story-content";
import { PixelScene } from "@/components/story/PixelScene";
import { CharacterSprite } from "@/components/story/CharacterSprite";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";
import { StorySummary } from "@/components/story/StorySummary";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type { StoryOption } from "@/types/story";

function getOption(options: StoryOption[], value: string | null, fallback: StoryOption) {
  return options.find((option) => option.id === value) ?? fallback;
}

export function StoryResult() {
  const router = useRouter();
  const { selections, setStoryPart, resetSelections } = useStoryFlow();
  const [showIllustration, setShowIllustration] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const country = getOption(countries, selections.country, countries[0]);
  const character = getOption(characters, selections.character, characters[0]);
  const adventure = getOption(adventures, selections.adventure, adventures[0]);
  const theme = getOption(themes, selections.theme, themes[0]);
  const mood = getOption(moods, selections.mood, moods[0]);
  const length = getOption(lengths, selections.length, lengths[0]);
  const direction = selections.selectedDirection ?? "The path beyond the first hill";
  const story = selections.story || buildStory(country, character, adventure, theme, mood, direction);

  function startAnotherStory() {
    resetSelections();
    router.push("/create/country");
  }

  function goHome() {
    resetSelections();
    router.push("/");
  }

  function continueSeries() {
    setStoryPart("selectedDirection", "");
    setStoryPart("story", "");
    router.push("/story/direction");
  }

  return (
    <main className="min-h-screen bg-[#dff4ff] px-5 py-7 text-sky-950 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={goHome}
            className="inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-black text-sky-900 transition hover:bg-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-200"
          >
            <span aria-hidden="true">🌈</span> UriNuri
          </button>
          <span className="pixel-text text-xs font-black text-sky-700">Story complete</span>
        </div>
        <ProgressIndicator currentStep={9} totalSteps={10} />

        <article className="mt-8 overflow-hidden rounded-3xl border-[3px] border-sky-950 bg-white/90 pixel-shadow">
          <div className="bg-gradient-to-br from-sky-300 via-emerald-200 to-yellow-200 px-6 py-12 text-center md:px-12 md:py-16">
            <div className="flex items-center justify-center gap-4" aria-hidden="true">
              <CharacterSprite
                characterId={character.id as Parameters<typeof CharacterSprite>[0]["characterId"]}
                fallbackEmoji={character.emoji}
                label={character.title}
                className="h-28 w-28 bg-transparent text-7xl"
              />
              <span className="text-6xl">{adventure.emoji}</span>
            </div>
            <p className="pixel-text mt-5 text-xs font-black uppercase tracking-[0.16em] text-sky-900">
              {country.title} · {length.title}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-sky-950 md:text-5xl">
              {buildTitle(character, adventure)}
            </h1>
          </div>

          <div className="space-y-8 px-6 py-8 md:px-12 md:py-12">
            <div>
              <p className="pixel-text text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                You chose this direction
              </p>
              <p className="mt-3 rounded-2xl border-2 border-sky-950/10 bg-[#effaff] p-5 font-bold leading-7 text-sky-950">
                {direction}
              </p>
            </div>

            <div className="space-y-5 text-lg leading-9 text-sky-950/85">
              {story.split("\n\n").map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <StorySummary selections={selections} />

            <div className="rounded-2xl border-[3px] border-sky-950/15 bg-sky-50 p-5">
              <button
                type="button"
                onClick={() => setShowReflection((current) => !current)}
                className="font-black text-sky-950 underline decoration-yellow-400 decoration-4 underline-offset-4 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                aria-expanded={showReflection}
              >
                {showReflection ? "Hide Story Reflection" : "Show Story Reflection (optional)"}
              </button>
              {showReflection ? (
                <p className="mt-4 leading-7 text-sky-900/75">
                  What was your favorite choice? What might happen if the characters took a different path?
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {selections.length === "series" ? (
                <button
                  type="button"
                  onClick={continueSeries}
                  className="inline-flex min-h-14 items-center justify-center rounded-xl border-[3px] border-sky-950 bg-yellow-400 px-6 font-black text-sky-950 pixel-shadow transition hover:-translate-y-0.5 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                >
                  Continue the Story →
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => setShowIllustration((current) => !current)}
                className="inline-flex min-h-14 items-center justify-center rounded-xl border-[3px] border-sky-950 bg-emerald-300 px-6 font-black text-sky-950 transition hover:-translate-y-0.5 hover:bg-emerald-200 focus:outline-none focus:ring-4 focus:ring-yellow-200"
                aria-pressed={showIllustration}
              >
                {showIllustration ? "Hide Illustration" : "Generate Illustration"}
              </button>
              <button
                type="button"
                onClick={startAnotherStory}
                className="inline-flex min-h-14 items-center justify-center rounded-xl border-[3px] border-sky-950/20 bg-white px-6 font-black text-sky-900 transition hover:border-sky-950/45 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              >
                Create Another Story
              </button>
              <button
                type="button"
                onClick={goHome}
                className="inline-flex min-h-14 items-center justify-center rounded-xl border-[3px] border-sky-950/20 bg-white px-6 font-black text-sky-900 transition hover:border-sky-950/45 focus:outline-none focus:ring-4 focus:ring-yellow-200"
              >
                Back to Home
              </button>
            </div>

            {showIllustration ? (
              <div className="rounded-2xl border-[3px] border-sky-950 bg-yellow-50 p-4">
                <p className="pixel-text mb-4 text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                  Illustration preview
                </p>
                <PixelScene variant="legend" />
                <p className="mt-3 text-sm text-sky-900/70">
                  This is a placeholder preview. A real illustration model can be connected here later.
                </p>
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}
