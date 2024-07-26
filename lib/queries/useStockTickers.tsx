import { getEndOfDayTopSymbols } from "@/api/EndOfDay/getEodStocks";
import { getSymbolSnapshot } from "@/api/SymbolInfo/getSymbolSnapshot";
import { useQuery } from "@tanstack/react-query";

import { API } from "../types/types";

export const useStockTickers = () =>
  useQuery({
    queryKey: ["eod-top-20"],
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 2,
    queryFn: async () =>
      getSymbolSnapshot(
        "CRM,ADBE,IBM,INTC,GOOGL,AAPL,TSLA,AMD,MSFT,AMZN,ORCL,NVDA,META,SNAP,UBER,LYFT,DIS,SPOT,ROKU,SHOP"
      ),
  });
