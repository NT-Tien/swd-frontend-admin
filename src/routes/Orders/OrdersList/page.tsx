import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { tabItems, tabKeys } from '@/routes/Orders/OrdersList/util/tabItems'
import { Flex, Tabs, Typography } from 'antd'
import { useState } from 'react'

export default function OrdersListPage() {
    const tab = OrdersListRoute.useSearch({
        select: data => data.tab,
    })
    const [currentTab, setCurrentTab] = useState(tab)

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
                    <RefreshButton isLoading={false} queryKey={currentTab === 'all' ? ['orders'] : ['orders-deleted']} />
                </Typography.Title>
                <Tabs
                    defaultActiveKey={currentTab}
                    activeKey={currentTab}
                    items={tabItems(isAuthorized(Role.STAFF, AuthenticationHandler.getCurrentRole()) ? [] : ['all'])}
                    onTabClick={tab => {
                        setCurrentTab(tab as tabKeys)
                    }}
                />
            </Flex>
        </>
    )
}
