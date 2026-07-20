"use client";

import Link from "next/link";
import { PrimaryButton } from "@/components/story/PrimaryButton";

type NavigationButtonsProps = {
  backHref: string;
  nextLabel: string;
  nextDisabled: boolean;
  onNext: () => void;
};

export function NavigationButtons({ backHref, nextLabel, nextDisabled, onNext }: NavigationButtonsProps) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3 px-1">
      <Link
        href={backHref}
        className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 px-5 text-sm font-black text-slate-950 transition hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100"
      >
        Back
      </Link>
      <PrimaryButton disabled={nextDisabled} onClick={onNext} className="min-h-9 px-6">
        {nextLabel}
      </PrimaryButton>
    </div>
  );
}
