import Link from "next/link";
import { ProgressIndicator } from "@/components/story/ProgressIndicator";

type StepHeaderProps = {
  currentStep: number;
  title: string;
  description: string;
  totalSteps?: number;
};

export function StepHeader({
  currentStep,
  title,
  description,
  totalSteps = 10,
}: StepHeaderProps) {
  return (
    <header className="mb-10">
      <div className="mb-7 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl px-2 py-1 text-sm font-black text-sky-900 transition hover:bg-white/70 focus:outline-none focus:ring-4 focus:ring-yellow-200"
        >
          <span className="text-xl" aria-hidden="true">🌈</span>
          <span className="pixel-text">UriNuri</span>
        </Link>
        <span className="pixel-text rounded-lg bg-white/70 px-3 py-2 text-xs font-black text-sky-900">
          {currentStep} / {totalSteps}
        </span>
      </div>

      <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <p className="pixel-text mt-8 text-xs font-black uppercase tracking-[0.2em] text-sky-700">
        Create your story
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-sky-950 md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-sky-900/75 md:text-lg">
        {description}
      </p>
    </header>
  );
}
