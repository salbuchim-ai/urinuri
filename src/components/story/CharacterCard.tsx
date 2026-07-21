"use client";

import { CharacterSprite } from "@/components/story/CharacterSprite";
import type { CharacterId, CharacterOption, CharacterPose } from "@/types/story";

export function CharacterCard({
  option,
  selected,
  onSelect,
}: {
  option: CharacterOption;
  selected: boolean;
  onSelect: () => void;
  }) {
  const pose: CharacterPose = selected ? "action" : "front";
  const display = pose === "front" ? option.display : undefined;
  const spriteStyle = display
    ? {
        transform: `translateX(${display.cardFrontOffsetX ?? 0}px) scale(${display.cardFrontScale ?? 1})`,
      }
    : undefined;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex min-h-12 w-full items-center gap-4 rounded-lg border bg-white px-3 text-left transition focus:outline-none focus:ring-4 focus:ring-blue-100 ${
        selected ? "border-amber-500 ring-2 ring-amber-400" : "border-slate-300 hover:border-blue-500"
      }`}
    >
      <span className="relative h-10 w-14 shrink-0 overflow-hidden bg-white [contain:paint]">
        <span className="pixel-character-card absolute inset-0 flex items-center justify-center overflow-hidden">
          <CharacterSprite
            characterId={option.id as CharacterId}
            pose={pose}
            label={option.title}
            className="h-full w-full bg-transparent"
            style={spriteStyle}
          />
        </span>
      </span>
      <span className="text-sm font-black text-slate-950">{option.title}</span>
    </button>
  );
}
