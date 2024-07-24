import { useQuery } from '@tanstack/react-query';

import { getTickerInformation } from '../api/getTickerInformation';
import { API } from '../types/types';

export const useTickerInformation = (symbol: string) =>
  useQuery({
    queryKey: ["ticker-info", symbol],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const response = await getTickerInformation(symbol);
      return response.json() as Promise<API["ticker/:symbol"]>;
    },
  });
