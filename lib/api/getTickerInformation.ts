import { API_URL } from '@/constants/endpoints';

export const getTickerInformation = async (symbol: string) => {
  const response = await fetch(`${API_URL}/v1/ticker/${symbol}`);
  const data = await response.json();
  return data;
};
