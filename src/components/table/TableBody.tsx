import type { Table } from "@tanstack/react-table"
import TableRow from "./TableRow"

interface TableBodyProps<TData> {
  table: Table<TData>
}

const TableBody = <TData,>({
  table
}: TableBodyProps<TData>) => {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} row={row} />
      ))}
    </tbody>
  )
}

export default TableBody;