import { MessageContextProvider } from '@/common/context/MessageContext/MessageContext'
import { Outlet } from '@tanstack/react-router'
import App from 'antd/es/app'

export default function RootLayout() {
    return (
        <App>
            <MessageContextProvider>
                <Outlet />
            </MessageContextProvider>
        </App>
    )
}
