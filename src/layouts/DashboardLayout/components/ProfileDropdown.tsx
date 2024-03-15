import { useMessage } from '@/common/context/MessageContext/useMessage'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { LoginRoute } from '@/routes/Login'
import { SiteSettingsRoute } from '@/routes/SiteSettings'
import { Gear } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { Typography } from 'antd'
import Dropdown from 'antd/es/dropdown'
import { MenuProps } from 'antd/es/menu'
import theme from 'antd/es/theme'
import { ReactNode } from 'react'

const { useToken } = theme

type ProfileDropdownProps = {
    children: ReactNode
}

export default function ProfileDropdown({ children }: ProfileDropdownProps) {
    const navigate = useNavigate()
    const { messageApi } = useMessage()
    const { token } = useToken()
    const email = AuthenticationHandler.getEmail()
    const items: MenuProps['items'] = [
        {
            key: '-1',
            type: 'group',
            label: (
                <div>
                    <Typography.Title
                        level={4}
                        ellipsis={{
                            tooltip: email,
                        }}
                        style={{
                            fontSize: token.fontSizeHeading4,
                            color: token.colorTextBase,
                            fontWeight: '600',
                            marginBottom: 0,
                            minWidth: '150px',
                        }}
                    >
                        {email.split('@')[0]}
                    </Typography.Title>
                    <Typography.Paragraph
                        ellipsis={true}
                        style={{
                            fontSize: token.fontSizeSM,
                            color: token.colorTextLabel,
                            marginBottom: 0,
                        }}
                    >
                        @{email.split('@')[1]}
                    </Typography.Paragraph>
                </div>
            ),
        },
        {
            key: '0',
            type: 'divider',
            style: {
                margin: '10px 0',
            },
        },
        {
            key: '2',
            label: 'Settings',
            icon: <Gear />,
            onClick: () =>
                navigate({
                    to: SiteSettingsRoute.to,
                }),
        },
        {
            key: '4',
            type: 'divider',
            style: {
                margin: '10px 0',
            },
        },
        {
            key: '5',
            label: 'Logout',
            danger: true,
            style: {
                fontWeight: 600,
            },
            onClick: async () => {
                await navigate({
                    to: LoginRoute.to,
                })
                AuthenticationHandler.logout()
                messageApi.success('Logged out successfully')
            },
        },
    ]

    return (
        <Dropdown
            autoFocus
            placement='bottomRight'
            trigger={['click']}
            menu={{ items }}
            overlayStyle={{
                paddingTop: '0px',
                minWidth: '170px',
            }}
        >
            {children}
        </Dropdown>
    )
}
