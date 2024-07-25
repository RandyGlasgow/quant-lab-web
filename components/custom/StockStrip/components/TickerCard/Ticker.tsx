import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { API } from "@/lib/types/types";
import { numValOrFallback } from "@/lib/utils";
import { HoverCardPortal } from "@radix-ui/react-hover-card";

import { TickerCardContent } from "./TickerCard";

export const Ticker: FC<{
  ticker: API["eod/latest"]["results"][number];
}> = ({ ticker }) => {
  const change =
    numValOrFallback(ticker.close) - numValOrFallback(ticker.open);
  const isPositive = change > 0;
  const changePercent = (change / numValOrFallback(ticker.open, 1)) * 100;

  return (
    <Button
      variant="outline"
      className={`${
        isPositive ? "text-green-500" : "text-red-400"
      } first:pl-2 last:pr-2 bg-white`}
      asChild
    >
      <Link href={`/research/${ticker.symbol}`}>
        {ticker.symbol} ${change.toFixed(2)} ({changePercent.toFixed(2)}
        %)
      </Link>
    </Button>
  );
};
