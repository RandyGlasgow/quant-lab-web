import dayjs from "dayjs";
import { ComponentProps } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

import { reMapNames } from "../utils/reMapNames";

export type ChartToolTipProps = ComponentProps<typeof ChartTooltipContent>;
export const ChartToolTipContent: React.FC<
  ChartToolTipProps & {
    showTime?: boolean;
  }
> = (params) => {
  const { active, payload, label, showTime } = params;
  const time = payload?.[0]?.payload?.t;

  const formattedTime = showTime
    ? dayjs(time).format("ddd MMM DD, YYYY @ h:mm A")
    : dayjs(time).format("ddd MMM DD, YYYY");

  return (
    <Card className="rounded-sm w-[200px]">
      <CardHeader className="p-2">
        <CardTitle>{formattedTime}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-2">
        {payload?.map((p) => (
          <CardDescription className="grid grid-cols-2 gap-1" key={p.name}>
            <span>{reMapNames(p.dataKey)}:</span>
            <span>{formatCurrency(parseFloat(p.value as string))}</span>
          </CardDescription>
        ))}
      </CardContent>
    </Card>
  );
};
