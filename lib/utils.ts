import { ClassValue, clsx, type } from "clsx";
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
