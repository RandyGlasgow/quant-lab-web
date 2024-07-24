import { useQuery } from "@tanstack/react-query";

import { getEodTopStocks } from "../api/getEodTopStocks";
import { API } from "../types/types";

export const useStockTickers = () =>
  useQuery({
    queryKey: ["eod-top-20"],
    queryFn: async () => {
      const res = await getEodTopStocks();
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json() as Promise<API["eod/latest"]>;
    },
  });
