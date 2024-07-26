import { getTimeSeriesData } from "@/api/TimeSeries/getTimeSeriesData";
import { useQuery } from "@tanstack/react-query";

export type Measure = "1d" | "5d" | "1m" | "3m" | "6m" | "1y" | "5y";
const getPingRate = (measure: Measure) => {
  switch (measure) {
    case "1d":
      return 1000 * 60;
    case "5d":
      return 1000 * 60 * 5;
    case "1m":
      return 1000 * 60 * 15;
    case "3m":
      return 1000 * 60 * 30;
    case "6m":
      return 1000 * 60 * 60;
    case "1y":
      return 1000 * 60 * 60 * 6;
    case "5y":
      return 1000 * 60 * 60 * 12;
  }
};
const convertMeasure = (measure: Measure) => {
  let option = { measure: "day", multiplier: 1, delta: 120 } as Parameters<
    typeof getTimeSeriesData
  >[1];
  switch (measure) {
    case "1d":
      option = { measure: "minute", multiplier: 1, delta: 24 * 60 };
      break;
    case "5d":
      option = { measure: "minute", multiplier: 5, delta: 24 * 5 * 60 };
      break;
    case "1m":
      option = { measure: "hour", multiplier: 1, delta: 24 * 30 };
      break;
    case "3m":
      option = { measure: "hour", multiplier: 3, delta: 24 * 30 * 3 };
      break;
    case "6m":
      option = { measure: "hour", multiplier: 6, delta: 24 * 30 * 6 };
      break;
    case "1y":
      option = { measure: "day", multiplier: 1, delta: 365 };
      break;
    case "5y":
      option = { measure: "day", multiplier: 5, delta: 365 * 5 };
      break;
  }
  return option;
};
export const useSymbolTimeSeries = (symbol: string, measure: Measure) =>
  useQuery({
    initialData: [],
    queryKey: ["time-series-chart", symbol, measure],
    refetchInterval: getPingRate(measure),
    queryFn: async () =>
      getTimeSeriesData(symbol, convertMeasure(measure)),
  });
