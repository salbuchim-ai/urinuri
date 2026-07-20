"use client";

import Link from "next/link";

type NavigationButtonsProps = {
  backHref: string;
  nextLabel: string;
  nextDisabled: boolean;
  onNext: () => void;
};

export function NavigationButtons({
  backHref,
  nextLabel,
  nextDisabled,
  onNext,
}: NavigationButtonsProps) {
  return (
    <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      <Link
        href={backHref}
        className="inline-flex min-h-14 items-center justify-center rounded-xl border-[3px] border-sky-950/20 bg-white/85 px-7 font-black text-sky-900 transition hover:border-sky-950/45 hover:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-200"
      >
        ← Back
      </Link>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl border-[3px] border-sky-950 bg-yellow-400 px-8 font-black text-sky-950 pixel-shadow transition hover:-translate-y-0.5 hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-200 disabled:border-slate-300 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
      >
        {nextLabel}
        <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}
