import { API_URL } from '@/constants/endpoints';
import { API } from '@/lib/types/types';

export async function getSymbolInfo(symbol: string, date?: string) {
  const res = await fetch(
    `${API_URL}/symbol_info/${date}?symbol=${symbol}`
  );

  if (!res.ok) throw new Error("Error getting symbol info");

  return res.json() as Promise<API["symbol_info/:date?symbol"]>;
}
