import type { ColumnDef } from "@tanstack/react-table"

export function generateColumns<T extends Record<string, unknown>>(
  data: T[]
): ColumnDef<T>[] {

  if (!data.length) return []

  return Object.keys(data[0]).map((key) => ({
    accessorKey: key,
    header: key
  }))
}