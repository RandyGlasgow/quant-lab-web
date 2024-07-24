import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { FC } from 'react';

import { HoverCardContent } from "@/components/ui/hover-card";
import { useTickerInformation } from '@/lib/queries/useTickerInformation';

export const TickerCardContent: FC<{ symbol: string }> = ({ symbol }) => {
  const { data, isLoading } = useTickerInformation(symbol);


  return <HoverCardContent className="w-80"></HoverCardContent>;
};
