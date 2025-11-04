import { ComingSoon } from "@/components/ui/ComingSoon";

export default function StoryPage() {
  return (
    <ComingSoon
      title="Our Story"
      description="Discover the journey of Mehroob and how we're bringing premium skincare to Pakistan. Our complete story is being crafted with care."
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

