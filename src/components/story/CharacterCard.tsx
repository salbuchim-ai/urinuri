"use client";

import { CharacterSprite } from "@/components/story/CharacterSprite";
import type { CharacterId, StoryOption } from "@/types/story";

export function CharacterCard({
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
      className={`flex min-h-12 w-full items-center gap-4 rounded-lg border bg-white px-3 text-left transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
        selected ? "border-amber-500 ring-2 ring-amber-400" : "border-slate-300 hover:border-blue-500"
      }`}
    >
      <span className="relative h-10 w-14 shrink-0 overflow-hidden bg-white">
        <CharacterSprite
          characterId={option.id as CharacterId}
          pose="front"
          label={option.title}
          className="h-full w-full bg-transparent"
        />
        <span className="pointer-events-none absolute left-0 top-0 z-10 h-3 w-7 bg-white" aria-hidden="true" />
      </span>
      <span className="text-sm font-black text-slate-950">{option.title}</span>
    </button>
  );
}
