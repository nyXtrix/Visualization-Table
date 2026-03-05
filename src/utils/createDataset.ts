import type { Dataset, FieldItem } from "@/types/pivot"

export function createDataset(
  fileName: string,
  columns: string[]
): Dataset {

  const fields: FieldItem[] = columns.map((name, index) => ({
    id: index,
    name
  }))

  return {
    id: crypto.randomUUID(),
    name: fileName,
    fields
  }
}