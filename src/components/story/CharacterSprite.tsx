import Image from "next/image";
import { characters } from "@/data/characters";
import { getCharacterAssetPath } from "@/data/character-assets";
import type { CharacterId, CharacterPose } from "@/types/story";

type CharacterSpriteProps = {
  characterId: CharacterId | null;
  pose?: CharacterPose;
  label?: string;
  className?: string;
  hideSourceLabel?: boolean;
};

export function CharacterSprite({
  characterId,
  pose = "front",
  label,
  className = "",
  hideSourceLabel = false,
}: CharacterSpriteProps) {
  const character = characters.find((option) => option.id === characterId);
  const characterLabel = label ?? character?.title ?? "Character";
  const assetPath = characterId ? getCharacterAssetPath(characterId, pose) : null;

  return (
    <span
      className={`pixel-art relative flex items-center justify-center overflow-hidden bg-transparent ${className}`}
      role="img"
      aria-label={characterLabel}
    >
      {assetPath ? (
        <Image
          src={assetPath}
          alt=""
          fill
          unoptimized
          sizes="160px"
          className="pixel-art object-contain mix-blend-darken"
          style={{
            imageRendering: "pixelated",
            clipPath: hideSourceLabel ? "inset(12% 0 0 0)" : undefined,
          }}
        />
      ) : null}
    </span>
  );
}
