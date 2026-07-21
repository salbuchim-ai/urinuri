"use client";

import Image from "next/image";
import type { StoryOption } from "@/types/story";

export function AdventureCard({
  option,
  selected,
  onSelect,
}: {
  option: StoryOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`relative flex h-[94px] w-full overflow-hidden rounded-lg border text-left transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
        selected ? "border-amber-500 ring-2 ring-amber-400" : "border-slate-300 hover:border-blue-500"
      }`}
    >
      <Image
        src={`/generated/adventures/${option.id}.png`}
        alt={`${option.title} landscape`}
        fill
        unoptimized
        sizes="390px"
        className="pixel-art pixel-scene-drift object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      <span className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" aria-hidden="true" />
      <span className="relative flex w-full items-end justify-center pb-3 text-center">
        <span className="rounded bg-white/80 px-2 py-1 text-sm font-black text-slate-950">{option.title}</span>
      </span>
    </button>
  );
}
