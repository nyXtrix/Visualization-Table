import type { VisualizationField } from "@/types/visual";

export interface HierarchicalRow extends Record<string, unknown> {
  subRows?: HierarchicalRow[];
  rowLabel?: string;
  rowDepth?: number;
}

export const buildRowHierarchy = (
  flatData: Record<string, unknown>[],
  rowFields: VisualizationField[]
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
    
    const sum = flatData.reduce((acc, row) => {
      const val = row[key];
      return acc + (typeof val === 'number' ? val : 0);
    }, 0);
    
    if (!isNaN(sum)) grandTotalRow[key] = sum;
  });

  grandTotalRow.subRows = createHierarchy(flatData, groupKeys, 0);

  return [grandTotalRow];
};
const createHierarchy = (
  rows: Record<string, unknown>[],
  groupKeys: string[],
  depth: number
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

      const sum = matchingRows.reduce((acc, row) => {
        const val = row[columnKey];
        return acc + (typeof val === 'number' ? val : 0);
      }, 0);

      if (!isNaN(sum)) parentRow[columnKey] = sum;
    });

    if (depth < groupKeys.length - 1) {
      parentRow.subRows = createHierarchy(matchingRows, groupKeys, depth + 1);
    }

    hierarchy.push(parentRow);
  });

  return hierarchy;
};
