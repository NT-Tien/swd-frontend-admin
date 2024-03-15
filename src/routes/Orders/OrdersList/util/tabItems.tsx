import AllOrdersList from '@/routes/Orders/OrdersList/components/AllOrdersList'
import ToDeliverOrdersList from '@/routes/Orders/OrdersList/components/ToDeliverOrdersList'
import { TabsProps } from 'antd'

export type tabKeys = 'all' | 'orders-to-deliver'

type Tab = NonNullable<TabsProps['items']>[number]
export const tabItemsStaff: (Tab & { key: tabKeys })[] = [
    {
        key: 'all',
        label: 'All',
        children: <AllOrdersList />,
    },
]

export const tabItemsDeliveryStaff: (Tab & { key: tabKeys })[] = [
    {
        key: 'orders-to-deliver',
        label: 'Delivering',
        children: <ToDeliverOrdersList />,
    },
]
