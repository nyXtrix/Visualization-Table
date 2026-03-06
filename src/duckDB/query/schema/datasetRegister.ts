import type { Dataset } from "@/types/visual";

let datasets: Dataset[] = [];

export function registerDataset(dataset: Dataset) {
  datasets.push(dataset);
}

export function getDataset(tableName: string) {
  return datasets.find((d) => d.tableName === tableName);
}

export function getDatasets() {
  return datasets;
}
