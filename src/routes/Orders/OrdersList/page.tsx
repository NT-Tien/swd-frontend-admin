import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { OrdersListBreadcrumb } from '@/routes/Orders/OrdersList/breadcrumb'
import { tabItemsDeliveryStaff, tabItemsStaff, tabKeys } from '@/routes/Orders/OrdersList/util/tabItems'
import { useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Flex, Tabs, Typography } from 'antd'

export default function OrdersListPage() {
    const navigate = useNavigate()
    const tab = OrdersListRoute.useSearch({
        select: data => data.tab!,
    })

    return (
        <>
            <Head title='Orders' />
            <Flex vertical>
                <Breadcrumb
                    style={{
                        marginBottom: '5px',
                    }}
                    items={[DashboardBreadcrumb(), OrdersListBreadcrumb({ isCurrent: true })]}
                />
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Order List
                    <RefreshButton isLoading={false} queryKey={tab === 'all' ? ['orders'] : ['orders', 'to-deliver']} />
                </Typography.Title>
                {isAuthorized(Role.STAFF, AuthenticationHandler.getCurrentRole()) ? (
                    <Tabs
                        defaultActiveKey={tab}
                        activeKey={tab}
                        items={tabItemsStaff}
                        onTabClick={tab => {
                            navigate({
                                to: OrdersListRoute.to,
                                search: {
                                    tab: tab as tabKeys,
                                },
                            })
                        }}
                    />
                ) : (
                    <Tabs
                        defaultActiveKey={tab}
                        activeKey={tab}
                        items={tabItemsDeliveryStaff}
                        onTabClick={tab => {
                            navigate({
                                to: OrdersListRoute.to,
                                search: {
                                    tab: tab as tabKeys,
                                },
                            })
                        }}
                    />
                )}
            </Flex>
        </>
    )
}
