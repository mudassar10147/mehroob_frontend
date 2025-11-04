import { ComingSoon } from "@/components/ui/ComingSoon";

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact Us"
      description="Get in touch with us! Our contact form and customer support features are being developed. Soon you'll be able to reach out to us directly."
      showBackButton={true}
      backButtonHref="/"
      backButtonText="Back to Home"
    />
  );
}

