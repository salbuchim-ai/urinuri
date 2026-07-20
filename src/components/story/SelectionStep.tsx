"use client";

import { useRouter } from "next/navigation";
import { AdventureCard } from "@/components/story/AdventureCard";
import { CharacterCard } from "@/components/story/CharacterCard";
import { CountryCard } from "@/components/story/CountryCard";
import { MoodCard } from "@/components/story/MoodCard";
import { NavigationButtons } from "@/components/story/NavigationButtons";
import { StepHeader } from "@/components/story/StepHeader";
import { ThemeCard } from "@/components/story/ThemeCard";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";
import type { StoryOption, StorySelectionKey } from "@/types/story";

type SelectionStepProps = {
  currentStep: number;
  stepName: string;
  title: string;
  selectionKey: StorySelectionKey;
  options: StoryOption[];
  backHref: string;
  nextHref: string;
  cardType: "country" | "character" | "adventure" | "mood" | "theme";
};

export function SelectionStep({
  currentStep,
  stepName,
  title,
  selectionKey,
  options,
  backHref,
  nextHref,
  cardType,
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
    <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
      <div className="mx-auto w-full max-w-[390px]">
        <StepHeader currentStep={currentStep} stepName={stepName} />
        <section className="rounded-lg border border-slate-200 bg-[#f8fafc] px-2.5 py-2.5 shadow-sm">
          <h2 className="text-center text-sm font-black">{title}</h2>
          <div className="mx-auto mt-3 max-w-[150px]">
            <StepHeaderProgress currentStep={currentStep} />
          </div>
          <div className={`mt-4 grid gap-1.5 ${cardType === "country" || cardType === "adventure" ? "grid-cols-1" : "grid-cols-1"}`}>
            {options.map((option) => {
              const cardProps = {
                option,
                selected: selectedValue === option.id,
                onSelect: () => setSelection(selectionKey, option.id),
              };

              if (cardType === "country") return <CountryCard key={option.id} {...cardProps} />;
              if (cardType === "character") return <CharacterCard key={option.id} {...cardProps} />;
              if (cardType === "adventure") return <AdventureCard key={option.id} {...cardProps} />;
              if (cardType === "mood") return <MoodCard key={option.id} {...cardProps} />;
              return <ThemeCard key={option.id} {...cardProps} />;
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

function StepHeaderProgress({ currentStep }: { currentStep: number }) {
  const points = 4;
  const activePoint = currentStep === 1 ? 1 : currentStep === 6 ? 4 : Math.min(3, currentStep);

  return (
    <div className="flex items-center" aria-hidden="true">
      {Array.from({ length: points }, (_, index) => {
        const point = index + 1;
        return (
          <span key={point} className="flex flex-1 items-center last:flex-none">
            <span className={`h-3 w-3 rounded-full border-2 border-blue-600 bg-white ${point < activePoint ? "bg-blue-700" : point === activePoint ? "bg-[#16802d]" : ""}`} />
            {point < points ? <span className="h-0.5 flex-1 bg-blue-600" /> : null}
          </span>
        );
      })}
    </div>
  );
}
