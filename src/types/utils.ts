import type { LucideIcon } from "lucide-react";

export interface SidebarActionType {
  id: string;
  title: string;
  icon: LucideIcon;
}

export interface DescribeDuckDBRow {
  column_name: string;
  column_type: string;
}
