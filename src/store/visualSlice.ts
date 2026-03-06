import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AggregationType, VisualizationField, VisualizationTableState } from "@/types/visual";

const initialState: VisualizationTableState = {
  rows: [],
  columns: [],
  values: [],
};


const visualSlice = createSlice({
  name: "visual",
  initialState,
  reducers: {
    addRow(state, action: PayloadAction<VisualizationField>) {
      const { name, tableName } = action.payload;
      
      state.rows = state.rows.filter(f => f.name !== name || f.tableName !== tableName);
      state.columns = state.columns.filter(f => f.name !== name || f.tableName !== tableName);
      state.values = state.values.filter(f => f.name !== name || f.tableName !== tableName);
      
      state.rows.push(action.payload);
    },

    addColumn(state, action: PayloadAction<VisualizationField>) {
      const { name, tableName } = action.payload;

      state.rows = state.rows.filter(f => f.name !== name || f.tableName !== tableName);
      state.columns = state.columns.filter(f => f.name !== name || f.tableName !== tableName);
      state.values = state.values.filter(f => f.name !== name || f.tableName !== tableName);
      
      state.columns.push(action.payload);
    },

    addValue(state, action: PayloadAction<VisualizationField>) {
      const { name, tableName, type } = action.payload;

      state.rows = state.rows.filter(f => f.name !== name || f.tableName !== tableName);
      state.columns = state.columns.filter(f => f.name !== name || f.tableName !== tableName);
      state.values = state.values.filter(f => f.name !== name || f.tableName !== tableName);

      let defaultAgg: AggregationType = "sum";
      const t = (type || "").toUpperCase();
      
      const isNumeric = t.includes("INT") || t.includes("DOUBLE") || t.includes("FLOAT") || t.includes("DECIMAL") || t.includes("NUMERIC");
      const isDate = t.includes("DATE") || t.includes("TIMESTAMP");

      if (isDate) {
        defaultAgg = "earliest";
      } else if (!isNumeric) {
        defaultAgg = "count";
      }

      state.values.push({ ...action.payload, aggregation: defaultAgg });
    },

    updateValueAggregation(state, action: PayloadAction<{ index: number, aggregation: AggregationType }>) {
      const { index, aggregation } = action.payload;
      if (state.values[index]) {
        state.values[index].aggregation = aggregation;
      }
    },

    removeRow(state, action: PayloadAction<VisualizationField>) {
      state.rows = state.rows.filter((r) => r.name !== action.payload.name || r.tableName !== action.payload.tableName);
    },

    removeColumn(state, action: PayloadAction<VisualizationField>) {
      state.columns = state.columns.filter((c) => c.name !== action.payload.name || c.tableName !== action.payload.tableName);
    },

    removeValue(state, action: PayloadAction<VisualizationField>) {
      state.values = state.values.filter((v) => v.name !== action.payload.name || v.tableName !== action.payload.tableName);
    },

    resetConfig(state) {
      state.rows = [];
      state.columns = [];
      state.values = [];
    },

    checkField(state, action: PayloadAction<VisualizationField>) {
      const { name, tableName, type } = action.payload;
      
      const isInRows = state.rows.some(f => f.name === name && f.tableName === tableName);
      const isInCols = state.columns.some(f => f.name === name && f.tableName === tableName);
      const isInVals = state.values.some(f => f.name === name && f.tableName === tableName);

      if (isInRows || isInCols || isInVals) {
        state.rows = state.rows.filter(f => f.name !== name || f.tableName !== tableName);
        state.columns = state.columns.filter(f => f.name !== name || f.tableName !== tableName);
        state.values = state.values.filter(f => f.name !== name || f.tableName !== tableName);
        return;
      }

      const t = (type || "").toUpperCase();
      const isNumeric = t.includes("INT") || t.includes("DOUBLE") || t.includes("FLOAT") || t.includes("DECIMAL") || t.includes("NUMERIC");

      if (isNumeric) {
        // Values logic
        let defaultAgg: AggregationType = "sum";
        state.values.push({ ...action.payload, aggregation: defaultAgg });
      } else {
        // Rows/Columns priority logic
        if (state.rows.length <= state.columns.length) {
          state.rows.push(action.payload);
        } else {
          state.columns.push(action.payload);
        }
      }
    },
  },
});

export const {
  addRow,
  addColumn,
  addValue,
  updateValueAggregation,
  removeRow,
  removeColumn,
  removeValue,
  resetConfig,
  checkField,
} = visualSlice.actions;

export default visualSlice.reducer;
