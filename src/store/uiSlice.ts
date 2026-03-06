import type { TableState } from "@/types/visual"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface UIState {
  tableState: TableState;
  activeSidebarItems: string[];
}

const initialState: UIState = {
  tableState: "NO_DATA",
  activeSidebarItems: []
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {

    setTableState(state, action: PayloadAction<TableState>) {
      state.tableState = action.payload
    },

    toggleSidebarItem(state, action: PayloadAction<string>) {
      const id = action.payload

      if (state.activeSidebarItems.includes(id)) {
        state.activeSidebarItems = state.activeSidebarItems.filter(
          (item) => item !== id
        )
      } else {
        state.activeSidebarItems.push(id)
      }
    },

    closeSidebarItem(state, action: PayloadAction<string>) {
      state.activeSidebarItems = state.activeSidebarItems.filter(
        (item) => item !== action.payload
      )
    }
  }
})

export const {
  setTableState,
  toggleSidebarItem,
  closeSidebarItem
} = uiSlice.actions

export default uiSlice.reducer