import Image from "next/image";
import { CharacterGroup } from "@/components/story/CharacterGroup";
import { SceneMotionOverlay } from "@/components/story/SceneMotionOverlay";
import type { AdventureId, CharacterId } from "@/types/story";

const adventureImages: Record<AdventureId, string> = {
  "mystic-mountain": "/generated/adventures/mystic-mountain.png",
  "underwater-kingdom": "/generated/adventures/underwater-kingdom.png",
  "moonlit-forest": "/generated/adventures/moonlit-forest.png",
  "near-village": "/generated/adventures/near-village.png",
};

export function StoryOpeningScene({
  characterIds,
  adventureId,
}: {
  characterIds: CharacterId[];
  adventureId: AdventureId;
}) {
  const characterWidth = characterIds.length > 1 ? "w-40" : "w-28";
  const characterNames = characterIds.length > 1 ? "the selected characters" : "the selected character";
  return (
    <div
      className="relative h-52 overflow-hidden rounded-t-lg border-b border-slate-200 bg-sky-100"
      role="img"
      aria-label={`Opening scene with ${characterNames}`}
    >
      <Image
        src={adventureImages[adventureId]}
        alt=""
        fill
        unoptimized
        sizes="390px"
        className="pixel-art pixel-scene-drift object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      <span className="absolute inset-0 bg-slate-950/10" aria-hidden="true" />
      <SceneMotionOverlay scene={adventureId} />
      <div className={`pixel-scene-characters absolute bottom-1 left-1/2 h-28 ${characterWidth} -translate-x-1/2`}>
        <CharacterGroup characterIds={characterIds} pose="front" className="h-full w-full" />
      </div>
    </div>
  );
}
