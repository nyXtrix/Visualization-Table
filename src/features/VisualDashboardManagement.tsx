import React from "react";
import DataCard from "./Visual_Dashboard/Features/DataCard";
import type { Dataset } from "@/types/pivot";
import VisualisationCard from "./Visual_Dashboard/Features/VisualisationCard";
import EmptyState from "./Visual_Dashboard/EmptyState";
import AppLayout from "@/components/layout/AppLayout";
import DataEmptyState from "@/components/shared/DataEmptyState";
import VisualTablePage from "./Visual_Dashboard/VisualTablePage";
const datasets: Dataset[] = [
  {
    id: "dataset1",
    name: "dataset_1.csv",
    fields: [
      { id: 1, name: "Country" },
      { id: 2, name: "City" },
      { id: 3, name: "Revenue" },
    ],
  },
  {
    id: "dataset2",
    name: "dataset_2.csv",
    fields: [
      { id: 4, name: "Product" },
      { id: 5, name: "Price" },
      { id: 6, name: "Category" },
    ],
  },
];

const VisualDashboardManagement = () => {
  const [activeItems, setActiveItems] = React.useState<string[]>([]);

  const enablePrimarySidebarActions = datasets.length > 0;

  const handlePrimaryActionButtonClick = (id: string) => {
    setActiveItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }

      return [...prev, id];
    });
  };

  const isDataOpen = activeItems.includes("data");
  const isVisualisationOpen = activeItems.includes("visualisation");
  return (
    <AppLayout
      activeItems={activeItems}
      handlePrimaryActionButtonClick={handlePrimaryActionButtonClick}
      isSidebarPrimaryActionsEnabled={enablePrimarySidebarActions}
    >
      <div className="bg-white flex h-full w-full border overflow-hidden">
        <div className="h-full w-full border">
          <VisualTablePage/>
        </div>
        <VisualisationCard id="visualisation" isOpen={isVisualisationOpen} handleCloseCardClick={handlePrimaryActionButtonClick}/>
        <DataCard dataset={datasets} id="data" isOpen={isDataOpen} handleCardCloseClick={handlePrimaryActionButtonClick}/>
      </div>
    </AppLayout>
  );
};

export default VisualDashboardManagement;
