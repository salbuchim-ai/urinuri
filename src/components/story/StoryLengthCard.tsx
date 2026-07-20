"use client";

import type { StoryOption } from "@/types/story";
import { StoryIcon } from "@/components/story/StoryIcon";

export function StoryLengthCard({ option, selected, onSelect }: { option: StoryOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative flex min-h-[78px] w-full items-center gap-3 rounded-lg border bg-white px-3 text-left transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${selected ? "border-amber-500 ring-2 ring-amber-400" : "border-slate-300 hover:border-blue-500"}`}
    >
      <StoryIcon src={option.iconSrc ?? ""} alt="" className="h-12 w-12 shrink-0" />
      <span>
        <span className="block text-sm font-black text-slate-950">{option.title}</span>
        <span className="mt-1 block text-xs font-bold text-slate-950">{option.description}</span>
      </span>
      <span className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded border text-xs font-black ${selected ? "border-amber-500 bg-amber-400 text-slate-950" : "border-slate-300 bg-white text-transparent"}`} aria-hidden="true">
        ✓
      </span>
    </button>
  );
}
