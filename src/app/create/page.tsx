import { FeatureLanding } from "@/components/story/FeatureLanding";

export default function CreateStoryPage() {
  return (
    <FeatureLanding
      title="Create a Story"
      description="Create your very own story with characters, places, and adventures!"
      buttonLabel="Get Started"
      href="/create/country"
      variant="village"
    />
  );
}
