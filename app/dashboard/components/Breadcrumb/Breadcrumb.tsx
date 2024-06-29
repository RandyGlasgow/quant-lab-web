"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DashboardIcon, DashIcon } from "@radix-ui/react-icons";

import { TooltipLink } from "../Tooltips/TooltipLink";

export const PageBreadcrumbs: FC = () => {
  const path = usePathname();

  const parts = path
    .split("/")
    .filter(Boolean)
    .map((p, idx, arr) => {
      const isLast = idx === arr.length - 1;
      const isFirst = idx === 0;
      const capitalized = p.charAt(0).toUpperCase() + p.slice(1);

      if (isFirst) {
        return (
          <BreadcrumbItem key={p}>
            <BreadcrumbLink asChild>
              <TooltipLink
                href="#"
                icon={DashboardIcon}
                label={capitalized}
              />
            </BreadcrumbLink>
            {!isLast && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        );
      }

      if (isLast) {
        return (
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalized}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      }

      return (
        <BreadcrumbItem key={p}>
          <BreadcrumbLink asChild>
            <Link href={`/${arr.slice(0, idx + 1).join("/")}`}>
              {capitalized}
            </Link>
          </BreadcrumbLink>
          {!isLast && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      );
    });
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>{parts}</BreadcrumbList>
    </Breadcrumb>
  );
};
