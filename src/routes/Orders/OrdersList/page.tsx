import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { tabItems, tabKeys } from '@/routes/Orders/OrdersList/util/tabItems'
import { useNavigate } from '@tanstack/react-router'
import { Flex, Tabs, Typography } from 'antd'

export default function OrdersListPage() {
    const navigate = useNavigate()
    const tab = OrdersListRoute.useSearch({
        select: data => data.tab!,
    })

    return (
        <>
            <Head title='Orders' />
            <Flex vertical gap={0}>
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
                <Tabs
                    defaultActiveKey={tab}
                    activeKey={tab}
                    items={tabItems(isAuthorized(Role.STAFF, AuthenticationHandler.getCurrentRole()) ? [] : ['all'])}
                    onTabClick={tab => {
                        navigate({
                            to: OrdersListRoute.to,
                            search: {
                                tab: tab as tabKeys,
                            },
                        })
                    }}
                />
            </Flex>
        </>
    )
}
