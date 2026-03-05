import type { FieldItem as Field } from "@/types/pivot"

interface FieldItemProps {
  field: Field
}

const DataFieldItem = ({ field }: FieldItemProps) => {
  return (
    <div className="px-2 py-1 text-xs w-3/4 truncate rounded hover:bg-gray-100 cursor-pointer">
      {field.name}
    </div>
  )
}

export default DataFieldItem