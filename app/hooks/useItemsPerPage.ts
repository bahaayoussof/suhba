import { useState, useEffect } from "react";

export interface UseItemsPerPageOptions {
  default?: number;
  sm?: number;
  lg?: number;
}

/**
 * A custom hook to dynamically calculate items per page based on window width.
 *
 * @param options Custom items per page for different breakpoints
 * @returns The active number of items per page
 */
export function useItemsPerPage(options: UseItemsPerPageOptions = {}) {
  const { default: defaultScreen = 8, sm: smallScreen = 3, lg: largeScreen = 6 } = options;
  const [windowWidth, setWindowWidth] = useState<number | null>(null);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowWidth === null) return defaultScreen;
  if (windowWidth < 1024) return smallScreen;
  if (windowWidth < 1280) return largeScreen;
  return defaultScreen;
}
