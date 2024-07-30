import { PageLayout } from "@/components/core/layouts/Page";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <PageLayout className="flex items-center justify-center">
      <SignIn />
    </PageLayout>
  );
}
