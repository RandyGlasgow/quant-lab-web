import dayjs from 'dayjs';
import Link from 'next/link';
import { FC } from 'react';

import { ITickerNews } from '@polygon.io/client-js';

export const Article: FC<ITickerNews["results"][number]> = ({
  published_utc,
  publisher,
  title,
  article_url,
  description,
}) => {
  const titleStr = title.split("-")[0].trim();
  const descriptionStr = description?.split("-")[0].trim();
  return (
    <div className="grid gap-2 py-2">
      {" "}
      <Link href={article_url!} prefetch={false}>
        <h3
          className="font-semibold line-clamp-1 text-primary hover:underline"
          title={titleStr}
        >
          {titleStr}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {descriptionStr}
      </p>
      <div className="flex items-center justify-between">
        <cite className="text-xs text-muted-foreground">
          {dayjs(published_utc).format("dddd, MMMM D, YYYY")} -{" "}
          <Link
            href={publisher.homepage_url!}
            className="text-primary hover:underline"
          >
            {publisher.name}
          </Link>
        </cite>
        <Link
          href={article_url!}
          className="text-sm font-medium text-primary hover:underline"
          prefetch={false}
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
