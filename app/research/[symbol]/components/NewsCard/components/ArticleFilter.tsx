"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ArticleFilter: FC<{
  options: string[];
}> = ({ options }) => {
  const router = useRouter();

  // using window
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (filter: string) => {
    const url = new URL(pathname, window.location.origin);

    if (filter === "custom_name") {
      url.searchParams.delete("news_filter");
    } else {
      url.searchParams.set("news_filter", encodeURI(filter));
    }
    router.replace(url.toString(), { scroll: false });
  };

  return (
    <Select onValueChange={handleFilterChange}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value={"custom_name"} key={"custom_name"}>
          All
        </SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
