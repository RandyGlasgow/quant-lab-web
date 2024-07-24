import dayjs from "dayjs";

import { getSymbolInfo } from "@/api/SymbolInfo/getSymbolInfo";
import { useQuery } from "@tanstack/react-query";

export const useTickerInformation = (symbol: string) =>
  useQuery({
    queryKey: ["ticker-info", symbol],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      // todays date
      const date = dayjs().format("YYYY-MM-DD");
      return await getSymbolInfo(symbol, date);
    },
  });
