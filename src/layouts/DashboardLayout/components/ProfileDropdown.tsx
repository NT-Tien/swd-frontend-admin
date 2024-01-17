import { Gear, ShoppingBag, User } from '@phosphor-icons/react'
import { Dropdown, MenuProps, theme } from 'antd'
import { ReactNode } from 'react'

const { useToken } = theme

type ProfileDropdownProps = {
    children: ReactNode
}

export default function ProfileDropdown({ children }: ProfileDropdownProps) {
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
            style: {
                backgroundColor: token.colorErrorBg,
                color: token.colorError,
                fontWeight: 600,
            },
            onClick: () => {},
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
