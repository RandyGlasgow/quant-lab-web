import { PageLayout } from '@/components/core/layouts/page';
import { BreadcrumbNav } from '@/components/core/shared/navigation/Breadcrumb/BreadcrumbNav';
import { GlobalNav } from '@/components/core/shared/navigation/GlobalNav/GlobalNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
