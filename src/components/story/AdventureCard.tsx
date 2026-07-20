"use client";

import { SelectionCard } from "@/components/story/SelectionCard";
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
    <SelectionCard
      option={option}
      selected={selected}
      onSelect={onSelect}
      className="min-h-60"
    />
  );
}
