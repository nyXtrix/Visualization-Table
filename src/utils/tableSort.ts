import type { SortConfig } from "@/types/visual";
import type { HierarchicalRow } from "./rowBuilder";

export const sortHierarchicalData = (
  data: HierarchicalRow[],
  sortConfig: SortConfig
): HierarchicalRow[] => {
  if (!sortConfig || !sortConfig.columnId) return data;

  const { columnId, direction } = sortConfig;

  const sortRecursive = (rows: HierarchicalRow[]) => {
    rows.sort((a, b) => {
      const valueA = a[columnId];
      const valueB = b[columnId];

      if (valueA === valueB) return 0;
      
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      let comparison = 0;
      if (typeof valueA === "number" && typeof valueB === "number") {
        comparison = valueA - valueB;
      } else {
        comparison = String(valueA).localeCompare(String(valueB));
      }

      return direction === "asc" ? comparison : -comparison;
    });

    rows.forEach((row) => {
      if (row.subRows && row.subRows.length > 0) {
        sortRecursive(row.subRows);
      }
    });
  };

  const result = [...data];
  
  result.forEach(row => {
    if (row.subRows) {
      sortRecursive(row.subRows);
    }
  });

  return result;
};
