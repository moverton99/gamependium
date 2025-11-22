import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes conditionally.
 * Combines `clsx` for conditional logic and `tailwind-merge` to handle conflicting classes.
 * 
 * @param inputs - A list of class values (strings, objects, arrays, etc.).
 * @returns A merged string of class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
