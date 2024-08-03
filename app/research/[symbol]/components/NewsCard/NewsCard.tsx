import { FC } from "react";

import { getTickerNews } from "@/lib/api/getTickerNews";

import { NewsCardClient } from "./components/NewsCard.client";

export const NewsCard: FC<{
  symbol: string;
}> = async ({ symbol }) => {
  const data = await getTickerNews(symbol, 20);

  return <NewsCardClient initData={data} symbol={symbol} />;
};
