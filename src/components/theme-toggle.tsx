"use client"

import React, { useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '@/lib/features/themeSlice'
import { RootState } from '@/lib/store'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const { theme } = useSelector((state: RootState) => state.theme)

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(newTheme))
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        dispatch(setTheme('system'))
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, dispatch])

  return (
    <div className="flex items-center space-x-2 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        className={`${theme === 'light' ? 'bg-white dark:bg-neutral-700 shadow' : ''} rounded-md`}
        onClick={() => handleThemeChange('light')}
        title="Light mode"
      >
        <Sun className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={`${theme === 'dark' ? 'bg-white dark:bg-neutral-700 shadow' : ''} rounded-md`}
        onClick={() => handleThemeChange('dark')}
        title="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className={`${theme === 'system' ? 'bg-white dark:bg-neutral-700 shadow' : ''} rounded-md`}
        onClick={() => handleThemeChange('system')}
        title="System preference"
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  )
}