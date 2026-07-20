"use client";

import { useState } from "react";
import Image from "next/image";
import { characters } from "@/data/characters";
import { getCharacterAssetPath } from "@/data/character-assets";
import type { CharacterId, CharacterPose } from "@/types/story";

type CharacterSpriteProps = {
  characterId: CharacterId | null;
  pose?: CharacterPose;
  fallbackEmoji?: string;
  label?: string;
  className?: string;
};

export function CharacterSprite({
  characterId,
  pose = "idle",
  fallbackEmoji = "✨",
  label,
  className = "",
}: CharacterSpriteProps) {
  const [assetFailed, setAssetFailed] = useState(false);
  const character = characters.find((option) => option.id === characterId);
  const characterLabel = label ?? character?.title ?? "Character";
  const assetPath = characterId ? getCharacterAssetPath(characterId, pose) : null;

  return (
    <span
      className={`pixel-art relative flex h-full min-h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-[#f7eee1] ${className}`}
      role="img"
      aria-label={characterLabel}
    >
      {assetPath && !assetFailed ? (
        <Image
          src={assetPath}
          alt=""
          width={256}
          height={256}
          unoptimized
          className="pixel-art h-full w-full object-contain"
          onError={() => setAssetFailed(true)}
        />
      ) : (
        <span className="pixel-sprite-placeholder" aria-hidden="true">
          {fallbackEmoji}
        </span>
      )}
      {assetFailed ? (
        <span className="pixel-text absolute bottom-1 left-1/2 -translate-x-1/2 rounded bg-sky-950 px-1.5 py-0.5 text-[8px] font-black uppercase text-white">
          sprite placeholder
        </span>
      ) : null}
    </span>
  );
}
