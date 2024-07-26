"use client";
import { FC } from "react";

import { getSymbolSnapshot } from "@/api/SymbolInfo/getSymbolSnapshot";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { numValOrFallback } from "@/lib/utils";
import {
  ISnapshotAllTickersQuery,
  ISnapshotTickers,
} from "@polygon.io/client-js";
import { useQuery } from "@tanstack/react-query";

import { DetailCard } from "./DetailCard";

export const CardGroup: FC<{
  initialData: ISnapshotTickers;
  symbol: string;
}> = ({ initialData, symbol }) => {
  const { data, isFetching } = useQuery({
    initialData: initialData,
    queryKey: ["snapshot-ticker", symbol],
    refetchInterval: 1000 * 5,
    queryFn: async () => await getSymbolSnapshot(symbol),
  });

  const result = data.tickers?.[0];
  if (!result) {
    return null;
  }

  const isPositive = numValOrFallback(result.todaysChange) > 0;
  const percentChange = numValOrFallback(result.todaysChangePerc);
  const change = numValOrFallback(result.todaysChange);
  return (
    <div className="grid grid-cols-2 gap-2">
      <DetailCard
        value={percentChange.toFixed(2).toString() + "%"}
        title="Todays Change %"
        isPositive={isPositive}
        isFetching={isFetching}
        useColor
      />
      <DetailCard
        title="Todays Change"
        value={"$" + change.toFixed(2).toString()}
        isPositive={isPositive}
        isFetching={isFetching}
        useColor
      />
    </div>
  );
};
