"use client";

import dayjs from "dayjs";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { API_URL } from "@/constants/endpoints";
import { IAggsGroupedDaily } from "@polygon.io/client-js";
import { useQuery } from "@tanstack/react-query";

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

const reMap = (data: IAggsGroupedDaily["results"]) => {
  return data.map((d) => ({
    time: d.t,
    high: d.h,
    low: d.l,
    avg: d.vw,
    open: d.o,
    close: d.c,
  }));
};

export const TimeSeriesChart: React.FC<{ symbol: string }> = ({
  symbol,
}) => {
  const { data, isLoading } = useQuery({
    initialData: [],
    queryKey: ["time-series-chart", symbol],
    refetchInterval: 1000 * 10,
    queryFn: async () => {
      const resp = await fetch(
        `${API_URL}/gateway/${symbol.toUpperCase()}/time_series?measure=week&multiplier=1&delta=52`
      );
      if (!resp.ok) {
        throw new Error("Failed to fetch data");
      }
      return resp.json() as Promise<IAggsGroupedDaily["results"]>;
    },
  });

  const chartData = React.useMemo(() => reMap(data), [data]);

  const total = React.useMemo(
    () =>
      chartData?.reduce<{ high: number; low: number }>(
        (acc, curr) => {
          if (curr.high && acc.high < curr.high) {
            acc.high = curr.high;
          }
          if (curr.low && acc.low > curr.low) {
            acc.low = curr.low;
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
    <Card>
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
          className={`aspect-auto h-[250px] w-full ${
            isLoading ? "bg-muted animate-pulse" : ""
          }`}
        >
          {!isLoading && (
            <LineChart
              accessibilityLayer
              data={chartData}
              height={150}
              margin={{
                left: -55,
                right: -35,
              }}
            >
              <CartesianGrid vertical={true} additive="replace" />
              <XAxis
                dataKey="time"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                minTickGap={16}
                tickFormatter={(value) => dayjs(value).format("MMM DD")}
              />

              <ChartTooltip
                accessibilityLayer
                includeHidden
                content={
                  <ChartTooltipContent
                    className="w-[150px] bg-white shadow-lg"
                    nameKey="time"
                    labelFormatter={(value) => {
                      return dayjs(value).format("ddd MMM DD, YYYY");
                    }}
                  />
                }
              />
              <Line
                key={"high"}
                animationDuration={0}
                dataKey={"high"}
                type="linear"
                stroke={`green`}
                strokeWidth={2}
                dot={false}
                glyphName={"high"}
              />
              <Line
                key={"l"}
                animationDuration={0}
                dataKey={"low"}
                type="linear"
                stroke={`red`}
                strokeWidth={2}
                strokeDasharray={"5 5"}
                dot={false}
              />
              <Line
                key={"vw"}
                className="fill-yellow-500"
                animationDuration={0}
                dataKey={"avg"}
                stroke={`#eab308`}
                dot={false}
              />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
