import { queryProduct_GetAll_Deleted } from '@/api/product/Product_GetAll_Deleted'
import { Category } from '@/lib/types/Category'
import { Product } from '@/lib/types/Product'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import DeleteProductModal from '@/routes/Products/common/components/DeleteProductModal'
import RestoreProductModal from '@/routes/Products/common/components/RestoreProductModal'
import { FileX, Pencil, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Table } from 'antd'
import { format } from 'date-fns'

const size = 5

export default function DisabledProductsList() {
    const navigate = useNavigate()
    const page = ProductListRoute.useSearch({
        select: data => data.page,
    })
    const { data: products, isLoading, isError } = useQuery(queryProduct_GetAll_Deleted({ page, size }))
    const searchColumnProps = GetColumnSearchProps<Product>()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <DeleteProductModal>
            {({ handleOpen: handleDeleteOpen }) => (
                <RestoreProductModal>
                    {({ handleOpen: handleRestoreOpen }) => (
                        <Table
                            dataSource={products?.data ?? []}
                            columns={[
                                {
                                    title: 'No.',
                                    render: (_, __, index) => index + 1 + (page - 1) * size,
                                    width: 70,
                                },
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    key: 'name',
                                    sorter: (a, b) => a.name.localeCompare(b.name),
                                    sortDirections: ['ascend', 'descend'],
                                    ...searchColumnProps('name'),
                                },
                                {
                                    title: 'Disabled Date',
                                    dataIndex: 'deletedAt',
                                    key: 'deletedAt',
                                    render: value => format(new Date(value), 'dd/MM/yyyy'),
                                    sorter: (a, b) => a.deletedAt!.getTime() - b.deletedAt!.getTime(),
                                    sortDirections: ['ascend', 'descend'],
                                    defaultSortOrder: 'descend',
                                    width: 150,
                                },
                                {
                                    title: 'Updated At',
                                    dataIndex: 'updatedAt',
                                    key: 'updatedAt',
                                    render: value => format(new Date(value), 'dd/MM/yyyy'),
                                    sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                                    sortDirections: ['ascend', 'descend'],
                                    width: 150,
                                },
                                {
                                    title: 'Category',
                                    dataIndex: 'category_id',
                                    key: 'category_id',
                                    render: (value: Category) => {
                                        return value.name
                                    },
                                    width: 150,
                                    ellipsis: true,
                                    filters: [],
                                },
                                {
                                    title: 'Description',
                                    dataIndex: 'description',
                                    key: 'description',
                                    render: (value: string) => {
                                        return value.slice(0, 70) + (value.length > 70 ? '...' : '')
                                    },
                                    ellipsis: true,
                                    ...searchColumnProps('description'),
                                },
                                {
                                    title: 'Action',
                                    dataIndex: 'action',
                                    key: 'action',
                                    render: (_, record) => (
                                        <Dropdown.Button
                                            menu={{
                                                items: [
                                                    {
                                                        label: 'Update',
                                                        key: '1',
                                                        icon: <Pencil />,
                                                        style: {
                                                            marginBottom: '5px',
                                                        },
                                                        onClick: () =>
                                                            navigate({
                                                                to: ProductViewRoute.to,
                                                                params: { id: record.id },
                                                                search: { editing: true },
                                                            }),
                                                    },
                                                    {
                                                        label: 'Restore',
                                                        key: 'product-restore-dropdown-button',
                                                        icon: <FileX />,
                                                        onClick: () => handleRestoreOpen(record.id),
                                                    },
                                                    {
                                                        label: 'Delete',
                                                        key: 'delete-product-dropdown-button',
                                                        icon: <Trash />,
                                                        style: {
                                                            marginTop: '10px',
                                                        },
                                                        danger: true,
                                                        onClick: () => handleDeleteOpen(record.id),
                                                    },
                                                ],
                                            }}
                                            onClick={() => {
                                                navigate({
                                                    to: ProductViewRoute.to,
                                                    params: {
                                                        id: record.id,
                                                    },
                                                    search: {
                                                        editing: false,
                                                    },
                                                })
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
                    )}
                </RestoreProductModal>
            )}
        </DeleteProductModal>
    )
}
