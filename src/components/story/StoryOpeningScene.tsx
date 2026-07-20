import Image from "next/image";
import { CharacterSprite } from "@/components/story/CharacterSprite";
import type { AdventureId, CharacterId } from "@/types/story";

const adventureImages: Record<AdventureId, string> = {
  "mystic-mountain": "/generated/adventures/mystic-mountain.png",
  "underwater-kingdom": "/generated/adventures/underwater-kingdom.png",
  "moonlit-forest": "/generated/adventures/moonlit-forest.png",
};

export function StoryOpeningScene({
  characterId,
  adventureId,
}: {
  characterId: CharacterId | null;
  adventureId: AdventureId;
}) {
  return (
    <div
      className="relative h-52 overflow-hidden rounded-t-lg border-b border-slate-200 bg-sky-100"
      role="img"
      aria-label="Opening scene with the selected character"
    >
      <Image
        src={adventureImages[adventureId]}
        alt=""
        fill
        unoptimized
        sizes="390px"
        className="pixel-art object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      <span className="absolute inset-0 bg-slate-950/10" aria-hidden="true" />
      <div className="absolute bottom-1 left-1/2 h-28 w-28 -translate-x-1/2">
        <CharacterSprite characterId={characterId} pose="front" hideSourceLabel className="h-full w-full" />
      </div>
    </div>
  );
}
