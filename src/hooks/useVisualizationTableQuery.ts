import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { generateVisualizationTableQuery } from "@/duckDB/query/table/generateVisualizationTableQuery";
import { executeQuery } from "@/duckDB/query/executor/queryExecutor";
import { setTableState } from "@/store/uiSlice";
import { buildColumnDefinitions } from "@/utils/columnBuilder";
import type { VisualizationTableState } from "@/types/visual";
import type { ColumnDef } from "@tanstack/react-table";

export function useVisualizationTableQuery() {
  const [tableResult, setTableResult] = useState<{ data: Record<string, unknown>[]; columns: ColumnDef<unknown>[] }>({ data: [], columns: [] });
  const [loading, setLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const datasets = useAppSelector((state) => state.dataset.datasets);
  const visual = useAppSelector((state) => state.visual);
  const debouncedVisual = useDebounce<VisualizationTableState>(visual, 300);

  useEffect(() => {
    const { rows, columns: cols, values } = debouncedVisual;

    if (!rows.length && !cols.length && !values.length) {
      setTableResult({ data: [], columns: [] });
      if (datasets.length > 0) {
        dispatch(setTableState("CONFIG_EMPTY"));
      }
      return;
    }

    if (datasets.length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = await generateVisualizationTableQuery({
          rows,
          columns: cols,
          values,
        });

        const result = await executeQuery(query);

        const allKeys = result.length > 0 ? Object.keys(result[0]) : [];
        const colDefinitions = buildColumnDefinitions(allKeys, debouncedVisual);
        
        // Single state update to prevent double render
        setTableResult({ data: result, columns: colDefinitions });
        
        dispatch(setTableState("CONFIG_ASSIGNED"));
      } catch (error) {
        console.error("Visualization Table Query Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedVisual, datasets, dispatch]);

  return { data: tableResult.data, columns: tableResult.columns, loading };
}
