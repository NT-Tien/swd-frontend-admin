import { Outlet } from '@tanstack/react-router'
import App from 'antd/es/app'

export default function RootLayout() {
    return (
        <App>
            <Outlet />
        </App>
    )
}
