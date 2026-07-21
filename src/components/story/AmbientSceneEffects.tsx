import { SceneMotionOverlay } from "@/components/story/SceneMotionOverlay";

type AmbientSceneEffectsProps = {
  kind: "wind" | "water" | "night";
};

export function AmbientSceneEffects({ kind }: AmbientSceneEffectsProps) {
  const scene = kind === "water"
    ? "underwater-kingdom"
    : kind === "night"
      ? "moonlit-forest"
      : "near-village";

  return <SceneMotionOverlay scene={scene} />;
}
