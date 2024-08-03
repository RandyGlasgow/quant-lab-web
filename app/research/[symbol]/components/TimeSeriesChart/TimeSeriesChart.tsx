import dynamic from "next/dynamic";
import * as React from "react";

import { getSymbolInfo } from "@/api/SymbolInfo/getSymbolInfo";
import { Card, CardContent } from "@/components/ui/card";

import { ChartControls } from "./components/ChartControls";
import { ChartHeader } from "./components/ChartHeader";

const DynamicChart = dynamic(
  () =>
    import("./components/ChartContent").then((mod) => mod.ChartContent),
  {
    ssr: false,
    loading: () => (
      <CardContent className="px-2 sm:p-6">
        <div
          className={`aspect-auto lg:h-[550px] h-[325px] w-full bg-muted animate-pulse rounded-md`}
        />
      </CardContent>
    ),
  }
);

export const TimeSeriesChart: React.FC<{ symbol: string }> = async ({
  symbol,
}) => {
  const data = await getSymbolInfo(symbol);
  // const detailsData = await getSymbolSnapshot(symbol);
  return (
    <Card className="shadow-none">
      <ChartHeader symbol={symbol} initialSymbolInfo={data} />
      <ChartControls symbol={symbol} />
      <DynamicChart symbol={symbol} />
      {/* <ChartDetails symbol={symbol} initialData={detailsData} /> */}
    </Card>
  );
};
