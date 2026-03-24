import { lazy, Suspense, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import AppLayout from "@/components/layout/AppLayout";
import { csvLoader } from "@/duckDB/core/csvLoader";
import { getTableColumns } from "@/duckDB/core/getColumns";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addDataset } from "@/store/datasetSlice";
import { setTableState, setSidebarItems, toggleSidebarItem } from "@/store/uiSlice";
import Loader from "@/components/shared/Loader";
import { useVisualizationTableQuery } from "@/hooks/useVisualizationTableQuery";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import ConfirmationModal from "@/components/common/ConfirmationModal";

const DataCard = lazy(() => import("./Visual_Dashboard/Features/DataCard"));
const VisualisationCard = lazy(() => import("./Visual_Dashboard/Features/VisualisationCard"));
const VisualizationTablePage = lazy(() => import("./Visual_Dashboard/VisualizationTablePage"));

const VisualDashboardManagement = () => {
  const { showExitModal, setShowExitModal, handleConfirmExit } = useUnsavedChanges();
  const dispatch = useAppDispatch();
  const datasets = useAppSelector((state) => state.dataset.datasets);
  const { activeSidebarItems: activeItems, settings } = useAppSelector((state) => state.ui);
  const { sidebarSide } = settings;

  const { data, columns, loading: queryLoading } = useVisualizationTableQuery();
  const [uploadLoading, setUploadLoading] = useState(false);

  const handleFileUpload = useCallback(async (file: File | null) => {
    if (!file) return;

    setUploadLoading(true);
    try {
      const isFirstUpload = datasets.length === 0;
      const tableName = await csvLoader(file);
      const cols = await getTableColumns(tableName);
      if (isFirstUpload) {
        dispatch(setTableState("CONFIG_EMPTY"));
      }

      dispatch(
        addDataset({
          id: crypto.randomUUID(),
          name: file.name,
          tableName,
          fields: cols.map((col: { name: string; type: string }, index: number) => ({
            id: index,
            name: col.name,
            type: col.type,
          })),
        })
      );

      if (isFirstUpload) {
        dispatch(setSidebarItems(["data", "visualization"]));
      }
    } finally {
      setUploadLoading(false);
    }
  }, [dispatch, datasets.length]);


  const handlePrimaryActionButtonClick = useCallback((id: string) => {
    dispatch(toggleSidebarItem(id));
  }, [dispatch]);

  const isDataOpen = activeItems.includes("data");
  const isVisualisationOpen = activeItems.includes("visualization");
  
  return (
    <>
      {uploadLoading && datasets.length === 0 && <Loader fullPage />}
      <ConfirmationModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        onConfirm={handleConfirmExit}
        title="Unsaved Changes"
        description="Are you sure you want to leave? Your uploaded datasets and configurations will be lost."
        confirmText="Leave Page"
        cancelText="Stay"
        variant="danger"
      />
      <AppLayout
        isSidebarPrimaryActionsEnabled={datasets.length > 0}
      >
        <div className={cn(
          "bg-white dark:bg-black flex h-full w-full overflow-hidden",
          sidebarSide === 'left' ? "flex-row-reverse" : "flex-row"
        )}>
          <div className="h-full flex-1 min-w-0 border-r bg-gray-50/30 dark:border dark:border-gray-600 dark:bg-gray-900/90">
            <Suspense fallback={<Loader fullPage/>}>
              <VisualizationTablePage
                data={data}
                columns={columns}
                initialFileUpload={handleFileUpload}
                loading={queryLoading}
              />
            </Suspense>
          </div>
          
          <Suspense fallback={null}>
            <VisualisationCard
              id="visualization"
              isOpen={isVisualisationOpen}
              handleCloseCardClick={handlePrimaryActionButtonClick}
            />
          </Suspense>

          <Suspense fallback={null}>
            <DataCard
              dataset={datasets}
              id="data"
              isOpen={isDataOpen}
              handleCardCloseClick={handlePrimaryActionButtonClick}
              onFileUpload={handleFileUpload}
              isLoading={uploadLoading}
            />
          </Suspense>
        </div>
      </AppLayout>
    </>
  );
};

export default VisualDashboardManagement;
