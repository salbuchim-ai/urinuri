import type { AdventureId } from "@/types/story";

type SceneMotionOverlayProps = {
  scene: AdventureId;
  compact?: boolean;
};

const particleIndexes = [1, 2, 3, 4, 5, 6, 7, 8];

export function SceneMotionOverlay({ scene, compact = false }: SceneMotionOverlayProps) {
  const hasWind = scene === "mystic-mountain" || scene === "near-village";
  const hasWater = scene === "underwater-kingdom" || scene === "near-village";
  const hasNight = scene === "moonlit-forest";

  return (
    <div
      className={`scene-motion-overlay scene-motion-${scene} ${compact ? "scene-motion-compact" : ""}`}
      aria-hidden="true"
    >
      <div className="scene-motion-layer scene-motion-layer-atmosphere">
        {hasWind
          ? particleIndexes.slice(0, scene === "near-village" ? 7 : 6).map((index) => (
              <span key={`leaf-${index}`} className={`pixel-motion-leaf pixel-motion-particle-${index}`} />
            ))
          : null}

        {hasNight
          ? particleIndexes.map((index) => (
              <span key={`firefly-${index}`} className={`pixel-motion-firefly pixel-motion-particle-${index}`} />
            ))
          : null}
      </div>

      {hasWater ? (
        <div className="scene-motion-layer scene-motion-layer-water">
          {scene === "underwater-kingdom"
            ? particleIndexes.map((index) => (
                <span key={`bubble-${index}`} className={`pixel-motion-bubble pixel-motion-particle-${index}`} />
              ))
            : null}
          {scene === "underwater-kingdom"
            ? [1, 2, 3, 4, 5, 6].map((index) => (
                <span key={`fish-${index}`} className={`pixel-motion-fish pixel-motion-fish-${index}`} />
              ))
            : null}
          {scene === "near-village"
            ? [1, 2, 3, 4].map((index) => (
                <span key={`stream-${index}`} className={`pixel-motion-stream pixel-motion-stream-${index}`} />
              ))
            : null}
        </div>
      ) : null}

      {scene === "mystic-mountain" ? (
        <div className="scene-motion-layer scene-motion-layer-clouds">
          <span className="pixel-motion-cloud pixel-motion-cloud-1" />
          <span className="pixel-motion-cloud pixel-motion-cloud-2" />
        </div>
      ) : null}

      {hasNight ? (
        <div className="scene-motion-layer scene-motion-layer-night">
          <span className="pixel-motion-lantern pixel-motion-lantern-1" />
          <span className="pixel-motion-lantern pixel-motion-lantern-2" />
        </div>
      ) : null}
    </div>
  );
}
