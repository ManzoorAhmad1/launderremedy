import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ThemeState {
  theme: 'light' | 'dark' | 'system'
  isDarkMode: boolean
}

const getInitialTheme = (): ThemeState['theme'] => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as ThemeState['theme']
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme
    }
    
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'system'
    }
  }
  return 'light'
}

const getIsDarkMode = (theme: ThemeState['theme']): boolean => {
  if (typeof window !== 'undefined') {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return theme === 'dark'
  }
  return false
}

const initialState: ThemeState = {
  theme: getInitialTheme(),
  isDarkMode: getIsDarkMode(getInitialTheme()),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
      state.isDarkMode = getIsDarkMode(action.payload)
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload)
        
        // Update HTML class
        const root = window.document.documentElement
        const isDark = getIsDarkMode(action.payload)
        
        root.classList.remove('light', 'dark')
        root.classList.add(isDark ? 'dark' : 'light')
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.isDarkMode ? 'light' : 'dark'
      state.theme = newTheme
      state.isDarkMode = !state.isDarkMode
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme)
        
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(newTheme)
      }
    },
    updateSystemTheme: (state) => {
      if (state.theme === 'system') {
        state.isDarkMode = getIsDarkMode('system')
        
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement
          root.classList.remove('light', 'dark')
          root.classList.add(state.isDarkMode ? 'dark' : 'light')
        }
      }
    },
  },
})

export const { setTheme, toggleTheme, updateSystemTheme } = themeSlice.actions

// Listen for system theme changes
if (typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    // Dispatch would be handled in a component
  })
}

export default themeSlice.reducer