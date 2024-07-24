import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { FC } from 'react';

import { HoverCardContent } from '@/components/ui/hover-card';
import { useStockTickerPrice } from '@/lib/queries/useStockTickers';
import { useTickerInformation } from '@/lib/queries/useTickerInformation';

export const TickerCardContent: FC<{ symbol: string }> = ({ symbol }) => {
  const { data, isLoading } = useTickerInformation(symbol);
  const { data: priceData } = useStockTickerPrice(symbol);

  // calculate if the stock is up or down
  const priceChange =
    (priceData?.data?.[0].close ?? 0) - (priceData?.data?.[0].open ?? 0);

  const priceChangePercentage =
    (priceChange / (priceData?.data?.[0].open ?? 1)) * 100;

  const isPositive = priceChangePercentage > 0;

  return (
    <HoverCardContent className="w-80">
      <div className="grid gap-4">
        <div>
          <div className="grid gap-1">
            {isLoading && (
              <>
                <div className="w-full h-5 rounded-sm bg-muted animate-pulse" />
                <div className="w-full h-4 rounded-sm bg-muted animate-pulse" />
              </>
            )}
            <h4 className="font-semibold text-md">{data?.name}</h4>
            <p className="text-sm text-muted-foreground">{data?.symbol}</p>
          </div>
          <div className="flex items-center justify-between w-full gap-1">
            <div className="text-2xl font-bold">
              ${priceData?.data?.[0].close}
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPositive ? (
                <TrendingUpIcon className="w-4 h-4" />
              ) : (
                <TrendingDownIcon className="w-4 h-4" />
              )}

              <span>{priceChangePercentage.toFixed(2)}%</span>
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Market Cap</span>
            <span>$2.5 Trillion</span>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Dividend Yield</span>
            <span>0.6%</span>
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
