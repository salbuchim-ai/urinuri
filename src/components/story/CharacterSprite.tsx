import Image from "next/image";
import type { CSSProperties } from "react";
import { characters } from "@/data/characters";
import { getCharacterAssetPath } from "@/data/character-assets";
import type { CharacterId, CharacterPose } from "@/types/story";

type CharacterSpriteProps = {
  characterId: CharacterId | null;
  pose?: CharacterPose;
  label?: string;
  className?: string;
  style?: CSSProperties;
};

export function CharacterSprite({
  characterId,
  pose = "front",
  label,
  className = "",
  style,
}: CharacterSpriteProps) {
  const character = characters.find((option) => option.id === characterId);
  const characterLabel = label ?? character?.title ?? "Character";
  const assetPath = characterId ? getCharacterAssetPath(characterId, pose) : null;

  return (
    <span
      className={`pixel-art relative flex items-center justify-center overflow-hidden bg-transparent ${className}`}
      style={style}
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
          className="pixel-art object-contain"
          style={{
            imageRendering: "pixelated",
          }}
        />
      ) : null}
    </span>
  );
}
