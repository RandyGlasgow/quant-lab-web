"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Measure, useSymbolTimeSeries } from '@/lib/queries/useSymbolTimeSeries';
import { getIsWeekend } from "@/lib/utils";

const TABS = ["1d", "5d", "1m", "3m", "6m", "1y", "5y"] as Measure[];

function checkMeasure(measure: string) {
  if (TABS.includes(measure as Measure)) {
    return measure as Measure;
  }
  return "5d";
}

export const ChartControls: React.FC<{
  symbol: string;
}> = ({ symbol }) => {
  const router = useRouter();
  const queryParams = useSearchParams();

  const { data: chartData, isLoading } = useSymbolTimeSeries(
    symbol,
    queryParams.get("measure") as Measure
  );
  const [hoveredMeasure, setHoveredMeasure] = useState<Measure>("1m");
  useSymbolTimeSeries(symbol, hoveredMeasure);


  const isWeekend = getIsWeekend();
  const availableMeasures = TABS.filter((tab) => {
    if (isWeekend) {
      return tab !== "1d";
    }
    return true;
  });

  return (
    <CardContent className="flex justify-center p-4 md:justify-between">
      <span></span>
      <Tabs
        className=""
        defaultValue={checkMeasure(queryParams.get("measure") as string)}
        onValueChange={(v) => {
          const url = new URL(window.location.href);
          url.searchParams.set("measure", v as string);
          router.push(url.toString(), { scroll: false });
        }}
      >
        <TabsList>
          {availableMeasures.map((tab) => (
            <TabsTrigger
              className="text-xs data-[state='active']:bg-slate-300 hover:bg-slate-300 hover:shadow-md"
              key={tab}
              value={tab}
              onMouseEnter={() => {
                setHoveredMeasure(tab);
              }}
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </CardContent>
  );
};
