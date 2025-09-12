import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() is a helper that merges Tailwind classes conditionally.
 * It uses clsx + tailwind-merge to avoid conflicting styles.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
