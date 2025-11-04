import { ComingSoon } from "@/components/ui/ComingSoon";

export default function OrdersPage() {
  return (
    <ComingSoon
      title="My Orders"
      description="View and manage your order history. Track your skincare journey with us. This feature is coming soon!"
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

