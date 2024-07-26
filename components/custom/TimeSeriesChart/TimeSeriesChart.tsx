"use client";

import dayjs from "dayjs";
import dynamic from "next/dynamic";
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
import { API_URL } from "@/constants/endpoints";
import { formatCurrency, numValOrFallback } from "@/lib/utils";
import { IAggsGroupedDaily } from "@polygon.io/client-js";
import { useQuery } from "@tanstack/react-query";

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

const convertMeasure = (
  measure: "1d" | "5d" | "1m" | "3m" | "6m" | "1y" | "5y"
) => {
  let option = { measure: "day", multiplier: 1, delta: 120 } as Parameters<
    typeof getTimeSeriesData
  >[1];
  switch (measure) {
    case "1d":
      option = { measure: "minute", multiplier: 1, delta: 24 * 60 };
      break;
    case "5d":
      option = { measure: "hour", multiplier: 1, delta: 24 * 5 };
      break;
    case "1m":
      option = { measure: "hour", multiplier: 1, delta: 24 * 30 };
      break;
    case "3m":
      option = { measure: "day", multiplier: 1, delta: 90 };
      break;
    case "6m":
      option = { measure: "day", multiplier: 1, delta: 180 };
      break;
    case "1y":
      option = { measure: "day", multiplier: 1, delta: 365 };
      break;
    case "5y":
      option = { measure: "day", multiplier: 1, delta: 1825 };
      break;
  }
  return option;
};

export const TimeSeriesChart: React.FC<{ symbol: string }> = ({
  symbol,
}) => {
  const [measure, setMeasure] = React.useState<
    "1d" | "5d" | "1m" | "3m" | "6m" | "1y" | "5y"
  >("3m");
  const { data: chartData, isLoading } = useQuery({
    initialData: [],
    queryKey: ["time-series-chart", symbol, measure],
    refetchInterval: 1000 * 60 * 5,
    queryFn: async () =>
      getTimeSeriesData(symbol, convertMeasure(measure)),
  });

  const showTime = measure.includes("d");
  const total = React.useMemo(
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
    [chartData]
  );

  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
        <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["high", "low"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <span
                key={chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                {isLoading ? (
                  <span className="w-40 h-10 text-lg font-bold leading-none sm:text-3xl bg-muted animate-pulse" />
                ) : (
                  <span className="w-40 text-lg font-bold leading-none sm:text-3xl">
                    $
                    {total[key as keyof typeof total]
                      .toFixed(2)
                      .toLocaleString()}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </CardHeader>

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
            <CartesianGrid vertical={true} additive="replace" />
            <XAxis
              dataKey="t"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              minTickGap={8}
              tickFormatter={(value) => dayjs(value).format("MMM DD")}
            />
            <YAxis
              domain={[total.low - 1, total.high + 1]}
              tickLine={true}
              tickMargin={2}
              type="number"
              dataKey={"vw"}
              tickFormatter={(value) =>
                `${numValOrFallback(value).toFixed(0)}`
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
            onValueChange={(v) => setMeasure(v as any)}
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
