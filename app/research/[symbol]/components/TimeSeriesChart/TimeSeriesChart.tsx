import * as React from 'react';

import { getSymbolInfo } from '@/api/SymbolInfo/getSymbolInfo';
import { getSymbolSnapshot } from '@/api/SymbolInfo/getSymbolSnapshot';
import { Card } from '@/components/ui/card';

import { ChartContent } from './components/ChartContent';
import { ChartControls } from './components/ChartControls';
import { ChartHeader } from './components/ChartHeader';

export const TimeSeriesChart: React.FC<{ symbol: string }> = async ({
  symbol,
}) => {
  const data = await getSymbolInfo(symbol);
  // const detailsData = await getSymbolSnapshot(symbol);
  return (
    <Card className="shadow-none">
      <ChartHeader symbol={symbol} initialSymbolInfo={data} />
      <ChartControls symbol={symbol} />
      <ChartContent symbol={symbol} />
      {/* <ChartDetails symbol={symbol} initialData={detailsData} /> */}
    </Card>
  );
};
