import Dropdown from 'antd/es/dropdown'
import Tabs, { TabsProps } from 'antd/es/tabs'
import theme from 'antd/es/theme'
import { ReactNode, useState } from 'react'

const { useToken } = theme

type NotificationsDropdownProps = {
    children: ReactNode
}

export default function NotificationsDropdown({
    children,
}: NotificationsDropdownProps) {
    const { token } = useToken()
    const [tab, setTab] = useState('1')

    const tabItems: TabsProps['items'] = [
        {
            key: '1',
            label: 'Unread',
        },
        {
            key: '2',
            label: 'Archived',
        },
    ]

    return (
        <Dropdown
            autoFocus
            placement='bottomRight'
            trigger={['click']}
            dropdownRender={() => (
                <div
                    style={{
                        backgroundColor: token.colorBgBase,
                        boxShadow: token.boxShadowSecondary,
                        borderRadius: token.borderRadius,
                        minWidth: '300px',
                        marginTop: '25px',
                    }}
                >
                    <Tabs
                        defaultActiveKey='1'
                        items={tabItems}
                        onChange={setTab}
                        tabBarStyle={{
                            padding: '0 10px',
                            width: '100%',
                        }}
                        centered
                        tabBarGutter={75}
                    />
                    <main
                        style={{
                            padding: token.paddingSM,
                        }}
                    >
                        {tab === '1' && <div>Unread shit</div>}
                        {tab === '2' && <div>Archived shit</div>}
                    </main>
                </div>
            )}
        >
            {children}
        </Dropdown>
    )
}
