"use client";

import Link from 'next/link';

import { getSymbolSnapshot } from '@/api/SymbolInfo/getSymbolSnapshot';
import { CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { ISnapshot, ISnapshotTickers } from '@polygon.io/client-js';
import { useQuery } from '@tanstack/react-query';

export const ChartDetails: React.FC<{
  symbol: string;
  initialData: ISnapshotTickers;
}> = async ({ symbol, initialData }) => {
  const { data } = useQuery({
    initialData,
    queryKey: ["snapshot-ticker-info", symbol],
    refetchInterval: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      return await getSymbolSnapshot(symbol);
    },
  });

  if (!data.tickers) return null;

  const { prevDay } = data.tickers[0];

  return (
    <CardFooter className="grid grid-cols-4 gap-2 pt-8 pb-4 text-sm bg-secondary">
      <div className="grid grid-cols-2">
        <h3>Previous Close</h3>
        <span>{formatCurrency(prevDay?.c)}</span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Open</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Bid</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Ask</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Day's Range</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>52 Week Range</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Volume</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Avg. Volume</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Market Cap (intraday)</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Beta (5Y Monthly)</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>PE Ratio (TTM)</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>EPS (TTM)</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Earnings Date</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Forward Dividend & Yield</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>Ex-Dividend Date</h3>
        <span></span>
      </div>
      <div className="grid grid-cols-2">
        <h3>1y Target Est</h3>
        <span></span>
      </div>
      <p className="flex justify-between pt-4 text-xs italic text-right col-span-full font-extralight">
        <span></span>
        <Link
          href="https://polygon.io/"
          className="hover:underline"
          referrerPolicy="no-referrer"
          target="_blank"
        >
          Data provided by Polygon.io. Data is delayed by 15 minutes.
        </Link>
      </p>
    </CardFooter>
  );
};
