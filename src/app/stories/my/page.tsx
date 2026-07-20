import { FeatureLanding } from "@/components/story/FeatureLanding";

export default function MyStoriesPage() {
  return (
    <FeatureLanding
      title="My Stories"
      description="Revisit the stories you’ve created and manage your story collection."
      buttonLabel="My Stories"
      href="/create"
      variant="village"
    />
  );
}
