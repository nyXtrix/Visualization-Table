import type { VisualizationField } from "@/types/visual";

export interface HierarchicalRow extends Record<string, unknown> {
  subRows?: HierarchicalRow[];
  rowLabel?: string;
  rowDepth?: number;
}

export const buildRowHierarchy = (
  flatData: Record<string, unknown>[],
  rowFields: VisualizationField[],
  _valueFields: VisualizationField[] = []
): HierarchicalRow[] => {
  if (flatData.length === 0) return [];
  if (rowFields.length === 0) return flatData as HierarchicalRow[];

  const groupKeys = rowFields.map((f) => `${f.tableName}.${f.name}`);
  const maxLevel = (1 << rowFields.length) - 1;

  const grandTotalRowData = flatData.find(r => Number(r.__level) === maxLevel) || flatData[0];
  
  const grandTotalRow: HierarchicalRow = {
    ...grandTotalRowData,
    rowLabel: "All",
    rowDepth: -1,
  };

  grandTotalRow.subRows = createHierarchy(flatData, groupKeys, 0, {});

  return [grandTotalRow];
};

const createHierarchy = (
  rows: Record<string, unknown>[],
  groupKeys: string[],
  depth: number,
  parentFilters: Record<string, unknown>
): HierarchicalRow[] => {
  if (depth >= groupKeys.length) return [];

  const currentKey = groupKeys[depth];
  const subtotalLevel = (1 << (groupKeys.length - 1 - depth)) - 1;
  const detailLevel = 0;

  const relevantRows = rows.filter(r => 
    Object.entries(parentFilters).every(([k, v]) => r[k] === v)
  );

  const levelRows = relevantRows.filter(r => Number(r.__level) === subtotalLevel && r[currentKey] !== null);

  return levelRows.map((levelRow) => {
    const groupValue = levelRow[currentKey];
    
    const node: HierarchicalRow = {
      ...levelRow,
      rowLabel: String(groupValue ?? "(Empty)"),
      rowDepth: depth
    };

    if (depth < groupKeys.length - 1) {
      const nextFilters = { ...parentFilters, [currentKey]: groupValue };
      node.subRows = createHierarchy(relevantRows, groupKeys, depth + 1, nextFilters);
    } else {
      const detailRow = relevantRows.find(r => 
        Number(r.__level) === detailLevel && 
        Object.entries({ ...parentFilters, [currentKey]: groupValue }).every(([k, v]) => r[k] === v)
      );
      if (detailRow) Object.assign(node, detailRow);
    }

    return node;
  });
};
