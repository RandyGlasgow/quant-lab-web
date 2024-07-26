import Link from "next/link";
import { FC } from "react";

import { Card } from "@/components/ui/card";
import { ITickerNews } from "@polygon.io/client-js";

export const Article: FC<ITickerNews["results"][number]> = ({
  id,
  published_utc,
  publisher,
  tickers,
  title,
  amp_url,
  article_url,
  author,
  description,
  image_url,
  keywords,
}) => {
  return (
    <Card className="w-full overflow-hidden rounded-lg bg-background">
      <div className="p-4 space-y-2">
        <h3 className="font-semibold line-clamp-2 text-primary">
          {title.split("-")[0].trim()}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description?.split("-")[0].trim()}
        </p>
        <div className="flex items-center justify-between">
          <cite className="text-xs text-muted-foreground">
            {new Date(published_utc).toLocaleDateString()} -{" "}
            {publisher.name}
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
    </Card>
  );
};
