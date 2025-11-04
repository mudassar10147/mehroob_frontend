import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ReturnsPage() {
  return (
    <ComingSoon
      title="Returns & Refunds"
      description="Our return and refund policy details are being finalized. Soon you'll have complete information about how to return products and receive refunds."
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

