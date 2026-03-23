import type { VisualizationField } from "@/types/visual";
import { aggregateValues, getVField } from "./aggregation";

export interface HierarchicalRow extends Record<string, unknown> {
  subRows?: HierarchicalRow[];
  rowLabel?: string;
  rowDepth?: number;
}

export const buildRowHierarchy = (
  flatData: Record<string, unknown>[],
  rowFields: VisualizationField[],
  valueFields: VisualizationField[] = []
): HierarchicalRow[] => {
  if (flatData.length === 0) return [];
  if (rowFields.length === 0) return flatData as HierarchicalRow[];

  const groupKeys = rowFields.map((f) => `${f.tableName}.${f.name}`);
  
  const grandTotalRow: HierarchicalRow = {
    rowLabel: "All",
    rowDepth: -1, 
  };

  const allKeys = Object.keys(flatData[0]);
  allKeys.forEach((key) => {
    if (groupKeys.includes(key) || key === 'rowLabel' || key === 'rowDepth') return;
    
    const vField = getVField(key, valueFields);
    const aggValues = flatData.map(r => r[key]);
    const result = aggregateValues(aggValues, vField?.aggregation);
    
    if (result !== undefined) grandTotalRow[key] = result;
  });

  grandTotalRow.subRows = createHierarchy(flatData, groupKeys, 0, valueFields);

  return [grandTotalRow];
};

const createHierarchy = (
  rows: Record<string, unknown>[],
  groupKeys: string[],
  depth: number,
  valueFields: VisualizationField[]
): HierarchicalRow[] => {
  if (depth >= groupKeys.length) return [];

  const currentKey = groupKeys[depth];
  const hierarchy: HierarchicalRow[] = [];

  const groups = Array.from(new Set(rows.map(r => r[currentKey])));

  groups.forEach((groupValue) => {
    const matchingRows = rows.filter(r => r[currentKey] === groupValue);
    
    const parentRow: HierarchicalRow = {
      ...matchingRows[0], 
      rowLabel: String(groupValue ?? "(Empty)"),
      rowDepth: depth
    };

    Object.keys(parentRow).forEach(columnKey => {
      if (groupKeys.includes(columnKey) || columnKey === 'rowLabel' || columnKey === 'rowDepth') return;

      const vField = getVField(columnKey, valueFields);
      const aggValues = matchingRows.map(r => r[columnKey]);
      const result = aggregateValues(aggValues, vField?.aggregation);

      if (result !== undefined) parentRow[columnKey] = result;
    });

    if (depth < groupKeys.length - 1) {
      parentRow.subRows = createHierarchy(matchingRows, groupKeys, depth + 1, valueFields);
    }

    hierarchy.push(parentRow);
  });

  return hierarchy;
};
