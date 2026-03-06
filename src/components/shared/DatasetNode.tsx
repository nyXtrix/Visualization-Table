import { useState, useCallback } from "react";
import type { Dataset } from "@/types/visual";
import DataFieldItem from "./DataFieldItem";
import { ChevronDown, ChevronRight, TableProperties } from "lucide-react";
import IconButton from "../ui/IconButton";

interface DatasetNodeProps {
  dataset: Dataset;
  isSearchActive?: boolean;
}

const DatasetNode = ({ dataset, isSearchActive }: DatasetNodeProps) => {
  const [isDatasetOpen, setIsDatasetOpen] = useState<boolean>(false);

  const handleOpenDataset = useCallback(() => {
    setIsDatasetOpen((prev) => !prev);
  }, []);

  const isOpen = isDatasetOpen || isSearchActive;

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[20px_1fr] items-center gap-2">
        <IconButton
          icon={isOpen ? ChevronDown : ChevronRight}
          variant="ghost"
          className="p-0 text-gray-400 hover:bg-transparent cursor-pointer"
          onClick={handleOpenDataset}
        />

        <div className="flex items-center gap-2 py-1 text-sm font-medium">
          <TableProperties className="w-4 h-4 " strokeWidth={1.5}/>
          <span className="w-50 truncate">{dataset.name}</span>
        </div>
      </div>
      {isOpen && (
        <div className="grid grid-cols-[36px_1fr] gap-2">
          <div />
          <div className="flex flex-col gap-1">
            {dataset.fields.map((field) => (
              <DataFieldItem key={field.id} field={field} tableName={dataset.tableName} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetNode;
