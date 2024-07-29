import dayjs from 'dayjs';

import { getSymbolInfo } from '@/api/SymbolInfo/getSymbolInfo';
import { useQuery } from '@tanstack/react-query';

export const useTickerInformation = (
  symbol: string,
  initialData?: Awaited<ReturnType<typeof getSymbolInfo>>
) =>
  useQuery({
    initialData,
    queryKey: ["ticker-info", symbol],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      return await getSymbolInfo(symbol);
    },
  });
