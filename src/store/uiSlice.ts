import type { TableState } from "@/types/visual"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { DashboardSettings } from "@/types/dashboard"

interface UIState {
  tableState: TableState;
  activeSidebarItems: string[];
  isSettingsOpen: boolean;
  settings: DashboardSettings;
}

const initialState: UIState = {
  tableState: "NO_DATA",
  activeSidebarItems: [],
  isSettingsOpen: false,
  settings: {
    sidebarSide: 'right',
    tableDensity: 'standard',
    showZebraStripes: true,
    primaryColor: 'blue',
    modalPosition: 'bottom-right',
  }
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

    setSidebarItems(state, action: PayloadAction<string[]>) {
      state.activeSidebarItems = action.payload
    },

    setIsSettingsOpen(state, action: PayloadAction<boolean>) {
      state.isSettingsOpen = action.payload
    },

    toggleSettings(state) {
      state.isSettingsOpen = !state.isSettingsOpen
    },

    updateSettings(state, action: PayloadAction<Partial<DashboardSettings>>) {
      state.settings = { ...state.settings, ...action.payload }
    },

    setSidebarSide(state, action: PayloadAction<'left' | 'right'>) {
      state.settings.sidebarSide = action.payload
    },

    setTableDensity(state, action: PayloadAction<'compact' | 'standard'>) {
      state.settings.tableDensity = action.payload
    },

    setShowZebraStripes(state, action: PayloadAction<boolean>) {
      state.settings.showZebraStripes = action.payload
    },

    setPrimaryColor(state, action: PayloadAction<DashboardSettings['primaryColor']>) {
      state.settings.primaryColor = action.payload
    },

    setModalPosition(state, action: PayloadAction<DashboardSettings['modalPosition']>) {
      state.settings.modalPosition = action.payload
    }
  }
})

export const {
  setTableState,
  toggleSidebarItem,
  setSidebarItems,
  setIsSettingsOpen,
  toggleSettings,
  updateSettings,
  setSidebarSide,
  setTableDensity,
  setShowZebraStripes,
  setPrimaryColor,
  setModalPosition
} = uiSlice.actions

export default uiSlice.reducer