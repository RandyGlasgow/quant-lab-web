/**
 * {"json":[{"status":"OK","symbol":"CRM","from":"2024-07-24","open":253.63,"high":255.91,"low":250.17,"volume":2546288,"preMarket":254},{"status":"OK","symbol":"ADBE","from":"2024-07-24","open":543.8,"high":544.71,"low":530.82,"volume":1339251,"preMarket":543.5},{"status":"OK","symbol":"IBM","from":"2024-07-24","open":184.14,"high":185.0714,"low":183.145,"volume":2871370,"preMarket":183.33},{"status":"OK","symbol":"INTC","from":"2024-07-24","open":32.535,"high":32.8,"low":31.845,"volume":30971599,"preMarket":32.73},{"status":"OK","symbol":"GOOGL","from":"2024-07-24","open":173.6,"high":176.19,"low":171.82,"volume":34014312,"preMarket":177.6},{"status":"OK","symbol":"AAPL","from":"2024-07-24","open":224,"high":224.8,"low":217.13,"volume":36225327,"preMarket":223.44},{"status":"OK","symbol":"TSLA","from":"2024-07-24","open":225.42,"high":225.99,"low":214.71,"volume":136173607,"preMarket":226.1},{"status":"OK","symbol":"AMD","from":"2024-07-24","open":152.72,"high":153.68,"low":145.53,"volume":34728999,"preMarket":152.29},{"status":"OK","symbol":"MSFT","from":"2024-07-24","open":440.45,"high":441.48,"low":427.585,"volume":14807119,"preMarket":442.85},{"status":"OK","symbol":"AMZN","from":"2024-07-24","open":183.2,"high":185.45,"low":180.91,"volume":24987321,"preMarket":185.98},{"status":"OK","symbol":"ORCL","from":"2024-07-24","open":141.7,"high":142.66,"low":139.49,"volume":3421422,"preMarket":142.03},{"status":"OK","symbol":"NVDA","from":"2024-07-24","open":119.17,"high":119.95,"low":114.41,"volume":211684999,"preMarket":120.48}]}
 */
import type {
  IDailyOpenClose,
  ITickerDetails,
} from "@polygon.io/client-js";
import { NextPageContext } from "next";

export type API = {
  "eod/latest": {
    errors: string[];
    unknown: string[];
    results: IDailyOpenClose[];
  };
  "symbol_info/:date?symbol": ITickerDetails;
};
