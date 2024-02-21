import AllVouchersList from '@/routes/Vouchers/components/AllVouchersList'
import { TabsProps } from 'antd'

export type tabKeys = 'all' | 'disabled'

type Tab = NonNullable<TabsProps['items']>[number]
export const tabItems: (Tab & { key: tabKeys })[] = [
    {
        key: 'all',
        label: 'All',
        children: <AllVouchersList />,
    },
    {
        key: 'disabled',
        label: 'Disabled',
        children: <AllVouchersList disabled />,
    },
]
