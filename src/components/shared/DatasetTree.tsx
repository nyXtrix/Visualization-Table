import type { Dataset } from "@/types/pivot"
import DatasetNode from "./DatasetNode"

interface DatasetTreeProps {
  datasets: Dataset[]
}

const DatasetTree = ({ datasets }: DatasetTreeProps) => {
  return (
    <div className="flex flex-col gap-2">
      {datasets.map((dataset) => (
        <DatasetNode key={dataset.id} dataset={dataset} />
      ))}
    </div>
  )
}

export default DatasetTree