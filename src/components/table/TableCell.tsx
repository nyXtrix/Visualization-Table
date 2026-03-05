import {
  flexRender,
  type Cell
} from "@tanstack/react-table"

interface TableCellProps<TData> {
  cell: Cell<TData, unknown>
}

export default function TableCell<TData>({
  cell
}: TableCellProps<TData>) {

  return (
    <td className="px-4 py-2">
      {flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )}
    </td>
  )
}