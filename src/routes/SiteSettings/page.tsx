import { useCustomTheme } from '@/common/context/ThemeContext/useCustomTheme'
import { Card, Switch, Typography } from 'antd'

export default function SiteSettingsPage() {
    const { isDark, setIsDark } = useCustomTheme()

    return (
        <div>
            <Typography.Title level={2}>Site Settings</Typography.Title>
            <Card>
                <Typography.Title level={5}>Dark Mode</Typography.Title>
                <Switch checked={isDark} onChange={setIsDark} />
            </Card>
            {/* <Card title='Info'></Card> */}
        </div>
    )
}
