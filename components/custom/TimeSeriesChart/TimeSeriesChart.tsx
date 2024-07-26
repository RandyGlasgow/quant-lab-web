"use client";

import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Measure,
  useSymbolTimeSeries,
} from "@/lib/queries/useSymbolTimeSeries";
import { formatCurrency, numValOrFallback } from "@/lib/utils";

import { ChartHeader } from "./components/ChartHeader";

const DynamicChartToolTip = dynamic(() =>
  import("./components/ChartToolTipContent").then(
    (mod) => mod.ChartToolTipContent
  )
);

const chartConfig = {
  high: {
    label: "High",
    color: "hsl(var(--chart-1))",
  },
  low: {
    label: "Low",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;




export const TimeSeriesChart: React.FC<{ symbol: string }> = ({
  symbol,
}) => {
  const queryParams = useSearchParams();
  const router = useRouter();
  const [measure, setMeasure] = React.useState<Measure>(
    (queryParams.get("measure") as any) ?? "5d"
  );

  const { data: chartData, isLoading } = useSymbolTimeSeries(
    symbol,
    measure
  );

  // is generally up trend bull
  const isTrendingUp =
    numValOrFallback(chartData?.[1]?.c, 0) <
    numValOrFallback(chartData?.[chartData.length - 1]?.c, 0);

  const showTime = measure.includes("d");

  return (
    <Card className="shadow-none">
      <ChartHeader symbol={symbol} measure={measure} />
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className={`aspect-auto lg:h-[400px] h-[250px] w-full ${
            isLoading ? "bg-muted animate-pulse" : ""
          }`}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 10,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="t"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              minTickGap={20}
              tickFormatter={(value) => {
                return showTime
                  ? dayjs(value).format("ddd, h:mm A")
                  : dayjs(value).format("MMM DD");
              }}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickLine={true}
              tickMargin={2}
              type="number"
              dataKey={"vw"}
              tickFormatter={(value) =>
                `${formatCurrency(numValOrFallback(value, 0))}`
              }
            />

            <ChartTooltip
              accessibilityLayer
              includeHidden
              content={<DynamicChartToolTip showTime={showTime} />}
            />

            <Area
              key={"c"}
              type={"linear"}
              dataKey={"c"}
              stroke={`${isTrendingUp ? "#22c55e" : "#ef4444"}`}
              fill={`${isTrendingUp ? "#22c55e" : "#ef4444"}`}
              fillOpacity={0.2}
              strokeWidth={1}
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span></span>
        <span>
          <Tabs
            defaultValue={measure}
            onValueChange={(v) => {
              // replace the current URL with the new measure
              const queryParam = new URLSearchParams(queryParams);
              const url = new URL(window.location.href);
              url.searchParams.set("measure", v as string);
              router.push(url.toString());
              setMeasure(v as any);
            }}
          >
            <TabsList>
              <TabsTrigger value="1d">1d</TabsTrigger>
              <TabsTrigger value="5d">5d</TabsTrigger>
              <TabsTrigger value="1m">1m</TabsTrigger>
              <TabsTrigger value="3m">3m</TabsTrigger>
              <TabsTrigger value="6m">6m</TabsTrigger>
              <TabsTrigger value="1y">1y</TabsTrigger>
              <TabsTrigger value="5y">5y</TabsTrigger>
            </TabsList>
          </Tabs>
        </span>
      </CardFooter>
    </Card>
  );
};
