import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Field = {
  id: number;
  name: string;
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

export const { addDataset } = datasetSlice.actions;
export default datasetSlice.reducer;
