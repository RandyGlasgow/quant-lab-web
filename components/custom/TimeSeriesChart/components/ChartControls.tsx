"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Measure, useSymbolTimeSeries } from '@/lib/queries/useSymbolTimeSeries';

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
  return (
    <CardContent className="flex justify-between pt-4 pb-0">
      <span></span>
      <Tabs
        defaultValue={checkMeasure(queryParams.get("measure") as string)}
        onValueChange={(v) => {
          const url = new URL(window.location.href);
          url.searchParams.set("measure", v as string);
          router.push(url.toString(), { scroll: false });
        }}
      >
        <TabsList>
          {TABS.map((tab) => (
            <TabsTrigger
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
