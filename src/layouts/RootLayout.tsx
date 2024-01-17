import { Outlet } from '@tanstack/react-router'
import { App } from 'antd'

export default function RootLayout() {
    return (
        <App
            style={{
                minHeight: '100vh',
            }}
        >
            <Outlet />
        </App>
    )
}
