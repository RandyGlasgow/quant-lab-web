"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
    Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { capitalize } from '@/lib/capitalize';
import { ChevronLeftIcon, HomeIcon } from '@radix-ui/react-icons';

export const BreadcrumbNav = () => {
  const pathname = usePathname().split("/").filter(Boolean);

  return (
    <Breadcrumb className="">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <HomeIcon />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathname.map((path, index) => (
          <BreadcrumbItem key={index}>
            {index === pathname.length - 1 ? (
              <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={`/${pathname.slice(0, index + 1).join("/")}`}>
                  <ChevronLeftIcon />
                  {capitalize(path)}
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
