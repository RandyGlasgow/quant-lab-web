import Link from "next/link";
import { FC } from "react";

import { CardDescription } from "@/components/ui/card";
import { ITickerNews } from "@polygon.io/client-js";

export const ArticleElement: FC<{
  article: ITickerNews["results"][number];
}> = ({ article }) => {
  const formattedTitle = article.title
    .replace(/&amp;/g, "&")
    .split(" - ")[0];

  const isPublisherAuthor = article.author === article.publisher.name;
  return (
    <article className="">
      <Link href={article.article_url!} className="group">
        <h4
          className="text-sm font-bold group-hover:underline line-clamp-1"
          title={article.title}
        >
          {formattedTitle}
        </h4>
        <CardDescription className="text-xs line-clamp-3">
          {article.description}
        </CardDescription>
      </Link>
      {/* Cite the author and the publisher */}
      <p className="pt-1 text-xs">
        <Link
          href={article.publisher.homepage_url!}
          className="font-semibold hover:underline"
        >
          {article.publisher.name}
        </Link>
        {isPublisherAuthor ? (
          ""
        ) : (
          <span className="px-1 text-black/75"> - {article.author}</span>
        )}
      </p>
    </article>
  );
};
