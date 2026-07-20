"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { CharacterSprite } from "@/components/story/CharacterSprite";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type { AdventureId, CharacterId } from "@/types/story";

const adventureImages: Record<AdventureId, string> = {
  "mystic-mountain": "/generated/adventures/mystic-mountain.png",
  "underwater-kingdom": "/generated/adventures/underwater-kingdom.png",
  "moonlit-forest": "/generated/adventures/moonlit-forest.png",
};

export function GeneratingStory() {
  const router = useRouter();
  const { selections } = useStoryFlow();
  const character = characters.find((option) => option.id === selections.character) ?? characters[0];
  const adventure = adventures.find((option) => option.id === selections.adventure) ?? adventures[0];
  const characterId = character.id as CharacterId;
  const adventureId = adventure.id as AdventureId;

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.replace("/story/direction");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

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
            className="pixel-art object-cover"
            style={{ imageRendering: "pixelated" }}
          />
          <div className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2">
            <CharacterSprite characterId={characterId} pose="action" label={character.title} hideSourceLabel className="h-full w-full" />
          </div>
        </div>
        <p className="pixel-text mt-8 text-xs font-black uppercase tracking-[0.2em] text-sky-700">
          Intro generation
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
          {character.title} is getting ready for {adventure.title}
        </h1>
        <p className="mt-4 leading-7 text-sky-900/70">
          We are sketching the opening scene and a few paths for you to choose from.
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
