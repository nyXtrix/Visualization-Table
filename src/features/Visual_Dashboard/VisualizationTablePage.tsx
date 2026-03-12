import DataTable from "@/components/table/DataTable";
import DataEmptyState from "@/components/shared/DataEmptyState";
import type { ColumnDef } from "@tanstack/react-table";
import { useAppSelector } from "@/store/hooks";
import EmptyConfigState from "@/components/shared/EmptyConfigState";
import Loader from "@/components/shared/Loader";
import DisconnectedConfigState from "@/components/shared/DisconnectedConfigState";

interface VisualizationTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  initialFileUpload: (file: File | null) => void;
  loading?: boolean;
}

const VisualizationTablePage = <TData,>({
  data,
  columns,
  initialFileUpload,
  loading = false,
}: VisualizationTableProps<TData>) => {
  const tableState = useAppSelector((state) => state.ui.tableState);
  
  return (
    <div className="flex h-full w-full overflow-hidden relative">
      <div className="flex-1 flex flex-col h-full min-h-0 min-w-0 p-4">
        {tableState === "NO_DATA" && (
          <div className="p-4 flex-1">
            <DataEmptyState fileUploadChnage={initialFileUpload} />
          </div>
        )}
        {tableState === "CONFIG_EMPTY" && (
          <div className="p-4 flex-1">
            <EmptyConfigState />
          </div>
        )}
        {tableState === "DISCONNECTED_DATASETS" && (
          <div className="p-4 flex-1">
            <DisconnectedConfigState />
          </div>
        )}
        {tableState === "CONFIG_ASSIGNED" && (
          <div className="flex-1 min-h-0 relative">
            <DataTable data={data} columns={columns} />
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center z-50 animate-in fade-in duration-200 pointer-events-none">
                <Loader />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizationTablePage;
