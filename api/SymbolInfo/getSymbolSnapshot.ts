import { API_URL } from '@/constants/endpoints';
import { ISnapshotTickers } from '@polygon.io/client-js';

export const getSymbolSnapshot = async (symbols: string) => {
  const response = await fetch(
    `${API_URL}/gateway/snapshot?symbols=${symbols}`
  );
  const data = response.json();
  return data as Promise<ISnapshotTickers>;
};
