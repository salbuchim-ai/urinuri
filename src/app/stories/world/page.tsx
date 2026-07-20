import { FeatureLanding } from "@/components/story/FeatureLanding";

export default function WorldStoriesPage() {
  return (
    <FeatureLanding
      title="Stories Around the World"
      description="Discover folktales and legends from around the world!"
      buttonLabel="Explore"
      href="/stories/world"
      variant="legend"
    />
  );
}
