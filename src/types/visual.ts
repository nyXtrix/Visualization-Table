export type AggregationType = 
  | "sum" | "avg" | "count" | "min" | "max" 
  | "count_distinct" | "first" | "last" | "stddev" | "variance" | "median"
  | "earliest" | "latest";

export interface FieldItem {
  id: number;
  name: string;
  type?: string;
}

export interface VisualizationField {
  name: string;
  tableName: string;
  aggregation?: AggregationType;
  type?: string;
}

export interface SortConfig {
  columnId: string;
  direction: "asc" | "desc";
}

export interface VisualizationTableState {
  rows: VisualizationField[];
  columns: VisualizationField[];
  values: VisualizationField[];
  sortConfig?: SortConfig;
}

export interface Dataset {
  id: string;
  name: string;
  fields: FieldItem[];
  tableName: string;
}

export type TableState = "NO_DATA" | "CONFIG_EMPTY" | "CONFIG_ASSIGNED" | "DISCONNECTED_DATASETS";

export type VisualizationRow = Record<
  string,
  string | number | boolean | null | undefined
> & {
  isGrandTotal?: boolean;
};