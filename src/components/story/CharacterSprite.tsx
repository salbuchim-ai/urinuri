import Image from "next/image";
import type { CSSProperties } from "react";
import { characters } from "@/data/characters";
import { getCharacterAssetPath, getOptionalCharacterAssetPath } from "@/data/character-assets";
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
  const blink = pose === "front" ? character?.display?.blink : undefined;
  const blinkDelay = pose === "front" ? character?.display?.blinkDelay ?? blink?.delay : undefined;
  const blinkAssetPath =
    pose === "front" && characterId
      ? getOptionalCharacterAssetPath(characterId, "blink")
      : null;

  function getEyeStyle(eye: NonNullable<typeof blink>["left"]) {
    return {
      left: `${eye.x}%`,
      top: `${eye.y}%`,
      width: `${eye.width}%`,
      height: `${eye.height}%`,
      backgroundColor: blink?.maskColor,
      animationDelay: blink?.delay,
    };
  }

  return (
    <span
      className={`pixel-art relative flex items-center justify-center overflow-hidden bg-transparent ${className}`}
      style={style}
      role="img"
      aria-label={characterLabel}
    >
      <span className="pixel-sprite-stage">
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
        {blinkAssetPath ? (
          <Image
            src={blinkAssetPath}
            alt=""
            fill
            unoptimized
            sizes="160px"
            className="pixel-art pixel-blink-image object-contain"
            style={{
              imageRendering: "pixelated",
              animationDelay: blinkDelay,
            }}
          />
        ) : blink ? (
          <>
            <span className="pixel-blink-mask" style={getEyeStyle(blink.left)} aria-hidden="true">
              <span className="pixel-blink-line" style={{ backgroundColor: blink.lineColor }} />
            </span>
            <span className="pixel-blink-mask" style={getEyeStyle(blink.right)} aria-hidden="true">
              <span className="pixel-blink-line" style={{ backgroundColor: blink.lineColor }} />
            </span>
          </>
        ) : null}
      </span>
    </span>
  );
}
