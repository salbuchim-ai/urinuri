"use client";

import { useRouter } from "next/navigation";
import { lengths } from "@/data/lengths";
import { NavigationButtons } from "@/components/story/NavigationButtons";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";
import { StepHeader } from "@/components/story/StepHeader";
import { StoryLengthCard } from "@/components/story/StoryLengthCard";
import { useStoryFlow } from "@/components/story/StoryFlowProvider";

export function LengthStep() {
  const router = useRouter();
  const { selections, setSelection } = useStoryFlow();

  function handleNext() {
    if (selections.length) {
      router.push("/story/result");
    }
  }

  return (
    <main className="min-h-screen bg-white px-3 py-4 text-slate-950 sm:px-5">
      <div className="mx-auto w-full max-w-[390px]">
        <StepHeader currentStep={6} stepName="Story Length" />
        <section className="rounded-lg border border-slate-200 bg-[#f8fafc] px-2.5 py-2.5 shadow-sm">
          <h2 className="text-center text-sm font-black">Choose Length</h2>
          <div className="mx-auto mt-3 max-w-[150px]">
            <ProgressIndicator currentStep={4} totalSteps={4} />
          </div>
          <div className="mt-4 grid gap-1.5">
            {lengths.map((option) => (
              <StoryLengthCard
                key={option.id}
                option={option}
                selected={selections.length === option.id}
                onSelect={() => setSelection("length", option.id)}
              />
            ))}
          </div>
          <NavigationButtons
            backHref="/create/theme"
            nextLabel="Next"
            nextDisabled={!selections.length}
            onNext={handleNext}
          />
        </section>
      </div>
    </main>
  );
}
