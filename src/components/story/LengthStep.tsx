"use client";

import { useRouter } from "next/navigation";
import { lengths } from "@/data/lengths";
import { NavigationButtons } from "@/components/story/NavigationButtons";
import { SelectionCard } from "@/components/story/SelectionCard";
import { StepHeader } from "@/components/story/StepHeader";
import { StorySummary } from "@/components/story/StorySummary";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";

export function LengthStep() {
  const router = useRouter();
  const { selections, setSelection } = useStoryFlow();
  const selectedLength = selections.length;

  function handleNext() {
    if (selectedLength) {
      router.push("/story/generating");
    }
  }

  return (
    <main className="min-h-screen bg-[#dff4ff] px-5 py-7 text-sky-950 md:px-10 md:py-10">
      <div className="mx-auto max-w-6xl">
        <StepHeader
          currentStep={6}
          title="Choose Story Length"
          description="Choose how much room your story needs to grow. You can always create another one later."
        />

        <section aria-label="Story length options">
          <div className="grid gap-5 md:grid-cols-3">
            {lengths.map((option) => (
              <SelectionCard
                key={option.id}
                option={option}
                selected={selectedLength === option.id}
                onSelect={() => setSelection("length", option.id)}
              />
            ))}
          </div>

          <StorySummary selections={selections} />

          <NavigationButtons
            backHref="/create/mood"
            nextLabel="Begin My Story"
            nextDisabled={!selectedLength}
            onNext={handleNext}
          />
        </section>
      </div>
    </main>
  );
}
