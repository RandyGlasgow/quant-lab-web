import { API_URL } from "@/constants/endpoints";
import { ITickerNews } from "@polygon.io/client-js";

export const getTickerNews = async (
  symbol: string,
  limit: number = 20
) => {
  const res = await fetch(
    `${API_URL}/gateway/${symbol}/news?limit=${limit}`
  );
  if (!res.ok) throw new Error(res.statusText);

  return res.json() as Promise<ITickerNews["results"]>;
};
