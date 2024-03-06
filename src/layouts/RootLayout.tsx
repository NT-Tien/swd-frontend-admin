import { MessageContextProvider } from '@/common/context/MessageContext/MessageContext'
import NotificationContextProvider from '@/common/context/NotificationContext/NotificationContext'
import ThemeContextProvider from '@/common/context/ThemeContext/ThemeContext'
import { Outlet } from '@tanstack/react-router'
import App from 'antd/es/app'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export default function RootLayout() {
    return (
        <App>
            <ThemeContextProvider>
                {/* <TanStackRouterDevtools /> */}
                <NotificationContextProvider>
                    <MessageContextProvider>
                        <Outlet />
                    </MessageContextProvider>
                </NotificationContextProvider>
            </ThemeContextProvider>
        </App>
    )
}
