import Image from "next/image";
import type { WorldStory } from "@/data/world-stories";

export function FolktaleIllustration({
  story,
  compact = false,
}: {
  story: WorldStory;
  compact?: boolean;
}) {
  const aspectClass = story.slug === "momotaro" ? "aspect-[3/2]" : "aspect-video";

  return (
    <div className={`relative overflow-hidden bg-sky-100 ${compact ? "h-44" : aspectClass}`}>
      <Image
        src={story.imageSrc}
        alt={story.imageAlt}
        fill
        sizes={compact ? "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" : "(min-width: 768px) 720px, 100vw"}
        className="pixel-art object-cover"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
