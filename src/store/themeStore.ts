import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getThemeColors, DEFAULT_THEME } from '@/lib/clusterColors';

interface ThemeColors {
  primary: string;
  secondary: string;
}

interface ThemeState {
  theme: ThemeColors;
  pattern: string | null;
  setPattern: (pattern: string | null) => void;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: DEFAULT_THEME,
      pattern: null,

      setPattern: (pattern: string | null) => {
        const themeColors = getThemeColors(pattern);
        set({ theme: themeColors, pattern });
      },

      resetTheme: () => {
        set({ theme: DEFAULT_THEME, pattern: null });
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
