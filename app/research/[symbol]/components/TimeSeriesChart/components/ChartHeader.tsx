import React, { FC } from "react";

import { getSymbolInfo } from "@/api/SymbolInfo/getSymbolInfo";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ITickerDetails } from "@polygon.io/client-js";

export const ChartHeader: FC<{
  symbol: string;
  initialSymbolInfo: ITickerDetails;
}> = async ({ symbol, initialSymbolInfo }) => {
  const symbolData = await getSymbolInfo(symbol);

  return (
    <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
      <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5">
        <CardTitle className="text-2xl">
          {symbolData?.results?.name}
        </CardTitle>
        <CardDescription>
          {symbolData?.results?.description}
        </CardDescription>
      </div>
    </CardHeader>
  );
};
