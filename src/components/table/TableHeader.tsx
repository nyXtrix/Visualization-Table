import {
  flexRender,
  type Table
} from "@tanstack/react-table"

interface TableHeaderProps<TData> {
  table: Table<TData>
}

export default function TableHeader<TData>({
  table
}: TableHeaderProps<TData>) {

  return (
    <thead className="border bg-gray-50">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="px-4 py-2 text-left text-sm font-medium text-gray-700"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}