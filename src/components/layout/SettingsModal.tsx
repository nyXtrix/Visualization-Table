import React from "react";
import { cn } from "@/lib/utils";
import Modal from "@/components/ui/Modal";
import { useTheme } from "@/context/ThemeContext";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateSettings } from "@/store/uiSlice";
import { 
  PanelLeft, 
  PanelRight, 
  Maximize2, 
  Minimize2, 
  Check
} from "lucide-react";
import { COLOR_MAP, COLOR_OPTIONS, MODAL_POSITION_OPTIONS } from "@/constant/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Switch } from "@/components/ui/Switch";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { settings, tableState } = useAppSelector((state) => state.ui);

  const isTableConfigured = tableState === 'CONFIG_ASSIGNED';
  const positions = MODAL_POSITION_OPTIONS;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dashboard Settings"
      description="Personalize your visualization experience."
      position={settings.modalPosition}
      showCloseButton
    >
      <div className="space-y-6 pb-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">Theme</p>
            <Tabs value={theme} onValueChange={(v) => setTheme(v as 'light' | 'dark')}>
              <TabsList className="w-full">
                <TabsTrigger value="light" className="flex-1 cursor-pointer">Light</TabsTrigger>
                <TabsTrigger value="dark" className="flex-1 cursor-pointer">Dark</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">Sidebar Position</p>
            <Tabs 
              value={settings.sidebarSide} 
              onValueChange={(v) => dispatch(updateSettings({ sidebarSide: v as 'left' | 'right' }))}
            >
              <TabsList className="w-full">
                <TabsTrigger value="left" className="flex-1 cursor-pointer">
                  <PanelLeft className="w-3.5 h-3.5" />
                </TabsTrigger>
                <TabsTrigger value="right" className="flex-1 cursor-pointer">
                  <PanelRight className="w-3.5 h-3.5" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={cn("space-y-2 transition-opacity", !isTableConfigured && "opacity-80 cursor-not-allowed")}>
            <p className="text-xs font-medium text-gray-500">Table Density</p>
            <Tabs 
              value={settings.tableDensity} 
              onValueChange={(v) => dispatch(updateSettings({ tableDensity: v as 'compact' | 'standard' }))}
            >
              <TabsList className="w-full">
                <TabsTrigger value="compact" className="flex-1 gap-1.5 cursor-pointer" disabled={!isTableConfigured}>
                  <Minimize2 className="w-3 h-3" />
                  Compact
                </TabsTrigger>
                <TabsTrigger value="standard" className="flex-1 gap-1.5 cursor-pointer" disabled={!isTableConfigured}>
                  <Maximize2 className="w-3 h-3" />
                  Standard
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className={cn("space-y-2 transition-opacity", !isTableConfigured && "opacity-80 cursor-not-allowed")}>
            <p className="text-xs font-medium text-gray-500">Zebra Striping</p>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 px-3 rounded-lg h-9">
              <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">Enabled</span>
              <Switch 
                checked={settings.showZebraStripes} 
                onCheckedChange={(checked) => dispatch(updateSettings({ showZebraStripes: checked }))}
                size="sm"
                className="cursor-pointer"
                disabled={!isTableConfigured}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 mb-4">Accent Color</p>
          <div className="flex gap-3 h-8">
            {COLOR_OPTIONS.map((c) => {
              const colorGroup = COLOR_MAP[c.id as keyof typeof COLOR_MAP];
              const themeColor = colorGroup[theme as keyof typeof colorGroup].primary;
              
              return (
                <Button
                  key={c.id}
                  onClick={() => dispatch(updateSettings({ primaryColor: c.id }))}
                  className={cn(
                    "w-8 h-8 rounded-full transition-transform active:scale-90 flex items-center justify-center cursor-pointer",
                    settings.primaryColor === c.id ? "ring-2 ring-primary ring-offset-2 scale-110" : "hover:scale-105"
                  )}
                  style={{ backgroundColor: themeColor }}
                >
                  {settings.primaryColor === c.id && <Check className="w-4 h-4 text-white" />}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500">Settings Modal Position</p>
          <div className="grid grid-cols-5 gap-2 h-10">
            {positions.map((p) => {
              const Icon = p.icon;
              let rotation = "";
              if (p.id === 'top-left') rotation = "rotate-0";
              if (p.id === 'top-right') rotation = "rotate-90";
              if (p.id === 'bottom-left') rotation = "-rotate-90";
              if (p.id === 'bottom-right') rotation = "rotate-180";

              return (
                <IconButton
                  key={p.id}
                  onClick={() => dispatch(updateSettings({ modalPosition: p.id }))}
                  className={cn(
                    "flex items-center justify-center border rounded-md transition-all hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer",
                    settings.modalPosition === p.id 
                      ? "border-primary bg-primary/5 text-primary shadow-sm" 
                      : "border-gray-200 dark:border-gray-700 text-gray-400"
                  )}
                  title={p.id.replace('-', ' ')}
                  icon={Icon}
                  variant="ghost"
                  iconClassName={cn("w-4 h-4", rotation)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
