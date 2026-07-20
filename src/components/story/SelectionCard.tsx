"use client";

import type { StoryOption } from "@/types/story";
import { StoryIcon } from "@/components/story/StoryIcon";

type SelectionCardProps = {
  option: StoryOption;
  selected: boolean;
  onSelect: () => void;
  visual?: React.ReactNode;
  className?: string;
};

export function SelectionCard({
  option,
  selected,
  onSelect,
  visual,
  className = "",
}: SelectionCardProps) {
  const iconClass = option.iconBackground;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`group relative flex min-h-52 flex-col items-center rounded-2xl border-[3px] bg-white/90 p-5 text-center pixel-shadow transition hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-200 ${
        selected
          ? "border-sky-950 bg-yellow-50 shadow-[7px_7px_0_rgba(21,50,75,0.22)]"
          : "border-sky-950/15 hover:border-sky-950/40"
      } ${className}`}
    >
      <span
        className={`pixel-art flex h-24 w-full items-center justify-center rounded-xl ${iconClass}`}
        aria-hidden="true"
      >
        {visual ?? (
          option.iconSrc ? (
            <StoryIcon src={option.iconSrc} alt="" className="h-20 w-20" />
          ) : (
            <span className="text-sm font-black text-sky-950">{option.title}</span>
          )
        )}
      </span>
      <span className="mt-5 text-xl font-black text-sky-950">{option.title}</span>
      <span className="mt-2 text-sm font-medium leading-6 text-sky-900/70">
        {option.description}
      </span>
      <span
        className={`absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md border-2 text-sm font-black transition ${
          selected
            ? "border-sky-950 bg-yellow-400 text-sky-950"
            : "border-sky-950/15 bg-white text-transparent"
        }`}
        aria-hidden="true"
      >
        ✓
      </span>
    </button>
  );
}
