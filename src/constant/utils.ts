import { ChartBarIncreasing, Database, Settings } from "lucide-react";
import type { SidebarActionType } from "../types/utils";

export const SIDEBAR_PRIMARY_ACTIONS: SidebarActionType[] = [
  { id:"data", title: "Data", icon: Database },
  { id:"visualisation", title: "Visualisation", icon: ChartBarIncreasing },
];

export const SIDEBAR_SECONDARY_ACTIONS:SidebarActionType[] = [
  {id:"settings", title:"Settings", icon:Settings}
]

export const ACCEPTED_FILE_FORMAT = [
  
]