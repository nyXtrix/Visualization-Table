import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useDebounce } from "@/hooks/useDebounce";
import { generateVisualizationTableQuery } from "@/duckDB/query/table/generateVisualizationTableQuery";
import { executeQuery } from "@/duckDB/query/executor/queryExecutor";
import { setTableState } from "@/store/uiSlice";
import { useToast } from "@/hooks/useToast";
import { buildColumnDefinitions } from "@/utils/columnBuilder";
import { buildRowHierarchy } from "@/utils/rowBuilder";
import { sortHierarchicalData } from "@/utils/tableSort";
import { aggregateValues } from "@/utils/aggregation";
import type { HierarchicalRow } from "@/utils/rowBuilder";
import type { VisualizationTableState } from "@/types/visual";
import type { ColumnDef } from "@tanstack/react-table";

export function useVisualizationTableQuery() {
  const [tableResult, setTableResult] = useState<{
    data: Record<string, unknown>[];
    columns: ColumnDef<unknown>[];
  }>({ data: [], columns: [] });
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { showToast } = useToast();
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
        console.log("RAW DuckDB result:", result);
        const hierarchicalData = buildRowHierarchy(result, rows, values);

        const allKeys = Array.from(new Set(result.flatMap(r => Object.keys(r))));
        const colDefinitions = buildColumnDefinitions(allKeys, debouncedVisual);
        
        let processedData = hierarchicalData;
        
        const hasPivotColumns = debouncedVisual.columns.length > 0;
        if (hasPivotColumns && debouncedVisual.values.length > 0) {
          const rowKeyStrings = rows.map((r) => `${r.tableName}.${r.name}`);
          const visualizationKeys = allKeys.filter((k) => !rowKeyStrings.includes(k) && k !== "__level");
          const firstAgg = values[0]?.aggregation || "sum";

          const addGrandTotalRows = (nodes: HierarchicalRow[]) => {
            nodes.forEach(node => {
              const rowValues = visualizationKeys.map(key => node[key]);
              node["GRAND_TOTAL|||"] = aggregateValues(rowValues, firstAgg);
              if (node.subRows) addGrandTotalRows(node.subRows);
            });
          };
          addGrandTotalRows(processedData);
        }

        if (debouncedVisual.sortConfig) {
          processedData = sortHierarchicalData(processedData, debouncedVisual.sortConfig);
        }

        setTableResult({ data: processedData, columns: colDefinitions });

        dispatch(setTableState("CONFIG_ASSIGNED"));
      } catch (error: unknown) {
        if (error instanceof Error && error.message === "DISCONNECTED_DATASETS") {
          dispatch(setTableState("DISCONNECTED_DATASETS"));
        } else {
          showToast({
            type: "error",
            message: "Table Execution Error",
            description: error instanceof Error ? error.message : "An unexpected error occurred",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedVisual]);

  return { data: tableResult.data, columns: tableResult.columns, loading };
}
