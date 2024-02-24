import { queryOrder_GetAll } from '@/api/order/Order_GetAll'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'antd'

export default function AllOrdersList() {
    // const page = OrdersListRoute.useSearch({
    //     select: data => data.page,
    // })
    const { data: orders, isLoading, isError } = useQuery(queryOrder_GetAll())

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <Table
            dataSource={orders ?? []}
            columns={
                [
                    // {
                    //     title: 'Name',
                    //     dataIndex: 'name',
                    //     key: 'name',
                    //     sorter: (a, b) => a.name.localeCompare(b.name),
                    //     sortDirections: ['ascend', 'descend'],
                    //     ...searchColumnProps('name'),
                    // },
                    // {
                    //     title: 'Created At',
                    //     dataIndex: 'createdAt',
                    //     key: 'createdAt',
                    //     render: value => dayjs(value).format('DD-MM-YYYY'),
                    //     sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    //     sortDirections: ['ascend', 'descend'],
                    //     defaultSortOrder: 'descend',
                    //     width: 150,
                    // },
                    // {
                    //     title: 'Updated At',
                    //     dataIndex: 'updatedAt',
                    //     key: 'updatedAt',
                    //     render: value => dayjs(value).format('DD-MM-YYYY'),
                    //     sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                    //     sortDirections: ['ascend', 'descend'],
                    //     width: 150,
                    // },
                    // {
                    //     title: 'Category',
                    //     dataIndex: 'category_id',
                    //     key: 'category_id',
                    //     render: (value: Category) => {
                    //         return value.name
                    //     },
                    //     width: 150,
                    //     ellipsis: true,
                    //     filters: [],
                    // },
                    // {
                    //     title: 'Description',
                    //     dataIndex: 'description',
                    //     key: 'description',
                    //     render: (value: string) => {
                    //         return value.slice(0, 70) + (value.length > 70 ? '...' : '')
                    //     },
                    //     ellipsis: true,
                    //     ...searchColumnProps('description'),
                    // },
                    // {
                    //     title: 'Action',
                    //     dataIndex: 'action',
                    //     key: 'action',
                    //     render: (_, record) => (
                    //         <Dropdown.Button
                    //             menu={{
                    //                 items: [
                    //                     {
                    //                         label: 'Update',
                    //                         key: 'update-product-dropdown-button',
                    //                         icon: <Pencil />,
                    //                         onClick: () =>
                    //                             navigate({
                    //                                 to: ProductViewRoute.to,
                    //                                 params: { id: record.id },
                    //                                 search: { editing: true },
                    //                             }),
                    //                     },
                    //                     {
                    //                         label: 'Disable',
                    //                         key: 'disable-product-dropdown-button',
                    //                         icon: <PoweroffOutlined />,
                    //                         onClick: () => handleOpenDisableProduct(record.id),
                    //                     },
                    //                     {
                    //                         label: 'Delete',
                    //                         key: 'delete-product-dropdown-button',
                    //                         icon: <Trash />,
                    //                         style: {
                    //                             marginTop: '10px',
                    //                         },
                    //                         danger: true,
                    //                         onClick: () => handleOpenDeleteProduct(record.id),
                    //                     },
                    //                 ],
                    //             }}
                    //             onClick={() => {
                    //                 navigate({
                    //                     to: ProductViewRoute.to,
                    //                     params: {
                    //                         id: record.id,
                    //                     },
                    //                     search: {
                    //                         editing: false,
                    //                     },
                    //                 })
                    //             }}
                    //         >
                    //             View
                    //         </Dropdown.Button>
                    //     ),
                    // },
                ]
            }
            pagination={{
                pageSize: 8,
            }}
            loading={isLoading}
        />
    )
}
