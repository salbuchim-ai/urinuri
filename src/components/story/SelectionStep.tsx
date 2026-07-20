"use client";

import { useRouter } from "next/navigation";
import { AdventureCard } from "@/components/story/AdventureCard";
import { CharacterCard } from "@/components/story/CharacterCard";
import { NavigationButtons } from "@/components/story/NavigationButtons";
import { SelectionCard } from "@/components/story/SelectionCard";
import { StepHeader } from "@/components/story/StepHeader";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type { StoryOption, StorySelectionKey } from "@/types/story";

type SelectionStepProps = {
  currentStep: number;
  title: string;
  description: string;
  selectionKey: StorySelectionKey;
  options: StoryOption[];
  backHref: string;
  nextHref: string;
  cardVariant?: "character" | "adventure" | "default";
};

export function SelectionStep({
  currentStep,
  title,
  description,
  selectionKey,
  options,
  backHref,
  nextHref,
  cardVariant = "default",
}: SelectionStepProps) {
  const router = useRouter();
  const { selections, setSelection } = useStoryFlow();
  const selectedValue = selections[selectionKey];

  function handleNext() {
    if (selectedValue) {
      router.push(nextHref);
    }
  }

  return (
    <main className="min-h-screen bg-[#dff4ff] px-5 py-7 text-sky-950 md:px-10 md:py-10">
      <div className="mx-auto max-w-6xl">
        <StepHeader currentStep={currentStep} title={title} description={description} />

        <section aria-label={`${title} options`}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((option) => {
              const cardProps = {
                option,
                selected: selectedValue === option.id,
                onSelect: () => setSelection(selectionKey, option.id),
              };

              if (cardVariant === "character") {
                return <CharacterCard key={option.id} {...cardProps} />;
              }

              if (cardVariant === "adventure") {
                return <AdventureCard key={option.id} {...cardProps} />;
              }

              return <SelectionCard key={option.id} {...cardProps} />;
            })}
          </div>

          <NavigationButtons
            backHref={backHref}
            nextLabel="Next"
            nextDisabled={!selectedValue}
            onNext={handleNext}
          />
        </section>
      </div>
    </main>
  );
}
