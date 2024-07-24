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
    // blur the background
    <span className="sticky top-0 backdrop-blur-lg backdrop:bg-white/80">
      <Marquee pauseOnHover>
        <div className="sticky top-0 flex gap-2 px-1 py-1">
          {data?.results?.map((ticker) => (
            <Ticker key={ticker.symbol} ticker={ticker} />
          ))}
        </div>
      </Marquee>
    </span>
  );
};
