import { useState, useEffect } from "react";

/**
 * A custom hook to debounce a value.
 * @param value The value to debounce (e.g., search query)
 * @param delay The delay in milliseconds (e.g., 500)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (e.g., user is still typing)
      // or if delay changes or unmount occurs
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay], // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}