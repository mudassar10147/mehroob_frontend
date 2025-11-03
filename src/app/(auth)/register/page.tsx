import { ComingSoon } from "@/components/ui/ComingSoon";

export default function RegisterPage() {
  return (
    <ComingSoon
      title="Create Account"
      description="Account creation is coming soon! You'll be able to register and create your personalized skincare journey with Mehroob."
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

