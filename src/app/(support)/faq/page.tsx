import { ComingSoon } from "@/components/ui/ComingSoon";

export default function FAQPage() {
  return (
    <ComingSoon
      title="Frequently Asked Questions"
      description="Your questions, answered. We're compiling a comprehensive FAQ section to help you with common inquiries about our products, shipping, returns, and more."
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

