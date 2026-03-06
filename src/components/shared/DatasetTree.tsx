import type { Dataset } from "@/types/visual"
import DatasetNode from "./DatasetNode"

interface DatasetTreeProps {
  datasets: Dataset[];
  isSearchActive?: boolean;
}

const DatasetTree = ({ datasets, isSearchActive }: DatasetTreeProps) => {
  return (
    <div className="flex flex-col gap-2">
      {datasets.map((dataset) => (
        <DatasetNode key={dataset.id} dataset={dataset} isSearchActive={isSearchActive} />
      ))}
    </div>
  )
}

export default DatasetTree;