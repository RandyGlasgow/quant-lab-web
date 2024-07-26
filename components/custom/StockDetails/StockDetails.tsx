import { FC } from "react";

import { getSymbolSnapshot } from "@/api/SymbolInfo/getSymbolSnapshot";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CardGroup } from "./components/CardGroup.client";

export const StockDetails: FC<{ symbol: string }> = async ({ symbol }) => {
  const data = await getSymbolSnapshot(symbol.toUpperCase());
  const result = data.tickers?.[0];
  if (!result) {
    return null;
  }

  const {
    day,
    lastQuote,
    lastTrade,
    min,
    prevDay,
    ticker,
    todaysChange,
    todaysChangePerc,
  } = result;

  return <CardGroup initialData={data} symbol={symbol} />;
};
