"use client";
import { useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';

import { useStockTickers } from '@/lib/queries/useStockTickers';

import { Ticker } from './components/Ticker';

export const StockStrip = () => {
  const { data } = useStockTickers();

  return (
    <Marquee pauseOnHover>
      <div className="flex gap-2">
        {data?.data.map((ticker) => (
          <Ticker key={ticker.symbol} ticker={ticker} />
        ))}
      </div>
    </Marquee>
  );
};
