"use client";

import type { StoryOption } from "@/types/story";
import { StoryIcon } from "@/components/story/StoryIcon";

export function ThemeCard({ option, selected, onSelect }: { option: StoryOption; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex min-h-12 w-full items-center gap-4 rounded-lg border bg-white px-4 text-left transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${selected ? "border-amber-500 ring-2 ring-amber-400" : "border-slate-300 hover:border-blue-500"}`}
    >
      <StoryIcon src={option.iconSrc ?? ""} alt="" className="h-9 w-9 shrink-0" />
      <span className="text-sm font-black text-slate-950">{option.title}</span>
    </button>
  );
}
