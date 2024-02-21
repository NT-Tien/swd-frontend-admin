import { ThemeContext } from '@/common/context/ThemeContext/ThemeContext'
import { useContext } from 'react'

export function useCustomTheme() {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useCustomTheme must be used within a ThemeContextProvider')
    }

    return context
}
