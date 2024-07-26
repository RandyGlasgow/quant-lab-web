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

const reMapNames = (name: string | number | undefined) => {
  switch (name) {
    case "h":
      return "High";
    case "l":
      return "Low";
    case "vw":
      return "V. Weight";
    default:
      return name;
  }
};

type ChartToolTipComponentProps = React.ComponentProps<
  typeof ChartTooltipContent
> & {
  payload: IAggsGroupedDaily["results"][number];
};
export const TimeSeriesChart: React.FC<{ symbol: string }> = ({
  symbol,
}) => {
  const { data: chartData, isLoading } = useQuery({
    initialData: [],
    queryKey: ["time-series-chart", symbol],
    refetchInterval: 1000 * 10,
    queryFn: async () => {
      const resp = await fetch(
        `${API_URL}/gateway/${symbol.toUpperCase()}/time_series?measure=day&multiplier=1&delta=120`
      );
      if (!resp.ok) {
        throw new Error("Failed to fetch data");
      }
      return resp.json() as Promise<IAggsGroupedDaily["results"]>;
    },
  });

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
          className={`aspect-auto h-[250px] w-full ${
            isLoading ? "bg-muted animate-pulse" : ""
          }`}
        >
          {!isLoading && (
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
                domain={[total.low - 10, total.high + 10]}
                axisLine={true}
                tickLine={true}
                tickMargin={8}
                type="number"
                label={{
                  value: "Price",
                  position: "insideBottomLeft",
                  angle: -90,
                }}
                dataKey={"l"}
                tickFormatter={(value) => `$${value}`}
              />

              <ChartTooltip
                accessibilityLayer
                includeHidden
                content={({ active, label, payload }) => {
                  const time = payload?.[0]?.payload?.t;
                  return (
                    <Card className="rounded-sm w-[150px]">
                      <CardHeader className="p-2">
                        <CardTitle>
                          {dayjs(time).format("ddd MMM DD, YYYY")}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col p-2">
                        {payload?.map((p) => (
                          <CardDescription className="grid grid-cols-2 gap-1">
                            <span>{reMapNames(p.dataKey)}:</span>
                            <span>
                              {parseFloat(p.value as string).toFixed(2)}
                            </span>
                          </CardDescription>
                        ))}
                      </CardContent>
                    </Card>
                  );
                  // <ChartTooltipContent
                  //   className="w-[150px] bg-white shadow-lg"
                  //   nameKey="time"
                  //   labelFormatter={(value) => {
                  //     return dayjs(value).format("ddd MMM DD, YYYY");
                  //   }}
                  // ></ChartTooltipContent>;
                }}
              />
              <Line
                key={"h"}
                animationDuration={0}
                dataKey={"h"}
                type="linear"
                stroke={`green`}
                strokeWidth={2}
                dot={false}
                glyphName={"high"}
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
                className="fill-yellow-500"
                animationDuration={0}
                dataKey={"vw"}
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
