import { FC } from "react";

import { Button } from "@/components/ui/button";
import { API } from "@/lib/types/types";
import { cn } from "@/lib/utils";

export const Ticker: FC<{ ticker: API["eod/latest"]["data"][number] }> = ({
  ticker,
}) => {
  const change = ticker.open - ticker.close;
  const isPositive = change > 0;
  const changePercent = (change / ticker.open) * 100;
  return (
    <Button
      variant="outline"
      className={`${isPositive ? "text-green-500" : "text-red-400"}`}
    >
      {ticker.symbol} ${change.toFixed(2)} ({changePercent.toFixed(2)}%)
    </Button>
  );
};
