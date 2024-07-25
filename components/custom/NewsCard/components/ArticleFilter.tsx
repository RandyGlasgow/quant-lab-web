"use client";
import { FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTickerNews } from "@/lib/api/getTickerNews";
import { ITickerNews } from "@polygon.io/client-js";
import { useQuery } from "@tanstack/react-query";

export const ArticleFilter: FC<{
  setFilter: (filter: string) => void;
  options: string[];
}> = ({ options, setFilter }) => {
  return (
    <Select onValueChange={setFilter}>
      <SelectTrigger className="w-52">
        <SelectValue placeholder="All" />
      </SelectTrigger>
      <SelectContent align="end">
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
