import { ComingSoon } from "@/components/ui/ComingSoon";

export default function AboutPage() {
  return (
    <ComingSoon
      title="About Us"
      description="Learn more about Mehroob and our mission to bring premium skincare to Pakistan. Our story is being crafted with care."
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

