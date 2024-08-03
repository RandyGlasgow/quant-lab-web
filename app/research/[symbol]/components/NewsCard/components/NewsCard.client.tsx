import dynamic from "next/dynamic";
import { FC } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ITickerNews } from "@polygon.io/client-js";

import { ArticleList } from "./ArticleList";

const DynamicFilter = dynamic(
  () => import("./ArticleFilter").then((mod) => mod.ArticleFilter),
  { ssr: false }
);

export const NewsCardClient: FC<{
  initData: ITickerNews["results"];
  symbol: string;
}> = ({ initData: data = [] }) => {
  // get the keys from the data and then dedupe them using a Set, convert that set into an array of strings
  const keys = Array.from(new Set(data.map((d) => d.publisher.name!)));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 border-b">
        <CardTitle className="text-xl">News</CardTitle>
        <DynamicFilter options={keys} />
      </CardHeader>
      <ArticleList data={data} />
    </Card>
  );
};
