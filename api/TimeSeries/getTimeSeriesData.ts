import { API_URL } from "@/constants/endpoints";
import { IAggsGroupedDaily } from "@polygon.io/client-js";

export const getTimeSeriesData = async (
  symbol: string,
  options: {
    measure: "day" | "minute" | "hour" | "week" | "month" | "year";
    multiplier: number;
    delta: number;
  } = {
    measure: "day",
    multiplier: 1,
    delta: 120,
  }
) => {
  const resp = await fetch(
    `${API_URL}/gateway/${symbol.toUpperCase()}/time_series?measure=${
      options.measure
    }&multiplier=${options.multiplier}&delta=${options.delta}`
  );
  if (!resp.ok) {
    throw new Error("Failed to fetch data");
  }
  return resp.json() as Promise<IAggsGroupedDaily["results"]>;
};
