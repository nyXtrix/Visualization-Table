import { ChartBarIncreasing, Database, Settings } from "lucide-react";
import type { SidebarActionType } from "../types/utils";
import type { AggregationType } from "@/types/visual";

export const SIDEBAR_PRIMARY_ACTIONS: SidebarActionType[] = [
  { id: "data", title: "Data", icon: Database },
  { id: "visualisation", title: "Visualisation", icon: ChartBarIncreasing },
];

export const SIDEBAR_SECONDARY_ACTIONS: SidebarActionType[] = [
  { id: "settings", title: "Settings", icon: Settings },
];

export const ACCEPTED_FILE_FORMAT = [];

export const MAX_VISUALIZATION_COMBINATIONS = 50;

export const PAGINATION_OPTIONS: { value: number; label: string }[] = [
  { value: 20, label: "20" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

export const AGGREGATION_OPTIONS = {
  STRING: [
    { label: "First", value: "first" as AggregationType },
    { label: "Last", value: "last" as AggregationType },
    { label: "Count(Distinct)", value: "count_distinct" as AggregationType },
    { label: "Count", value: "count" as AggregationType },
  ],
  NUMERIC: [
    { label: "Sum", value: "sum" as AggregationType },
    { label: "Avg", value: "avg" as AggregationType },
    { label: "Min", value: "min" as AggregationType },
    { label: "Max", value: "max" as AggregationType },
    { label: "Count(Distinct)", value: "count_distinct" as AggregationType },
    { label: "Count", value: "count" as AggregationType },
    { label: "Standard deviation", value: "stddev" as AggregationType },
    { label: "Variance", value: "variance" as AggregationType },
    { label: "Median", value: "median" as AggregationType },
  ],
  DATE: [
    { label: "Earliest", value: "earliest" as AggregationType },
    { label: "Latest", value: "latest" as AggregationType },
    { label: "Count(Distinct)", value: "count_distinct" as AggregationType },
    { label: "Count", value: "count" as AggregationType },
  ],
};

export const AGGREGATION_SQL_MAPPING: Record<AggregationType, string> = {
  sum: "SUM",
  avg: "AVG",
  min: "MIN",
  max: "MAX",
  count: "COUNT",
  count_distinct: "COUNT_DISTINCT",
  first: "FIRST",
  last: "LAST",
  stddev: "STDDEV",
  variance: "VAR_SAMP",
  median: "MEDIAN",
  earliest: "MIN",
  latest: "MAX",
};

export const DUCKDB_BUNDLES: any = {
    mvp: {
        mainModule: new URL('@duckdb/duckdb-wasm/dist/duckdb-mvp.wasm', import.meta.url).toString(),
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-mvp.worker.js', import.meta.url).toString(),
    },
    eh: {
        mainModule: new URL('@duckdb/duckdb-wasm/dist/duckdb-eh.wasm', import.meta.url).toString(),
        mainWorker: new URL('@duckdb/duckdb-wasm/dist/duckdb-browser-eh.worker.js', import.meta.url).toString(),
    },
};
