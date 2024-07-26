import { Loader } from "lucide-react";
import { FC } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DetailCard: FC<{
  title: string;
  value: string;
  isPositive?: boolean;
  useColor?: boolean;
  isFetching?: boolean;
}> = ({
  title,
  value,
  isPositive = true,
  useColor = false,
  isFetching = true,
}) => {
  return (
    <Card
      className={`relative flex-1 transition-colors duration-150 ease-in-out ${
        useColor
          ? isPositive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
          : ""
      }`}
    >
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-center">{value}</CardContent>

      {isFetching && (
        <Loader className="absolute w-4 h-4 top-2 right-2 text-black/40" />
      )}
    </Card>
  );
};
