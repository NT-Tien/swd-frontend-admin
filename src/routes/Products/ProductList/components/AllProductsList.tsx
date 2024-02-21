import { queryProduct_GetAll } from '@/api/product/Product_GetAll'
import { Category } from '@/lib/types/Category'
import { Product } from '@/lib/types/Product'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import DeleteProductModal from '@/routes/Products/common/components/DeleteProductModal'
import DisableProductModal from '@/routes/Products/common/components/DisableProductModal'
import { PoweroffOutlined } from '@ant-design/icons'
import { Pencil, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Table } from 'antd'
import { format } from 'date-fns'

const size = 5

export default function AllProductsList() {
    const navigate = useNavigate()
    const page = ProductListRoute.useSearch({
        select: data => data.page,
    })
    const { data: products, isLoading, isError } = useQuery(queryProduct_GetAll({ page, size }))
    const searchColumnProps = GetColumnSearchProps<Product>()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <DisableProductModal>
            {({ handleOpen: handleOpenDisableProduct }) => (
                <DeleteProductModal>
                    {({ handleOpen: handleOpenDeleteProduct }) => (
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
                                    title: 'Created At',
                                    dataIndex: 'createdAt',
                                    key: 'createdAt',
                                    render: value => format(new Date(value), 'dd/MM/yyyy'),
                                    sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
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
                                                        key: 'update-product-dropdown-button',
                                                        icon: <Pencil />,
                                                        onClick: () =>
                                                            navigate({
                                                                to: ProductViewRoute.to,
                                                                params: { id: record.id },
                                                                search: { editing: true },
                                                            }),
                                                    },
                                                    {
                                                        label: 'Disable',
                                                        key: 'disable-product-dropdown-button',
                                                        icon: <PoweroffOutlined />,
                                                        onClick: () => handleOpenDisableProduct(record.id),
                                                    },
                                                    {
                                                        label: 'Delete',
                                                        key: 'delete-product-dropdown-button',
                                                        icon: <Trash />,
                                                        style: {
                                                            marginTop: '10px',
                                                        },
                                                        danger: true,
                                                        onClick: () => handleOpenDeleteProduct(record.id),
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
                </DeleteProductModal>
            )}
        </DisableProductModal>
    )
}
