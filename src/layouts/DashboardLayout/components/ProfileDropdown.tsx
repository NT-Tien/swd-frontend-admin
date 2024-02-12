import Cookies from 'js-cookie'
import { LoginRoute } from '@/routes/Login'
import { Gear, ShoppingBag, User } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import Dropdown from 'antd/es/dropdown'
import { MenuProps } from 'antd/es/menu'
import theme from 'antd/es/theme'
import { ReactNode } from 'react'
import { useMessage } from '@/common/context/MessageContext/useMessage'

const { useToken } = theme

type ProfileDropdownProps = {
    children: ReactNode
}

export default function ProfileDropdown({ children }: ProfileDropdownProps) {
    const navigate = useNavigate()
    const { messageApi } = useMessage()
    const { token } = useToken()
    const items: MenuProps['items'] = [
        {
            key: '-1',
            type: 'group',
            label: (
                <div>
                    <h2
                        style={{
                            fontSize: token.fontSizeHeading4,
                            color: token.colorTextBase,
                        }}
                    >
                        Sang Dang
                    </h2>
                    <p
                        style={{
                            fontSize: token.fontSizeSM,
                            color: token.colorTextLabel,
                        }}
                    >
                        Admin
                    </p>
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
            key: '1',
            label: 'Profile',
            icon: <User />,
            onClick: () => {},
        },
        {
            key: '2',
            label: 'Settings',
            icon: <Gear />,
            onClick: () => {},
        },
        {
            key: '3',
            label: 'My Orders',
            icon: <ShoppingBag />,
            onClick: () => {},
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
            onClick: () => {
                Cookies.set('token', '')
                Cookies.remove('token')
                messageApi.success('Logged out successfully')
                navigate({
                    to: LoginRoute.to,
                })
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
                paddingTop: '25px',
                minWidth: '170px',
            }}
        >
            {children}
        </Dropdown>
    )
}
