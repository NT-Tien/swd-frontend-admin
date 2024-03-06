import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import AllOrdersList from '@/routes/Orders/OrdersList/components/AllOrdersList'
import ToDeliverOrdersList from '@/routes/Orders/OrdersList/components/ToDeliverOrdersList'
import { Navigate } from '@tanstack/react-router'
import { TabsProps } from 'antd'

export type tabKeys = 'all' | 'orders-to-deliver'

type Tab = NonNullable<TabsProps['items']>[number]
export const tabItems: (disabledTabs: tabKeys[]) => (Tab & { key: tabKeys })[] = disabledTabs => [
    {
        key: 'all',
        label: 'All',
        children: disabledTabs.includes('all') ? (
            <Navigate to={OrdersListRoute.to} search={{ tab: 'orders-to-deliver' }} replace={true} />
        ) : (
            <AllOrdersList />
        ),
        disabled: disabledTabs.includes('all'),
    },
    {
        key: 'orders-to-deliver',
        label: 'To Deliver',
        children: <ToDeliverOrdersList />,
        disabled: disabledTabs.includes('orders-to-deliver'),
    },
]
