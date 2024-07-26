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
export const ChartToolTipContent: React.FC<ChartToolTipProps> = (
  params
) => {
  const { active, payload, label } = params;
  const time = payload?.[0]?.payload?.t;
  return (
    <Card className="rounded-sm w-[150px]">
      <CardHeader className="p-2">
        <CardTitle>{dayjs(time).format("ddd MMM DD, YYYY")}</CardTitle>
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
