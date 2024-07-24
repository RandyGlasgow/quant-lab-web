"use client";

import Marquee from "react-fast-marquee";

import { useStockTickers } from "@/lib/queries/useStockTickers";
import { useQueries } from "@tanstack/react-query";

import { Ticker } from "./components/TickerCard/Ticker";

export const StockStrip = () => {
  const { data, isLoading } = useStockTickers();

  if (isLoading)
    return <div className="w-full h-9 bg-muted animate-pulse" />;

  return (
    <Marquee pauseOnHover>
      <div className="flex gap-2 px-1">
        {data?.results?.map((ticker) => (
          <Ticker key={ticker.symbol} ticker={ticker} />
        ))}
      </div>
    </Marquee>
  );
};
