import { characters } from "@/data/characters";
import { CharacterSprite } from "@/components/story/CharacterSprite";
import type { CharacterId, CharacterPose } from "@/types/story";

type CharacterGroupProps = {
  characterIds: CharacterId[];
  pose?: CharacterPose;
  className?: string;
};

export function CharacterGroup({ characterIds, pose = "front", className = "" }: CharacterGroupProps) {
  const visibleCharacterIds = characterIds.slice(0, 2);
  const characterNames = visibleCharacterIds
    .map((characterId) => characters.find((character) => character.id === characterId)?.title ?? "Character")
    .join(" and ");

  return (
    <div
      className={`pixel-character-group flex items-end justify-center gap-0.5 ${className}`}
      role="group"
      aria-label={characterNames || "Characters"}
    >
      {visibleCharacterIds.map((characterId) => (
        <span key={`${characterId}-${pose}`} className="relative h-full min-w-0 flex-1">
          <CharacterSprite
            characterId={characterId}
            pose={pose}
            label={characters.find((character) => character.id === characterId)?.title}
            className="h-full w-full"
          />
        </span>
      ))}
    </div>
  );
}
