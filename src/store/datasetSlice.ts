import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";

type Field = {
  id: number;
  name: string;
  type?: string;
};

type Dataset = {
  id: string;
  name: string;
  tableName: string;
  fields: Field[];
};

interface DatasetState {
  datasets: Dataset[];
}

const initialState: DatasetState = {
  datasets: [],
};

const datasetSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    addDataset(state, action: PayloadAction<Dataset>) {
      state.datasets.push(action.payload);
    },
  },
});

export const selectDatasets = (state: { dataset: DatasetState }) => state.dataset.datasets;

export const selectDatasetById = (id: string) => 
  createSelector([selectDatasets], (datasets) => datasets.find((d) => d.id === id));

export const { addDataset } = datasetSlice.actions;
export default datasetSlice.reducer;
