import { Metadata } from "next";
import { FC } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTickerNews } from "@/lib/api/getTickerNews";

import { ArticleElement } from "./components/ArticleElement";

type NewsCardProps = {
  symbol: string;
};

export const NewsCard: FC<NewsCardProps> = async ({ symbol }) => {
  const newsData = await getTickerNews(symbol);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>News Card</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 max-h-[550px] overflow-auto py-4">
        {newsData.map((article) => (
          <ArticleElement article={article} key={article.id} />
        ))}
      </CardContent>
    </Card>
  );
};
