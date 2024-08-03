"use client";
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { CardContent } from '@/components/ui/card';
import {
    ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent
} from '@/components/ui/chart';
import { useSymbolSnapshot } from "@/lib/queries/useSymbolSnapshot";
import {
  Measure,
  useSymbolTimeSeries,
} from "@/lib/queries/useSymbolTimeSeries";
import { formatCurrency, numValOrFallback } from '@/lib/utils';
import { IAggsGroupedDaily } from "@polygon.io/client-js";

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

const formatData = (data?: IAggsGroupedDaily["results"]) => {
  if (!data) return [];
  return data.map((d) => ({
    High: d.h,
    Low: d.l,
    Open: d.o,
    Close: d.c,
    Volume: d.v,
    Time: d.t,
    "Avg. Weighted Price": d.vw,
  }));
};
export const ChartContent: FC<{ symbol: string }> = ({ symbol }) => {
  const queryParams = useSearchParams();
  const measure = (queryParams.get("measure") as Measure) || "";
  const { data: chartData, isLoading } = useSymbolTimeSeries(
    symbol,
    measure
  );

  const { data } = useSymbolSnapshot(symbol);

  const formattedData = formatData(chartData);

  const showTime = measure.includes("d");

  const domainFloor = formattedData.reduce(
    (acc, curr) => Math.min(acc, numValOrFallback(curr.Low, acc)),
    Infinity
  );
  const domainCeiling = formattedData.reduce(
    (acc, curr) => Math.max(acc, numValOrFallback(curr.High)),
    -Infinity
  );

  const isTrendingUp =
    numValOrFallback(data?.tickers?.[0]?.todaysChangePerc) >= 0;

  return (
    <CardContent className="px-2 sm:p-6">
      <ChartContainer
        config={chartConfig}
        className={`aspect-auto lg:h-[400px] h-[250px] w-full ${
          isLoading ? "bg-muted animate-pulse" : ""
        }`}
      >
        <AreaChart
          accessibilityLayer
          data={formattedData}
          margin={{
            left: 10,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="Time"
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
            domain={[domainFloor, domainCeiling]}
            tickLine={true}
            tickMargin={2}
            type="number"
            dataKey={"Avg. Weighted Price"}
            tickFormatter={(value) =>
              `${formatCurrency(numValOrFallback(value, 0))}`
            }
          />

          <ChartTooltip
            accessibilityLayer
            includeHidden
            content={
              <ChartTooltipContent
                className="bg-white rounded-sm"
                labelFormatter={(value) =>
                  showTime
                    ? dayjs(value).format("ddd MMM DD, YYYY @ h:mm A")
                    : dayjs(value).format("ddd MMM DD, YYYY")
                }
                formatter={(value) =>
                  formatCurrency(parseFloat(value as string))
                }
              />
            }
          />

          <Area
            key={"c"}
            type={"linear"}
            dataKey={"Close"}
            label={"Close"}
            stroke={`${isTrendingUp ? "#22c55e" : "#ef4444"}`}
            fill={`${isTrendingUp ? "#22c55e" : "#ef4444"}`}
            fillOpacity={0.2}
            strokeWidth={1}
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
      <ChartContainer
        config={chartConfig}
        className={`aspect-auto lg:h-[150px] h-[75px] w-full ${
          isLoading ? "bg-muted animate-pulse" : ""
        }`}
      >
        <AreaChart
          accessibilityLayer
          data={formattedData}
          margin={{
            left: 10,
          }}
        >
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="Time"
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
            label={{
              value: "Volume",
              position: "insideBottomLeft",
              angle: -90,
            }}
            dataKey={"Volume"}
            tickFormatter={(value) =>
              Intl.NumberFormat("en-us", {
                notation: "compact",
              }).format(numValOrFallback(value, 0))
            }
          />

          <ChartTooltip
            accessibilityLayer
            includeHidden
            content={
              <ChartTooltipContent
                className="bg-white rounded-sm"
                labelFormatter={(value) =>
                  showTime
                    ? dayjs(value).format("ddd MMM DD, YYYY @ h:mm A")
                    : dayjs(value).format("ddd MMM DD, YYYY")
                }
              />
            }
          />

          <Area
            key={"v"}
            type={"linear"}
            dataKey={"Volume"}
            label={"Volume"}
            fillOpacity={0.2}
            strokeWidth={1}
            dot={false}
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  );
};
