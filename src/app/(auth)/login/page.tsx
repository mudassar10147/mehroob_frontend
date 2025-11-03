import { ComingSoon } from "@/components/ui/ComingSoon";

export default function LoginPage() {
  return (
    <ComingSoon
      title="Sign In"
      description="Authentication features are being developed. Soon you'll be able to sign in to your account and access exclusive features."
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

