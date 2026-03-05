import DataTable from "@/components/table/DataTable"
import { dummyTableData } from "@/utils/dummyTableData"
import { dummyColumns } from "@/utils/dummyTableColumns"

const VisualTablePage = () => {
  return (
    <div className="flex h-full">

      {/* TABLE AREA */}
      <div className="flex-1 p-4 overflow-auto">

        <DataTable
          data={dummyTableData}
          columns={dummyColumns}
        />

      </div>

    </div>
  )
}

export default VisualTablePage