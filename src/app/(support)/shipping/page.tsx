import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ShippingPage() {
  return (
    <ComingSoon
      title="Shipping Information"
      description="Learn about our shipping policies, delivery times, and shipping options. Detailed shipping information is coming soon!"
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

