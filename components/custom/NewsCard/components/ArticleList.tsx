"use client";
import { FC } from "react";

import { CardContent } from "@/components/ui/card";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ITickerNews } from "@polygon.io/client-js";
import {
  ScrollArea,
  ScrollAreaScrollbar,
} from "@radix-ui/react-scroll-area";

import { Article } from "./Article";

export const ArticleList: FC<{ data: ITickerNews["results"] }> = ({
  data,
}) => {
  return (
    <CardContent className="grid gap-2 pt-4 overflow-auto max-h-96">
      {data.map((d) => (
        <Article key={d.id} {...d} />
      ))}
    </CardContent>
  );
};
