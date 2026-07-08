import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number | null | undefined,
  currency = "£",
): string {
  return `${currency}${(amount ?? 0).toFixed(2)}`;
}

type DateFormatOption = "short" | "long" | "datetime";

const DATE_FORMAT_OPTIONS: Record<
  DateFormatOption,
  Intl.DateTimeFormatOptions
> = {
  short: { day: "numeric", month: "short" },
  long: { day: "numeric", month: "long", year: "numeric" },
  datetime: {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
};

export function formatDate(
  date: string | null | undefined,
  format: DateFormatOption = "long",
  fallback = "Date unknown",
): string {
  if (!date) return fallback;
  return new Date(date).toLocaleDateString(
    "en-GB",
    DATE_FORMAT_OPTIONS[format],
  );
}

export function formatOrderNumber(
  orderNumber: string | null | undefined,
): string {
  if (!orderNumber) return "N/A";
  return orderNumber.split("-").pop() ?? orderNumber;
}
