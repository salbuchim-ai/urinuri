"use client";

import { useRouter } from "next/navigation";
import { adventures } from "@/data/adventures";
import { characters } from "@/data/characters";
import { countries } from "@/data/countries";
import { moods } from "@/data/moods";
import { themes } from "@/data/themes";
import { buildDirections, buildIntro, buildStory } from "@/lib/story-content";
import { NavigationButtons } from "@/components/story/NavigationButtons";
import { StepHeader } from "@/components/story/StepHeader";
import { StoryDirectionCard } from "@/components/story/StoryDirectionCard";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type { StoryOption } from "@/types/story";

function getOption(options: StoryOption[], value: string | null, fallback: StoryOption) {
  return options.find((option) => option.id === value) ?? fallback;
}

export function StoryDirection() {
  const router = useRouter();
  const { selections, setStoryPart } = useStoryFlow();
  const country = getOption(countries, selections.country, countries[0]);
  const character = getOption(characters, selections.character, characters[0]);
  const adventure = getOption(adventures, selections.adventure, adventures[0]);
  const theme = getOption(themes, selections.theme, themes[0]);
  const mood = getOption(moods, selections.mood, moods[0]);
  const intro = selections.intro || buildIntro(country, character, adventure, mood);
  const directionOptions = selections.directionOptions.length
    ? selections.directionOptions
    : buildDirections(adventure, theme);

  function handleNext() {
    if (!selections.selectedDirection) {
      return;
    }

    setStoryPart("intro", intro);
    setStoryPart("directionOptions", directionOptions);
    setStoryPart(
      "story",
      buildStory(country, character, adventure, theme, mood, selections.selectedDirection),
    );
    router.push("/story/result");
  }

  return (
    <main className="min-h-screen bg-[#dff4ff] px-5 py-7 text-sky-950 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl">
        <StepHeader
          currentStep={8}
          title="Choose Your Story Direction"
          description="Here is the opening scene. Pick the path that feels most exciting to you."
        />

        <section className="rounded-3xl border-[3px] border-sky-950 bg-white/75 p-6 pixel-shadow md:p-8">
          <p className="pixel-text text-xs font-black uppercase tracking-[0.18em] text-sky-700">
            Your opening scene
          </p>
          <p className="mt-4 text-lg font-medium leading-8 text-sky-950">{intro}</p>
        </section>

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="pixel-text text-xs font-black uppercase tracking-[0.18em] text-sky-700">
                Make a choice
              </p>
              <h2 className="mt-2 text-2xl font-black text-sky-950">Where should the story go?</h2>
            </div>
            <span className="text-3xl" aria-hidden="true">🧭</span>
          </div>
          <div className="mt-5 grid gap-4">
            {directionOptions.map((direction, index) => (
              <StoryDirectionCard
                key={direction}
                direction={direction}
                index={index}
                selected={selections.selectedDirection === direction}
                onSelect={() => setStoryPart("selectedDirection", direction)}
              />
            ))}
          </div>
        </section>

        <NavigationButtons
          backHref="/create/length"
          nextLabel="Continue the Story"
          nextDisabled={!selections.selectedDirection}
          onNext={handleNext}
        />
      </div>
    </main>
  );
}
