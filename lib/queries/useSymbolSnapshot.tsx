import { getSymbolSnapshot } from "@/api/SymbolInfo/getSymbolSnapshot";
import { useQuery } from "@tanstack/react-query";

export const useSymbolSnapshot = (symbol: string) =>
  useQuery({
    queryKey: ["symbol-snapshot", symbol],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => await getSymbolSnapshot(symbol),
  });
