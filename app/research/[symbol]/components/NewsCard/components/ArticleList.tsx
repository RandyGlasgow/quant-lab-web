"use client";
import { useSearchParams } from "next/navigation";
import { FC } from 'react';

import { CardContent } from "@/components/ui/card";
import { ITickerNews } from "@polygon.io/client-js";

import { Article } from './Article';

export const ArticleList: FC<{ data: ITickerNews["results"] }> = ({
  data,
}) => {
  const searchParams = useSearchParams();
  // look for the news_filter query param if it exists
  const filter = searchParams.get("news_filter");

  const displayData = !filter
    ? data
    : data.filter((d) => d.publisher.name === decodeURI(filter!));
  return (
    <CardContent className="grid gap-2 pt-4 overflow-auto max-h-[80dvh] divide-y-2">
      {displayData.map((d) => (
        <Article key={d.id} {...d} />
      ))}
    </CardContent>
  );
};
