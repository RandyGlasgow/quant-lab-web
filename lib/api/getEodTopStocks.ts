import dayjs from "dayjs";

import { API_URL } from "@/constants/endpoints";

export const getEodTopStocks = async () => {
  return getEodStock(
    "CRM,ADBE,IBM,INTC,GOOGL,AAPL,TSLA,AMD,MSFT,AMZN,ORCL,NVDA,META,SNAP,UBER,LYFT,DIS,SPOT,ROKU,SHOP"
  );
};

export const getEodStock = async (symbols: string) => {
  // prev date
  const prevDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
  return await fetch(`${API_URL}/eod/${prevDate}?symbols=${symbols}`);
};
