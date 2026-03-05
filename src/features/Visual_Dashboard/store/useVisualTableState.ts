import { useState } from "react"
import type { VisualTableState, FieldItem } from "@/types/pivot"

export function useVisualTableState() {

  const [pivotState, setPivotState] = useState<VisualTableState>({
    rows: [],
    columns: [],
    values: [],
    filters: []
  })

  const addField = (zone: keyof VisualTableState, field: FieldItem) => {
    setPivotState((prev) => ({
      ...prev,
      [zone]: [...prev[zone], field]
    }))
  }

  const removeField = (zone: keyof VisualTableState, id: number) => {
    setPivotState((prev) => ({
      ...prev,
      [zone]: prev[zone].filter((f) => f.id !== id)
    }))
  }

  const clearZone = (zone: keyof VisualTableState) => {
    setPivotState((prev) => ({
      ...prev,
      [zone]: []
    }))
  }

  return {
    pivotState,
    addField,
    removeField,
    clearZone
  }
}