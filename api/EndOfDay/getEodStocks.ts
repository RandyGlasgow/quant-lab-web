import dayjs from "dayjs";

import { API_URL } from "@/constants/endpoints";
import { API } from "@/lib/types/types";

export async function getEndOfDaySymbols(
  symbols: string,
  date: string = "latest"
) {
  return await fetch(`${API_URL}/eod/${date}?symbols=${symbols}`);
}

export async function getEndOfDayTopSymbols() {
  const res = await getEndOfDaySymbols(
    "CRM,ADBE,IBM,INTC,GOOGL,AAPL,TSLA,AMD,MSFT,AMZN,ORCL,NVDA,META,SNAP,UBER,LYFT,DIS,SPOT,ROKU,SHOP",
    // one day before today
    dayjs().subtract(1, "day").format("YYYY-MM-DD")
  );
  if (!res.ok) {
    throw new Error("Failed to fetch top symbols");
  }

  return res.json() as Promise<API["eod/latest"]>;
}
