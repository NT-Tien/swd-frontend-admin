import { DefaultTheme } from '@/themes/DefaultTheme'
import { ConfigProvider, ThemeConfig, theme } from 'antd'
import { ReactNode, createContext, useState } from 'react'

type ThemeContextType = {
    isDark: boolean
    setIsDark: (isDark: boolean) => void
    customTheme: ThemeConfig
    setCustomTheme: (theme: ThemeConfig) => void
}
export const ThemeContext = createContext<undefined | ThemeContextType>(undefined)

type ThemeContextProviderProps = {
    children: ReactNode
}

export default function ThemeContextProvider({ children }: ThemeContextProviderProps) {
    const [isDark, setIsDark] = useState(false)
    const [customTheme, setCustomTheme] = useState<ThemeConfig>(DefaultTheme)

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, customTheme, setCustomTheme }}>
            <ConfigProvider
                theme={{
                    ...customTheme,
                    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    )
}
