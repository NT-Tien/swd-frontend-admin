import { MessageContextProvider } from '@/common/context/MessageContext/MessageContext'
import ThemeContextProvider from '@/common/context/ThemeContext/ThemeContext'
import { Outlet } from '@tanstack/react-router'
import App from 'antd/es/app'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export default function RootLayout() {
    return (
        <App>
            <ThemeContextProvider>
                {/* <TanStackRouterDevtools /> */}
                <MessageContextProvider>
                    <Outlet />
                </MessageContextProvider>
            </ThemeContextProvider>
        </App>
    )
}
