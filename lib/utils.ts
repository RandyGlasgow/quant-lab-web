import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numValOrFallback = (
  val: number | undefined,
  fallback: number = 0
) => {
  return val ?? fallback;
};

export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    compactDisplay: "long",
  }).format(val);
};
