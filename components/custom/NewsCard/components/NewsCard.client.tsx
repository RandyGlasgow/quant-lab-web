"use client";
import { FC, useState } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getTickerNews } from "@/lib/api/getTickerNews";
import { ITickerNews } from "@polygon.io/client-js";
import { useQuery } from "@tanstack/react-query";

import { ArticleFilter } from "./ArticleFilter";
import { ArticleList } from "./ArticleList";

export const NewsCardClient: FC<{
  initData: ITickerNews["results"];
  symbol: string;
}> = ({ initData = [], symbol }) => {
  const { data } = useQuery({
    initialData: initData,
    queryKey: ["article-filter", symbol],
    queryFn: () => getTickerNews(symbol, 20),
    // poll interval
    refetchInterval: 1_000_000,
  });
  const [filter, setFilter] = useState<string>("custom_name");
  const deDupedData = data.reduce<Record<string, string>>(
    (acc, current) => {
      if (!current.publisher.name) return acc;
      acc[current.publisher.name!] = current.publisher.name;
      return acc;
    },
    {}
  );

  const keys = Object.keys(deDupedData);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <CardTitle className="text-xl">News</CardTitle>
        <ArticleFilter options={keys} setFilter={setFilter} />
      </CardHeader>
      <ArticleList
        data={
          filter !== "custom_name"
            ? data.filter((d) => d.publisher.name === filter)
            : data
        }
      />
    </Card>
  );
};
