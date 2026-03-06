import { useCallback } from "react";
import Dropzone from "@/components/shared/Dropzone";
import FeaturesCard from "@/components/shared/FeaturesCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addRow,
  addColumn,
  addValue,
  removeRow,
  removeColumn,
  removeValue,
  updateValueAggregation,
} from "@/store/visualSlice";
import type { AggregationType } from "@/types/visual";

interface VisualisationCardProps {
  id: string;
  isOpen: boolean;
  handleCloseCardClick: (id: string) => void;
}


const VisualisationCard = ({
  id,
  isOpen,
  handleCloseCardClick,
}: VisualisationCardProps) => {
  const dispatch = useAppDispatch();

  const { rows, columns, values } = useAppSelector((state) => state.visual);

  const handleRowDrop = useCallback((fieldName: string, tableName: string, type?: string) => {
    dispatch(addRow({ name: fieldName, tableName, type }));
  }, [dispatch]);

  const handleColumnDrop = useCallback((fieldName: string, tableName: string, type?: string) => {
    dispatch(addColumn({ name: fieldName, tableName, type }));
  }, [dispatch]);

  const handleValueDrop = useCallback((fieldName: string, tableName: string, type?: string) => {
    dispatch(addValue({ name: fieldName, tableName, type }));
  }, [dispatch]);

  const handleRemoveRow = useCallback((index: number) => {
    const item = rows[index];
    if (item) dispatch(removeRow(item));
  }, [dispatch, rows]);

  const handleRemoveColumn = useCallback((index: number) => {
    const item = columns[index];
    if (item) dispatch(removeColumn(item));
  }, [dispatch, columns]);

  const handleRemoveValue = useCallback((index: number) => {
    const item = values[index];
    if (item) dispatch(removeValue(item));
  }, [dispatch, values]);

  const handleUpdateValueAggregation = useCallback((index: number, aggregation: AggregationType) => {
    dispatch(updateValueAggregation({ index, aggregation }));
  }, [dispatch]);

  const mappedRows = rows.map((r, i) => ({ id: i, name: r.name, tableName: r.tableName, type: r.type }));
  const mappedCols = columns.map((c, i) => ({ id: i, name: c.name, tableName: c.tableName, type: c.type }));
  const mappedVals = values.map((v, i) => ({ 
    id: i, 
    name: v.name, 
    tableName: v.tableName,
    aggregation: v.aggregation,
    type: v.type 
  }));

  return (
    <FeaturesCard
      title="Visualisation"
      isOpen={isOpen}
      handleCloseClick={handleCloseCardClick}
      childrenClassName="flex flex-col gap-3"
      enableSearch={false}
      id={id}
    >
      <Dropzone
        title="Rows"
        fields={mappedRows}
        handleDropField={handleRowDrop}
        handleRemoveField={handleRemoveRow}
      />

      <Dropzone
        title="Columns"
        fields={mappedCols}
        handleDropField={handleColumnDrop}
        handleRemoveField={handleRemoveColumn}
      />

      <Dropzone
        title="Values"
        fields={mappedVals}
        handleDropField={handleValueDrop}
        handleRemoveField={handleRemoveValue}
        onUpdateAggregation={handleUpdateValueAggregation}
      />
    </FeaturesCard>
  );
};

export default VisualisationCard;
