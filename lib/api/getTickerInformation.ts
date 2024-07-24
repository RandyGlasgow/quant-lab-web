import { API_URL } from '@/constants/endpoints';

export const getTickerInformation = async (symbol: string) => {
  return await fetch(`${API_URL}/tickers/${symbol}`);
};
