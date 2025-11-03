import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ProfilePage() {
  return (
    <ComingSoon
      title="My Profile"
      description="Manage your account settings, preferences, and personal information. This feature is coming soon!"
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

