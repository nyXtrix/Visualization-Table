import { FormatedFieldName } from "./formatting";
import type { VisualizationTableState } from "@/types/visual";
import { aggregateValues } from "./aggregation";

export const getAggTitle = (agg?: string) => {
  if (!agg) return "";
  return agg.charAt(0).toUpperCase() + agg.slice(1).replace("_", " ");
};

export const buildColumnDefinitions = (
  allKeys: string[],
  visualizationState: VisualizationTableState
) => {
  const { rows, values } = visualizationState;
  const rowKeyStrings = rows.map((r) => `${r.tableName}.${r.name}`);

  const visualizationKeys = allKeys.filter((k) => !rowKeyStrings.includes(k) && k !== "__level");

  const rowCols = rows.length > 0
    ? [{
      id: "rowLabels",
      accessorKey: "rowLabel",
      header: rows.length === 1 ? FormatedFieldName(rows[0].name) : "Row Labels",
      meta: { isRowHeader: true },
    }]
    : [];

  const buildTree = (keys: string[]) => {
    const root: any[] = [];
    keys.forEach((key) => {
      const parts = key.split("|||");
      let currentLevel = root;
      parts.forEach((part, index) => {
        let displayHeader = FormatedFieldName(part.split(".").pop() || part);

        if (index === parts.length - 1 && values.length > 0) {
          const [tName, fName] = part.includes(".") ? part.split(".") : ["", part];
          const vField = values.find(
            (v) => (v.tableName === tName && v.name === fName) || v.name === part
          );
          if (vField) {
            const aggTitle = getAggTitle(vField.aggregation);
            displayHeader = aggTitle ? `${aggTitle} of ${displayHeader}` : displayHeader;
          }
        }

        let existing = currentLevel.find((c) => c.header === displayHeader);
        if (!existing) {
          const isDate = part.toLowerCase().includes("date") || part.toLowerCase().includes("time");
          existing = {
            header: displayHeader,
            meta: { isDate }
          };
          if (index === parts.length - 1) {
            existing.id = key;
            existing.accessorFn = (row: Record<string, unknown>) => row[key];
          } else {
            existing.columns = [];
          }
          currentLevel.push(existing);
        }
        currentLevel = existing.columns;
      });
    });
    return root;
  };

  const leafCols = buildTree(visualizationKeys);

  const hasPivotColumns = visualizationState.columns.length > 0;

  const grandTotalCol = hasPivotColumns && values.length > 0 ? [{
    id: "GRAND_TOTAL|||",
    accessorFn: (row: Record<string, unknown>) => {
      const allValues = visualizationKeys.map(key => row[key]);
      const firstAgg = values[0]?.aggregation || "sum";
      return aggregateValues(allValues, firstAgg);
    },
    header: "Grand Total",
  }] : [];

  return [...rowCols, ...grandTotalCol, ...leafCols];
};
