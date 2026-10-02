'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    // Apply theme colors as CSS variables
    document.documentElement.style.setProperty('--theme-primary', theme.primary);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
  }, [theme]);

  return <>{children}</>;
}
