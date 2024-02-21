import { queryVoucher_GetAll } from '@/api/voucher/Voucher_GetAll'
import { Voucher } from '@/lib/types/Voucher'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { PoweroffOutlined } from '@ant-design/icons'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Dropdown, Table } from 'antd'

export default function AllVouchersList() {
    const { data: vouchers, isLoading, isError } = useQuery(queryVoucher_GetAll())
    const searchColumnProps = GetColumnSearchProps<Voucher>()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <Table
            dataSource={vouchers ?? []}
            columns={[
                {
                    title: 'Code',
                    dataIndex: 'code',
                    key: 'code',
                    ...searchColumnProps('code'),
                },
                {
                    title: 'Amount',
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: 'Limit Total Max',
                    dataIndex: 'limit_total_max',
                    key: 'limit_total_max',
                },
                {
                    title: 'Limit Total Min',
                    dataIndex: 'limit_total_min',
                    key: 'limit_total_min',
                },
                {
                    title: 'Discount Percent',
                    dataIndex: 'discount_percent',
                    key: 'discount_percent',
                },
                {
                    title: 'Expired Date',
                    dataIndex: 'expired_date',
                    key: 'expired_date',
                    render: date => new Date(date).toLocaleDateString(),
                },
                {
                    title: 'Created At',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: date => new Date(date).toLocaleDateString(),
                },
                {
                    title: 'Updated At',
                    dataIndex: 'updatedAt',
                    key: 'updatedAt',
                    render: date => new Date(date).toLocaleDateString(),
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: () => (
                        <Dropdown.Button
                            menu={{
                                items: [
                                    {
                                        label: 'Update',
                                        key: 'update-product-dropdown-button',
                                        icon: <Pencil />,
                                        onClick: () => alert('Not implemented'),
                                    },
                                    {
                                        label: 'Disable',
                                        key: 'disable-product-dropdown-button',
                                        icon: <PoweroffOutlined />,
                                        onClick: () => alert('Not implemented'),
                                    },
                                    {
                                        label: 'Delete',
                                        key: 'delete-product-dropdown-button',
                                        icon: <Trash />,
                                        style: {
                                            marginTop: '10px',
                                        },
                                        danger: true,
                                        onClick: () => alert('Not implemented'),
                                    },
                                ],
                            }}
                            onClick={() => {
                                alert('Not implemented')
                            }}
                        >
                            View
                        </Dropdown.Button>
                    ),
                },
            ]}
            pagination={{
                pageSize: 8,
            }}
            loading={isLoading}
        />
    )
}
