import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { COLOR_MAP } from '@/constant/utils';
import { useTheme } from '@/context/ThemeContext';

export const useCustomization = () => {
  const { primaryColor } = useAppSelector((state) => state.ui.settings);
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const colorGroup = COLOR_MAP[primaryColor as keyof typeof COLOR_MAP] || COLOR_MAP.blue;
    const colors = colorGroup[theme as keyof typeof colorGroup];
    
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--ring', colors.ring);
    root.style.setProperty('--checkbox-bg', colors.primary);
    root.style.setProperty('--checkbox-tick', colors.tick);
  }, [primaryColor, theme]);
};
