import { useMemo, useState, useCallback } from "react";

const DEFAULT_VISIBLE_COUNT = 4;

export type UseFilterReturn<T> = {
  /** Filtered and sliced list to render (4 items or all when expanded) */
  displayedItems: T[];
  /** Whether there are more items than the visible count (before expanding) */
  hasMore: boolean;
  /** Whether "ver más" was clicked and all items are shown */
  isExpanded: boolean;
  /** Call to show the rest of the items */
  onShowMore: () => void;
  /** Call to collapse back to the initial visible count */
  onShowLess: () => void;
  /** Current search query */
  searchQuery: string;
  /** Set search query to filter by the given key */
  setSearchQuery: (query: string) => void;
};

/**
 * Filters a catalog by a search key and limits initial display to 4 items with "ver más".
 * @param catalog - Array of items (e.g. products)
 * @param searchKey - Key of each item to search in (e.g. "descripcion", "productName")
 */
function useFilter<T extends Record<string, unknown>>(
  catalog: T[],
  searchKey: keyof T
): UseFilterReturn<T> {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredCatalog = useMemo(() => {
    if (!searchQuery.trim()) return catalog;
    const q = searchQuery.trim().toLowerCase();
    return catalog.filter((item) => {
      const value = item[searchKey];
      if (value == null) return false;
      return String(value).toLowerCase().includes(q);
    });
  }, [catalog, searchKey, searchQuery]);

  const displayedItems = useMemo(() => {
    if (isExpanded) return filteredCatalog;
    return filteredCatalog.slice(0, DEFAULT_VISIBLE_COUNT);
  }, [filteredCatalog, isExpanded]);

  const hasMore =
    !isExpanded && filteredCatalog.length > DEFAULT_VISIBLE_COUNT;

  const onShowMore = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const onShowLess = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return {
    displayedItems,
    hasMore,
    isExpanded,
    onShowMore,
    onShowLess,
    searchQuery,
    setSearchQuery,
  };
}

export default useFilter;
