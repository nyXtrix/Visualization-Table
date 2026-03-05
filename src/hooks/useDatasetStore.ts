import { useState } from "react"
import type { Dataset } from "@/types/pivot"

export function useDatasetStore() {

  const [datasets, setDatasets] = useState<Dataset[]>([])

  const addDataset = (dataset: Dataset) => {
    setDatasets((prev) => [...prev, dataset])
  }

  const removeDataset = (id: string) => {
    setDatasets((prev) =>
      prev.filter((d) => d.id !== id)
    )
  }

  return {
    datasets,
    addDataset,
    removeDataset
  }
}