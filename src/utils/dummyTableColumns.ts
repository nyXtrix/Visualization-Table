import type { ColumnDef } from "@tanstack/react-table"
import type { TableRow } from "./dummyTableData"

export const dummyColumns: ColumnDef<TableRow>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "country",
    header: "Country"
  },
  {
    accessorKey: "city",
    header: "City"
  },
  {
    accessorKey: "revenue",
    header: "Revenue"
  }
]