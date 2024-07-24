import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { API } from '@/lib/types/types';
import { HoverCardPortal } from '@radix-ui/react-hover-card';

export const Ticker: FC<{ ticker: API["eod/latest"]["data"][number] }> = ({
  ticker,
}) => {
  const change = ticker.open - ticker.close;
  const isPositive = change > 0;
  const changePercent = (change / ticker.open) * 100;
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          className={`${
            isPositive ? "text-green-500" : "text-red-400"
          } first:pl-2 last:pr-2`}
        >
          {ticker.symbol} ${change.toFixed(2)} ({changePercent.toFixed(2)}
          %)
        </Button>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent asChild>
          <div className="max-w-44">
            <div className="text-sm">{ticker.symbol}</div>
            <div className="grid grid-cols-3 text-sm">
              <div>open:</div>
              <div className="col-span-2">{ticker.open.toFixed(2)}</div>
              <div>close:</div>
              <div className="col-span-2">{ticker.close.toFixed(2)}</div>
              <div>high:</div>
              <div className="col-span-2">{ticker.high.toFixed(2)}</div>
              <div>low:</div>
              <div className="col-span-2">{ticker.low.toFixed(2)}</div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
};
