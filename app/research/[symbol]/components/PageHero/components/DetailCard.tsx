import { FC } from 'react';

export const DetailCard: FC<{
  title: string;
  detail: string | number;
}> = ({ detail, title }) => {
  return (
    <div className="px-4 py-2 text-xs font-semibold text-center rounded-md bg-black/10 text-black/80 md:text-base">
      <div>{title}</div>
      <div className="text-lg">{detail}</div>
    </div>
  );
};
