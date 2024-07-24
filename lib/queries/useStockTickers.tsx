import { getEndOfDayTopSymbols } from "@/api/EndOfDay/getEodStocks";
import { useQuery } from "@tanstack/react-query";

import { API } from "../types/types";

export const useStockTickers = () =>
  useQuery({
    queryKey: ["eod-top-20"],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => getEndOfDayTopSymbols(),
  });
