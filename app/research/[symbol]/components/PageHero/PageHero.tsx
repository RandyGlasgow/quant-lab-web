import { FC } from 'react';

import { getSymbolInfo } from '@/api/SymbolInfo/getSymbolInfo';
import { getSymbolSnapshot } from '@/api/SymbolInfo/getSymbolSnapshot';
import { cn, numValOrFallback } from '@/lib/utils';

import { DetailCard } from './components/DetailCard';

export const PageHero: FC<{ symbol: string }> = async ({ symbol }) => {
  const upperCaseSymbol = symbol.toUpperCase();
  const pageData = await getSymbolInfo(upperCaseSymbol);
  const tickerInfo = await getSymbolSnapshot(upperCaseSymbol);
  const { tickers } = tickerInfo!;
  const { todaysChangePerc } = tickers?.[0]!;

  const isPositive = numValOrFallback(todaysChangePerc) >= 0;

  return (
    <div
      className={cn(
        "flex flex-col min-h-[200px] md:h-[400px] justify-center items-center to-transparent text-black/90 p-4",
        isPositive
          ? "from-green-400/70 bg-gradient-to-tr"
          : "from-red-400/70 bg-gradient-to-br"
      )}
    >
      <h1 className="text-4xl font-extrabold text-center">
        {pageData.results?.name}
      </h1>
      <div
        id="quick-info"
        className="grid grid-cols-2 gap-4 pt-8 lg:grid-cols-4"
      >
        <DetailCard
          title="Shares Outstanding"
          detail={Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(
            numValOrFallback(pageData.results?.weighted_shares_outstanding)
          )}
        />
        <DetailCard
          title="Market Cap"
          detail={Intl.NumberFormat("en-US", {
            style: "currency",
            notation: "compact",
            currency: "USD",
          }).format(numValOrFallback(pageData.results?.market_cap))}
        />
        <DetailCard
          title="Total Employees"
          detail={Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(numValOrFallback(pageData.results?.total_employees))}
        />
        <DetailCard title="Ticker" detail={upperCaseSymbol} />
      </div>
    </div>
  );
};
