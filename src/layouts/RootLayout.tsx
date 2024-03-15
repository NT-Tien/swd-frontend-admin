import { MessageContextProvider } from '@/common/context/MessageContext/MessageContext'
import NotificationContextProvider from '@/common/context/NotificationContext/NotificationContext'
import ThemeContextProvider from '@/common/context/ThemeContext/ThemeContext'
import { Outlet } from '@tanstack/react-router'
import { App } from 'antd'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export default function RootLayout() {
    return (
        <App>
            <ThemeContextProvider>
                <TanStackRouterDevtools position='top-left' />
                <NotificationContextProvider>
                    <MessageContextProvider>
                        <Outlet />
                    </MessageContextProvider>
                </NotificationContextProvider>
            </ThemeContextProvider>
        </App>
    )
}
