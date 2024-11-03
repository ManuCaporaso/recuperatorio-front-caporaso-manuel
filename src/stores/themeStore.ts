import type { ThemeState } from '@/models/ThemeState'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: (): ThemeState => ({
    isDark: false,
    mode: 'Light Mode',
  }),
  actions: {
    cambioDeModo() {
      this.isDark = !this.isDark
      this.mode = this.isDark === false ? 'Light Mode' : 'Dark Mode'
    },
  },
})
