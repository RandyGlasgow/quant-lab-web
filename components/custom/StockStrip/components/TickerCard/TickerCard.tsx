import {
  ExternalLink,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { getEndOfDayTopSymbols } from "@/api/EndOfDay/getEodStocks";
import { Button } from "@/components/ui/button";
import { HoverCardContent } from "@/components/ui/hover-card";
import { useTickerInformation } from "@/lib/queries/useTickerInformation";

const getDelta = (a: number, b: number) => a - b;
const isPositive = (value: number) => value >= 0;
const getPercentChange = (num: number, denom: number) =>
  (num / denom) * 100;
type Ticker = Awaited<
  ReturnType<typeof getEndOfDayTopSymbols>
>["results"][number];
export const TickerCardContent: FC<{ ticker: Ticker }> = ({ ticker }) => {
  const { data, isLoading } = useTickerInformation(ticker.symbol!);

  return (
    <HoverCardContent className="w-80">
      <div className="grid gap-4">
        <div className="">
          <div className="grid gap-1">
            <span className="flex items-center justify-between gap-1">
              <h4 className="text-lg font-semibold">{ticker.symbol}</h4>
              <div className="text-2xl font-bold">${ticker.close}</div>
            </span>
            {isLoading ? (
              <div className="w-full h-5 bg-muted animate-pulse" />
            ) : (
              <p className="text-sm text-muted-foreground">
                {data?.results?.name}
              </p>
            )}
          </div>
          <div className="grid gap-1 text-right">
            <div
              className={`flex items-center gap-1 text-sm ${
                isPositive(getDelta(ticker.close!, ticker.open!))
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              <TrendingUpIcon className="w-4 h-4" />
              <span>
                {getPercentChange(
                  getDelta(ticker.close!, ticker.open!),
                  ticker.open!
                ).toPrecision(3)}
                %
              </span>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Market Cap</span>
            <TickerInfo
              isLoading={isLoading}
              data={Intl.NumberFormat("en-us", {
                notation: "compact",
              }).format(data?.results?.market_cap || 0)}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Primary Exchange</span>
            <TickerInfo
              isLoading={isLoading}
              data={data?.results?.primary_exchange}
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>P/E Ratio</span>
            <span>26.7</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>52-Week High</span>
            <span>$179.23</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>52-Week Low</span>
            <span>$120.67</span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  );
};

const TickerInfo: FC<{
  isLoading: boolean;
  data: string | number | undefined;
}> = ({ isLoading, data }) => {
  return isLoading ? (
    <div className="w-10 h-4 bg-muted animate-pulse" />
  ) : (
    <span>{data}</span>
  );
};
