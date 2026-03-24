import { ChartBarIncreasing, Database, Settings, Maximize2, Minimize2 } from "lucide-react";
import type { SidebarActionType } from "../types/utils";
import type { AggregationType } from "@/types/visual";

export const SIDEBAR_PRIMARY_ACTIONS: SidebarActionType[] = [
  { id: "data", title: "Data", icon: Database },
  { id: "visualization", title: "Visualization", icon: ChartBarIncreasing },
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
// --- Theme Section ---

export const COLOR_OPTIONS = [
  { id: 'blue', color: '#3b82f6' },
  { id: 'emerald', color: '#10b981' },
  { id: 'purple', color: '#a855f7' },
  { id: 'amber', color: '#f59e0b' },
] as const;

export const COLOR_MAP = {
  blue: {
    light: {
      primary: "oklch(0.607 0.162 246.287)",
      ring: "oklch(0.707 0.022 261.325)",
      tick: "white",
    },
    dark: {
      primary: "oklch(0.7 0.2 250)",
      ring: "oklch(0.8 0.1 250)",
      tick: "white",
    }
  },
  emerald: {
    light: {
      primary: "oklch(0.696 0.17 162.48)",
      ring: "oklch(0.796 0.05 162.48)",
      tick: "white",
    },
    dark: {
      primary: "oklch(0.8 0.25 160)",
      ring: "oklch(0.9 0.1 160)",
      tick: "white",
    }
  },
  purple: {
    light: {
      primary: "oklch(0.627 0.265 303.9)",
      ring: "oklch(0.727 0.05 303.9)",
      tick: "white",
    },
    dark: {
      primary: "oklch(0.7 0.3 300)",
      ring: "oklch(0.8 0.1 300)",
      tick: "white",
    }
  },
  amber: {
    light: {
      primary: "oklch(0.769 0.188 70.08)",
      ring: "oklch(0.869 0.05 70.08)",
      tick: "oklch(0.985 0.002 247.839)",
    },
    dark: {
      primary: "oklch(0.85 0.2 85)",
      ring: "oklch(0.95 0.1 85)",
      tick: "black", 
    }
  }
} as const;

export const MODAL_POSITION_OPTIONS = [
  { id: 'top-left', icon: Minimize2 },
  { id: 'top-right', icon: Minimize2 },
  { id: 'center', icon: Maximize2 },
  { id: 'bottom-left', icon: Minimize2 },
  { id: 'bottom-right', icon: Minimize2 },
] as const;
