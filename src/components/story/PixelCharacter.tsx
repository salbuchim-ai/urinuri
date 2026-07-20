import { characters } from "@/data/characters";
import { CharacterSprite } from "@/components/story/CharacterSprite";
import type { CharacterId, CharacterPose } from "@/types/story";

export function PixelCharacter({
  characterId,
  pose = "front",
  className = "",
}: {
  characterId: CharacterId | null;
  pose?: CharacterPose;
  className?: string;
}) {
  const character = characters.find((option) => option.id === characterId) ?? characters[0];

  return (
    <div className={`pixel-bob h-40 w-40 drop-shadow-[5px_5px_0_rgba(21,50,75,0.18)] ${className}`}>
      <CharacterSprite
        characterId={characterId}
        pose={pose}
        label={`${character.title} pixel character`}
        hideSourceLabel
        className="h-full w-full bg-transparent"
      />
    </div>
  );
}
