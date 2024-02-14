import { MessageContextProvider } from '@/common/context/MessageContext/MessageContext'
import { Outlet } from '@tanstack/react-router'
import App from 'antd/es/app'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export default function RootLayout() {
    return (
        <App>
            <TanStackRouterDevtools />
            <MessageContextProvider>
                <Outlet />
            </MessageContextProvider>
        </App>
    )
}
