"use client";

import { init } from 'next/dist/compiled/webpack/webpack';
import { useSearchParams } from 'next/navigation';
import React, { FC, useMemo } from 'react';

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Measure, useSymbolTimeSeries } from '@/lib/queries/useSymbolTimeSeries';
import { useTickerInformation } from '@/lib/queries/useTickerInformation';
import { ITickerDetails } from '@polygon.io/client-js';

export const ChartHeader: FC<{
  symbol: string;
  initialSymbolInfo: ITickerDetails;
}> = ({ symbol, initialSymbolInfo }) => {
  const queryParams = useSearchParams();
  const measure = queryParams.get("measure") as Measure;
  const { data: symbolData } = useTickerInformation(
    symbol,
    initialSymbolInfo
  );
  const { data: chartData, isLoading } = useSymbolTimeSeries(
    symbol,
    measure
  );
  const total = useMemo(
    () =>
      chartData?.reduce<{ high: number; low: number }>(
        (acc, curr) => {
          if (curr.h && acc.high < curr.h) {
            acc.high = curr.h;
          }
          if (curr.l && acc.low > curr.l) {
            acc.low = curr.l;
          }
          return acc;
        },
        {
          high: 0,
          low: Infinity,
        }
      ),
    [chartData, measure]
  );
  const arrayOpt = ["high", "low"] as const;
  return (
    <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
      <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
        <CardTitle>{symbolData?.results?.name}</CardTitle>
        <CardDescription>
          {symbolData?.results?.description}
        </CardDescription>
      </div>
      <div className="flex">
        {arrayOpt.map((key) => {
          return (
            <span
              key={key}
              className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
            >
              <span className="text-xs text-muted-foreground">
                {key === "high" ? "High" : "Low"}
              </span>
              {isLoading ? (
                <span className="w-40 h-10 text-lg font-bold leading-none sm:text-3xl bg-muted animate-pulse" />
              ) : (
                <span className="w-40 text-lg font-bold leading-none sm:text-3xl">
                  ${total?.[key].toFixed(2).toLocaleString()}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </CardHeader>
  );
};
