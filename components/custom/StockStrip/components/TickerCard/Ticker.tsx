import Link from "next/link";
import { FC } from "react";

import { Button } from "@/components/ui/button";
import { API } from "@/lib/types/types";
import { numValOrFallback } from "@/lib/utils";
import { ISnapshotTickers } from "@polygon.io/client-js";

// remove the undefined type attached to this ISnapshotTickers

export const Ticker: FC<{
  ticker: Exclude<ISnapshotTickers["tickers"], undefined>[number];
}> = ({ ticker }) => {
  const change = ticker.todaysChange!;
  const isPositive = change! > 0;
  const changePercent = ticker.todaysChangePerc!;

  return (
    <Button
      variant="outline"
      className={`${
        isPositive ? "text-green-500" : "text-red-400"
      } first:pl-2 last:pr-2 bg-white`}
      asChild
    >
      <Link href={`/research/${ticker.ticker}?measure=1d`}>
        {ticker.ticker} ${change.toFixed(2)} ({changePercent.toFixed(2)}
        %)
      </Link>
    </Button>
  );
};
