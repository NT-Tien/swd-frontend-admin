import { useNotification } from '@/common/context/NotificationContext/useNotification'
import ProfileDropdown from '@/layouts/DashboardLayout/components/ProfileDropdown'
import { getGroup, getItem_1, getItem_2 } from '@/layouts/DashboardLayout/util'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { MenuItem } from '@/lib/types/MenuItem'
import { rootRoute } from '@/routeTree'
import { AccountCreateRoute } from '@/routes/Accounts/AccountCreate'
import { AccountListRoute } from '@/routes/Accounts/AccountList'
import { BookingsRoute } from '@/routes/Bookings'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { DashboardRoute } from '@/routes/Dashboard'
import { OrderDesignListRoute } from '@/routes/Orders/OrderDesignList'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { TransactionListRoute } from '@/routes/Transactions/TransactionList'
import { VouchersRoute } from '@/routes/Vouchers'
import { socket } from '@/socket'
import { MoneyCollectFilled, TransactionOutlined } from '@ant-design/icons'
import { Basket, Book, BookOpen, Browser, House, List, User, UserCircle } from '@phosphor-icons/react'
import { useQueryClient } from '@tanstack/react-query'
import { Outlet, createRoute, redirect, useNavigate, useRouterState } from '@tanstack/react-router'
import { Avatar, Button, Flex, Layout, Menu, Tag, theme } from 'antd'
import { useEffect, useMemo, useState } from 'react'

const { useToken } = theme
const { Sider, Header, Content } = Layout

export const DashboardLayoutRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.DSTAFF, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    component: DashboardLayout,
    id: 'dashboard-layout',
    getParentRoute: () => rootRoute,
})

function DashboardLayout() {
    const navigate = useNavigate()
    const { token } = useToken()
    const currentRole = AuthenticationHandler.getCurrentRole()
    const [collapsed, setCollapsed] = useState(false)
    const { notiApi } = useNotification()
    const queryClient = useQueryClient()
    const routerState = useRouterState()

    useEffect(() => {
        socket.connect().on('message', () => {
            notiApi.info({
                type: 'info',
                message: 'You have a new order!',
            })
            queryClient.invalidateQueries({
                queryKey: ['order', 'recent'],
                type: 'all',
            })
        })

        return () => {
            socket.off('message')
            socket.disconnect()
        }
    }, [notiApi, queryClient])

    const menuItems: MenuItem[] = useMemo(
        () => [
            getGroup({
                key: 'role',
                label: (
                    <Tag
                        color={
                            isAuthorized(Role.ADMIN, currentRole)
                                ? 'red-inverse'
                                : isAuthorized(Role.STAFF, currentRole)
                                  ? 'blue-inverse'
                                  : 'green-inverse'
                        }
                        style={{
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        {currentRole}
                    </Tag>
                ),
                children: [
                    getItem_1({
                        key: DashboardRoute.to,
                        label: 'Dashboard',
                        icon: <House />,
                        onClick: () => navigate({ to: DashboardRoute.to }),
                        shown: isAuthorized(Role.ADMIN, currentRole),
                    }),
                    getItem_1({
                        key: 'products',
                        label: 'Products',
                        icon: <Book />,
                        shown: isAuthorized(Role.STAFF, currentRole),
                        children: [
                            getItem_2({
                                key: ProductListRoute.to,
                                label: 'Product List',
                                shown: isAuthorized(Role.STAFF, currentRole),
                                onClick: () => navigate({ to: ProductListRoute.to }),
                            }),
                            getItem_2({
                                key: ProductCreateRoute.to,
                                label: 'Create Product',
                                shown: isAuthorized(Role.STAFF, currentRole),
                                onClick: () => navigate({ to: ProductCreateRoute.to }),
                            }),
                        ],
                    }),
                    getItem_1({
                        key: 'categories',
                        label: 'Categories',
                        icon: <List />,
                        shown: isAuthorized(Role.ADMIN, currentRole),
                        children: [
                            getItem_2({
                                key: CategoryListRoute.to,
                                label: 'Category List',
                                shown: isAuthorized(Role.ADMIN, currentRole),
                                onClick: () => navigate({ to: CategoryListRoute.to }),
                            }),
                            getItem_2({
                                key: CategoryCreateRoute.to,
                                label: 'Create Category',
                                shown: isAuthorized(Role.ADMIN, currentRole),
                                onClick: () =>
                                    navigate({
                                        to: CategoryCreateRoute.to,
                                    }),
                            }),
                        ],
                    }),
                    getItem_1({
                        key: 'orders',
                        label: 'Orders',
                        icon: <Basket />,
                        shown: isAuthorized(Role.DSTAFF, currentRole),
                        children: [
                            getItem_2({
                                key: OrdersListRoute.to,
                                label: 'Order List',
                                shown: isAuthorized(Role.DSTAFF, currentRole),
                                onClick: () =>
                                    navigate({
                                        to: OrdersListRoute.to,
                                    }),
                            }),
                            getItem_2({
                                key: OrderDesignListRoute.to,
                                label: 'Order Designs',
                                shown: isAuthorized(Role.STAFF, currentRole),
                                onClick: () =>
                                    navigate({
                                        to: OrderDesignListRoute.to,
                                    }),
                            }),
                        ],
                    }),
                    getItem_1({
                        key: TransactionListRoute.to,
                        label: 'Transactions',
                        icon: <TransactionOutlined />,
                        shown: isAuthorized(Role.ADMIN, currentRole),
                        onClick: () =>
                            navigate({
                                to: TransactionListRoute.to,
                            }),
                    }),
                    getItem_1({
                        key: 'accounts',
                        label: 'Accounts',
                        icon: <UserCircle />,
                        shown: isAuthorized(Role.ADMIN, currentRole),
                        children: [
                            getItem_2({
                                key: AccountListRoute.to,
                                label: 'Account List',
                                shown: isAuthorized(Role.ADMIN, currentRole),
                                onClick: () => navigate({ to: AccountListRoute.to }),
                            }),
                            getItem_2({
                                key: AccountCreateRoute.to,
                                label: 'Create Account',
                                shown: isAuthorized(Role.ADMIN, currentRole),
                                onClick: () => navigate({ to: AccountCreateRoute.to }),
                            }),
                        ],
                    }),
                    getItem_1({
                        key: BookingsRoute.to,
                        label: 'Bookings',
                        icon: <BookOpen />,
                        shown: isAuthorized(Role.STAFF, currentRole),
                        onClick: () => navigate({ to: BookingsRoute.to }),
                    }),
                    getItem_1({
                        key: VouchersRoute.to,
                        label: 'Vouchers',
                        icon: <MoneyCollectFilled />,
                        shown: isAuthorized(Role.ADMIN, currentRole),
                        onClick: () => navigate({ to: VouchersRoute.to }),
                    }),
                ],
            }),
        ],
        [currentRole, navigate],
    )

    return (
        <Layout
            hasSider
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                breakpoint='md'
                collapsedWidth={80}
                collapsed={collapsed}
                onCollapse={data => setCollapsed(data)}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    zIndex: 10,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Flex
                    justify='space-between'
                    style={{
                        padding: token.paddingMD,
                    }}
                >
                    {collapsed ? (
                        <div
                            style={{
                                width: '100%',
                                aspectRatio: '1/1',
                                color: token.colorTextLightSolid,
                                display: 'grid',
                                placeItems: 'center',
                                fontSize: token.fontSizeXL,
                                fontWeight: 'bold',
                                border: `2px solid ${token.colorBorder}`,
                                borderRadius: token.borderRadius,
                            }}
                        >
                            EF
                        </div>
                    ) : (
                        <h1
                            style={{
                                color: token.colorTextLightSolid,
                            }}
                        >
                            eFurniture
                        </h1>
                    )}
                </Flex>
                <Menu
                    items={menuItems}
                    mode='inline'
                    theme='dark'
                    inlineIndent={15}
                    defaultSelectedKeys={[routerState.location.pathname]}
                    defaultOpenKeys={['products', 'categories', 'orders', 'accounts']}
                />
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header
                    style={{
                        backgroundColor: token.colorBgContainer,
                        boxShadow: token.boxShadow,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        paddingInline: '70px',
                    }}
                >
                    <Flex gap='1rem'>
                        <Button
                            type='primary'
                            icon={<Browser />}
                            onClick={() => window.open('https://e-furniture-swd.vercel.app/', '__blank')}
                        >
                            Browse Website
                        </Button>
                    </Flex>
                    <Flex gap='1rem' align='center'>
                        <ProfileDropdown>
                            <Button
                                ghost
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                }}
                            >
                                <Flex
                                    gap={10}
                                    align='center'
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: token.fontSize,
                                            fontWeight: 'bold',
                                            color: token.colorTextBase,
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {currentRole}
                                    </div>
                                    <Avatar
                                        size='default'
                                        icon={<User size={20} weight='fill' />}
                                        style={{
                                            height: '100%',
                                            display: 'grid',
                                            placeItems: 'center',
                                            aspectRatio: '1/1',
                                        }}
                                    />
                                </Flex>
                            </Button>
                        </ProfileDropdown>
                    </Flex>
                </Header>
                <Content
                    style={{
                        backgroundColor: token['geekblue-1'],
                        paddingInline: '70px',
                        paddingBlock: token.paddingLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
