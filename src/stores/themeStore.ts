import { defineStore } from 'pinia';
import type { ThemeState } from '@/models/ThemeState';

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    isDark: false,
    mode: 'Light Mode',
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.mode = this.isDark ? 'Dark Mode' : 'Light Mode';
    },
  },
});