"use client";

import { SelectionCard } from "@/components/story/SelectionCard";
import { CharacterSprite } from "@/components/story/CharacterSprite";
import type { StoryOption } from "@/types/story";

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
    <SelectionCard
      option={option}
      selected={selected}
      onSelect={onSelect}
      visual={
        <CharacterSprite
          characterId={option.id as Parameters<typeof CharacterSprite>[0]["characterId"]}
          fallbackEmoji={option.emoji}
          label={option.title}
        />
      }
      className="min-h-48"
    />
  );
}
