import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { API } from "@/lib/types/types";
import { getIsWeekend, numValOrFallback } from "@/lib/utils";
import { ISnapshotTickers } from "@polygon.io/client-js";

// remove the undefined type attached to this ISnapshotTickers

export const Ticker: FC<{
  ticker: Exclude<ISnapshotTickers["tickers"], undefined>[number];
}> = ({ ticker }) => {
  const change = numValOrFallback(ticker.todaysChange);
  const isPositive = change! > 0;
  const changePercent = numValOrFallback(ticker.todaysChangePerc);

  const isWeekend = getIsWeekend();

  return (
    <Button
      variant="outline"
      className={`${
        isPositive ? "text-green-500" : "text-red-400"
      } first:pl-2 last:pr-2 bg-white`}
      asChild
    >
      <Link
        href={`/research/${ticker.ticker}?measure=${
          !isWeekend ? "1d" : "5d"
        }`}
      >
        {ticker.ticker} ${change?.toFixed(2)} ({changePercent?.toFixed(2)}
        %)
      </Link>
    </Button>
  );
};
