import { ComingSoon } from "@/components/ui/ComingSoon";

export default function AdminPage() {
  return (
    <ComingSoon
      title="Admin Panel"
      description="Administrative dashboard for managing products, orders, and settings. This feature is coming soon!"
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

