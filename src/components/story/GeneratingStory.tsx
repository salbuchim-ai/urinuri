"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import { buildDirections, buildIntro } from "@/lib/story-content";
import { isLiveStoryGeneration } from "@/lib/story-mode";
import { CharacterGroup } from "@/components/story/CharacterGroup";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type { AdventureId, CharacterId, CountryId, LengthId, MoodId, ThemeId } from "@/types/story";

const adventureImages: Record<AdventureId, string> = {
  "mystic-mountain": "/generated/adventures/mystic-mountain.png",
  "underwater-kingdom": "/generated/adventures/underwater-kingdom.png",
  "moonlit-forest": "/generated/adventures/moonlit-forest.png",
  "near-village": "/generated/adventures/near-village.png",
};

export function GeneratingStory() {
  const router = useRouter();
  const { selections, setStoryPart } = useStoryFlow();
  const requestStarted = useRef(false);
  const [status, setStatus] = useState<"generating" | "fallback">("generating");
  const adventure = adventures.find((option) => option.id === selections.adventure) ?? adventures[0];
  const adventureId = adventure.id as AdventureId;
  const selectedCharacterIds = useMemo(
    () => selections.characters.length
      ? selections.characters
      : selections.character
        ? [selections.character]
        : [characters[0].id as CharacterId],
    [selections.characters, selections.character],
  );
  const characterNames = selectedCharacterIds
    .map((characterId) => characters.find((option) => option.id === characterId)?.title ?? "Character")
    .join(" and ");

  useEffect(() => {
    if (requestStarted.current) return;
    requestStarted.current = true;

    const country = countries.find((option) => option.id === selections.country) ?? countries[0];
    const theme = themes.find((option) => option.id === selections.theme) ?? themes[0];
    const mood = moods.find((option) => option.id === selections.mood) ?? moods[0];
    const storyLength = (selections.length ?? "short") as LengthId;
    const fallbackIntro = buildIntro(country, selectedCharacterIds.map((id) => characters.find((option) => option.id === id) ?? characters[0]), adventure, mood);
    const fallbackDirections = buildDirections(adventure, theme, mood);

    if (!isLiveStoryGeneration) {
      window.setTimeout(() => {
        setStatus("fallback");
        setStoryPart("generationMode", "demo");
        setStoryPart("intro", fallbackIntro);
        setStoryPart("directionOptions", fallbackDirections);
        router.replace("/story/result");
      }, 0);
      return;
    }

    async function generateOpening() {
      try {
        setStoryPart("generationMode", "live");
        const response = await fetch("/api/story/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "opening",
            country: country.id as CountryId,
            characters: selectedCharacterIds,
            adventure: adventure.id as AdventureId,
            theme: theme.id as ThemeId,
            mood: mood.id as MoodId,
            length: storyLength,
          }),
        });

        if (!response.ok) throw new Error("Story opening request failed.");
        const data = await response.json() as { openingScene?: unknown; directionOptions?: unknown };
        if (
          typeof data.openingScene !== "string" ||
          !Array.isArray(data.directionOptions) ||
          data.directionOptions.length !== 3 ||
          data.directionOptions.some((option) => typeof option !== "string")
        ) {
          throw new Error("Story opening response was invalid.");
        }

        setStoryPart("intro", data.openingScene);
        setStoryPart("directionOptions", data.directionOptions);
      } catch {
        setStatus("fallback");
        setStoryPart("generationMode", "demo");
        setStoryPart("intro", fallbackIntro);
        setStoryPart("directionOptions", fallbackDirections);
      } finally {
        router.replace("/story/result");
      }
    }

    void generateOpening();

  }, [adventure, router, selectedCharacterIds, selections.country, selections.length, selections.mood, selections.theme, setStoryPart]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#dff4ff] px-5 py-8 text-center text-sky-950">
      <section className="w-full max-w-xl rounded-3xl border-[3px] border-sky-950 bg-white/90 px-7 py-12 pixel-shadow md:px-12 md:py-16">
        <ProgressIndicator currentStep={7} totalSteps={10} />
        <div className="relative mx-auto mt-10 h-40 overflow-hidden rounded-2xl border-[3px] border-sky-950 bg-sky-100">
          <Image
            src={adventureImages[adventureId]}
            alt=""
            fill
            unoptimized
            sizes="390px"
            className="pixel-art pixel-scene-drift object-cover"
            style={{ imageRendering: "pixelated" }}
          />
          <div className={`absolute bottom-0 left-1/2 h-28 ${selectedCharacterIds.length > 1 ? "w-40" : "w-28"} -translate-x-1/2`}>
            <CharacterGroup characterIds={selectedCharacterIds} pose="action" className="h-full w-full" />
          </div>
        </div>
        <p className="pixel-text mt-8 text-xs font-black uppercase tracking-[0.2em] text-sky-700">
          {status === "fallback" ? "Demo mode" : "AI story generation"}
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
          {characterNames} {selectedCharacterIds.length > 1 ? "are" : "is"} getting ready for {adventure.title}
        </h1>
        <p className="mt-4 leading-7 text-sky-900/70">
          {status === "fallback"
            ? "The story engine is taking a break, so we prepared a story for your demo."
            : "We are sketching the opening scene and a few paths for you to choose from."}
        </p>
        <div className="mt-8 flex justify-center gap-2" aria-hidden="true">
          <span className="h-3 w-3 animate-bounce rounded-sm bg-yellow-400 [animation-delay:-0.3s]" />
          <span className="h-3 w-3 animate-bounce rounded-sm bg-emerald-400 [animation-delay:-0.15s]" />
          <span className="h-3 w-3 animate-bounce rounded-sm bg-sky-400" />
        </div>
        <p className="sr-only" role="status">Your story intro is being prepared.</p>
      </section>
    </main>
  );
}
