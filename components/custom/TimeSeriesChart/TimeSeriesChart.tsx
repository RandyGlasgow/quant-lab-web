"use client";

import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { getTimeSeriesData } from "@/api/TimeSeries/getTimeSeriesData";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useTickerInformation } from "@/lib/queries/useTickerInformation";
import { formatCurrency, numValOrFallback } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

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
    (queryParams.get("measure") as any) ?? "1d"
  );

  const { data: chartData, isLoading } = useSymbolTimeSeries(
    symbol,
    measure
  );

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
          <LineChart
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
            <Line
              key={"h"}
              animationDuration={0}
              dataKey={"h"}
              type="linear"
              stroke={`green`}
              strokeWidth={2}
              glyphName={"high"}
              dot={false}
            />
            <Line
              key={"l"}
              animationDuration={0}
              dataKey={"l"}
              type="linear"
              stroke={`red`}
              strokeWidth={2}
              strokeDasharray={"5 5"}
              dot={false}
            />
            <Line
              key={"vw"}
              type={"basis"}
              className="fill-blue-500"
              animationDuration={0}
              dataKey={"vw"}
              stroke={`#3b82f6`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
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
