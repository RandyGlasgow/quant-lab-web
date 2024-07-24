import { useQuery } from '@tanstack/react-query';

import { getEodStock, getEodTopStocks } from '../api/getEodTopStocks';
import { API } from '../types/types';

export const useStockTickers = () =>
  useQuery({
    queryKey: ["eod-top-20"],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const res = await getEodTopStocks();
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json() as Promise<API["eod/latest"]>;
    },
  });

export const useStockTickerPrice = (symbol: string) =>
  useQuery({
    queryKey: ["ticker-price", symbol],
    staleTime: 1000 * 60,
    queryFn: async () => {
      const res = await getEodStock(symbol);
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json() as Promise<API["eod/latest"]>;
    },
  });
