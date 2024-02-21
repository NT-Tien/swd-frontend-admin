import NotificationsDropdown from '@/layouts/DashboardLayout/components/NotificationsDropdown'
import ProfileDropdown from '@/layouts/DashboardLayout/components/ProfileDropdown'
import { getGroup, getItem_1, getItem_2 } from '@/layouts/DashboardLayout/util'
import { MenuItem } from '@/lib/types/MenuItem'
import { rootRoute } from '@/routeTree'
import { AccountListRoute } from '@/routes/Accounts/AccountList'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { DashboardRoute } from '@/routes/Dashboard'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { SiteSettingsRoute } from '@/routes/SiteSettings'
import { Bell, Book, BookOpen, Browser, Gear, House, List, LockKey, User, UserCircle } from '@phosphor-icons/react'
import { Outlet, createRoute, useNavigate } from '@tanstack/react-router'
import Avatar from 'antd/es/avatar/avatar'
import Button from 'antd/es/button'
import Flex from 'antd/es/flex'
import Input from 'antd/es/input'
import Layout from 'antd/es/layout'
import Menu from 'antd/es/menu'
import theme from 'antd/es/theme'
import { BookingsRoute } from '../../routes/Bookings'
import { MoneyCollectFilled } from '@ant-design/icons'
import { VouchersRoute } from '@/routes/Vouchers'

const { useToken } = theme
const { Sider, Header, Content } = Layout

export const DashboardLayoutRoute = createRoute({
    component: DashboardLayout,
    id: 'dashboard-layout',
    getParentRoute: () => rootRoute,
})

function DashboardLayout() {
    const navigate = useNavigate()
    const { token } = useToken()

    const menuItems: MenuItem[] = [
        getGroup({
            key: 'admin',
            label: 'Admin',
            children: [
                getItem_1({
                    key: 'dashboard',
                    label: 'Dashboard',
                    icon: <House />,
                    onClick: () => navigate({ to: DashboardRoute.to }),
                }),
                getItem_1({
                    key: 'products',
                    label: 'Products',
                    icon: <Book />,
                    children: [
                        getItem_2({
                            key: 'product-list',
                            label: 'Product List',
                            onClick: () => navigate({ to: ProductListRoute.to, search: { page: 1, tab: 'all' } }),
                        }),
                        getItem_2({
                            key: 'product-create',
                            label: 'Create Product',
                            onClick: () => navigate({ to: ProductCreateRoute.to }),
                        }),
                    ],
                }),
                getItem_1({
                    key: 'categories',
                    label: 'Categories',
                    icon: <List />,
                    children: [
                        getItem_2({
                            key: 'category-list',
                            label: 'Category List',
                            onClick: () => navigate({ to: CategoryListRoute.to, search: { tab: 'all' } }),
                        }),
                        getItem_2({
                            key: 'category-create',
                            label: 'Create Category',
                            onClick: () =>
                                navigate({
                                    to: CategoryCreateRoute.to,
                                }),
                        }),
                    ],
                }),
                // getItem_1({
                //     key: 'orders',
                //     label: 'Orders',
                //     icon: <Basket />,
                //     children: [
                //         getItem_2({
                //             key: 'order-list',
                //             label: 'Order List',
                //             onClick: () => {},
                //         }),
                //         getItem_2({
                //             key: 'order-details',
                //             label: 'Order Details',
                //             onClick: () => {},
                //         }),
                //     ],
                // }),
                // getItem_1({
                //     key: 'transactions',
                //     label: 'Transactions',
                //     icon: <Money />,
                //     onClick: () => {},
                // }),
                getItem_1({
                    key: 'accounts',
                    label: 'Accounts',
                    icon: <UserCircle />,
                    children: [
                        getItem_2({
                            key: 'account-list',
                            label: 'Account List',
                            onClick: () => navigate({ to: AccountListRoute.to, search: { page: 1 } }),
                        }),
                        getItem_2({
                            key: 'account-create',
                            label: 'Create Account',
                            onClick: () => navigate({ to: AccountListRoute.to, search: { page: 1 } }),
                        }),
                    ],
                }),
                getItem_1({
                    key: 'bookings',
                    label: 'Bookings',
                    icon: <BookOpen />,
                    onClick: () => navigate({ to: BookingsRoute.to, search: { page: 1 } }),
                }),
                getItem_1({
                    key: 'vouchers',
                    label: 'Vouchers',
                    icon: <MoneyCollectFilled/>,
                    onClick: () => navigate({ to: VouchersRoute.to }),

                })
            ],
        }),
        getGroup({
            key: 'site',
            label: 'Site',
            children: [
                getItem_1({
                    key: 'admin-accounts',
                    label: 'Admin Accounts',
                    icon: <LockKey />,
                    onClick: () => {},
                }),
                getItem_1({
                    key: 'site-settings',
                    label: 'Site Settings',
                    icon: <Gear />,
                    onClick: () => navigate({ to: SiteSettingsRoute.to }),
                }),
            ],
        }),
    ]

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                breakpoint='md'
                collapsedWidth={80}
                style={{
                    position: 'relative',
                    height: 'auto',
                    zIndex: '100',
                }}
                zeroWidthTriggerStyle={{
                    display: 'none',
                }}
            >
                <Flex
                    justify='space-between'
                    style={{
                        padding: token.paddingMD,
                    }}
                >
                    <h1
                        style={{
                            color: token.colorTextLightSolid,
                        }}
                    >
                        eFurniture
                    </h1>
                </Flex>
                <Menu items={menuItems} defaultSelectedKeys={['1']} mode='inline' theme='dark' inlineIndent={10} />
            </Sider>

            <Layout>
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
                        <Button type='primary' icon={<Browser />}>
                            Browse Website
                        </Button>
                    </Flex>
                    <Flex gap='1rem' align='center'>
                        <Input.Search />
                        <NotificationsDropdown>
                            <Button
                                icon={<Bell size={20} weight='fill' />}
                                type='text'
                                shape='circle'
                                style={{
                                    aspectRatio: '1/1',
                                }}
                            />
                        </NotificationsDropdown>
                        <ProfileDropdown>
                            <Avatar
                                size='large'
                                icon={<User size={20} weight='fill' />}
                                style={{
                                    height: '100%',
                                    display: 'grid',
                                    placeItems: 'center',
                                    aspectRatio: '1/1',
                                    cursor: 'pointer',
                                }}
                            />
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
