import { FormatedFieldName } from "./formatting";
import type { VisualizationTableState } from "@/types/visual";

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
  
  const rowKeys = allKeys.filter((k) => rowKeyStrings.includes(k));
  const visualizationKeys = allKeys.filter((k) => !rowKeyStrings.includes(k));

  const rowCols = rowKeys.map((k) => {
    const fieldName = k.split(".").pop() || k;
    return {
      id: k,
      accessorFn: (row: Record<string, unknown>) => row[k],
      header: FormatedFieldName(fieldName),
    };
  });

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
          existing = { header: displayHeader };
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
  return [...rowCols, ...leafCols];
};
