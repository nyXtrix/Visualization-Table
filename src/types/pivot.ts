export type AggregationType = "sum" | "avg" | "count" | "min" | "max"

export interface FieldItem {
  id: number
  name: string
}

export interface VisualTableValue extends FieldItem {
  aggregation: AggregationType
}

export interface VisualTableState {
  rows: FieldItem[]
  columns: FieldItem[]
  values: VisualTableValue[]
  filters: FieldItem[]
}

export interface Dataset {
  id: string
  name: string
  fields: FieldItem[]
}