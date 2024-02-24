import { queryProduct_GetAll } from '@/api/product/Product_GetAll'
import { queryProduct_GetAll_Deleted } from '@/api/product/Product_GetAll_Deleted'
import { Category } from '@/lib/types/Category'
import { Product } from '@/lib/types/Product'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import DeleteProductModal from '@/routes/Products/common/components/DeleteProductModal'
import DisableProductModal from '@/routes/Products/common/components/DisableProductModal'
import RestoreProductModal from '@/routes/Products/common/components/RestoreProductModal'
import { PoweroffOutlined } from '@ant-design/icons'
import { FileX, Pencil, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Table } from 'antd'
import dayjs from 'dayjs'

const size = 8

type AllProductsListProps = {
    disabled?: boolean
}

export default function AllProductsList({ disabled = false }: AllProductsListProps) {
    const navigate = useNavigate()
    const page = ProductListRoute.useSearch({
        select: data => data.page,
    })
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery(disabled ? queryProduct_GetAll_Deleted({ page, size }) : queryProduct_GetAll({ page, size }))
    const searchColumnProps = GetColumnSearchProps<Product>()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <DisableProductModal>
            {({ handleOpen: handleOpenDisableProduct }) => (
                <DeleteProductModal>
                    {({ handleOpen: handleOpenDeleteProduct }) => (
                        <RestoreProductModal>
                            {({ handleOpen: handleOpenRestoreProduct }) => (
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
                                            title: disabled ? 'Disabled Date' : 'Created At',
                                            dataIndex: disabled ? 'deletedAt' : 'createdAt',
                                            key: disabled ? 'deletedAt' : 'createdAt',
                                            render: value => dayjs(value).format('DD-MM-YYYY'),
                                            sorter: (a, b) =>
                                                disabled
                                                    ? a.deletedAt!.getTime() - b.deletedAt!.getTime()
                                                    : a.createdAt.getTime() - b.createdAt.getTime(),
                                            sortDirections: ['ascend', 'descend'],
                                            defaultSortOrder: 'descend',
                                            width: 150,
                                        },
                                        {
                                            title: 'Updated At',
                                            dataIndex: 'updatedAt',
                                            key: 'updatedAt',
                                            render: value => dayjs(value).format('DD-MM-YYYY'),
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
                                                                label: disabled ? 'Restore' : 'Disable',
                                                                key: disabled
                                                                    ? 'restore-product-dropdown-button'
                                                                    : 'disable-product-dropdown-button',
                                                                icon: disabled ? <FileX /> : <PoweroffOutlined />,
                                                                onClick: () =>
                                                                    disabled
                                                                        ? handleOpenRestoreProduct(record.id)
                                                                        : handleOpenDisableProduct(record.id),
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
                                        pageSize: size,
                                        total: products?.total ?? 0,
                                        onChange(page) {
                                            navigate({
                                                to: ProductListRoute.to,
                                                search: {
                                                    page,
                                                    tab: 'all',
                                                },
                                            })
                                        },
                                    }}
                                    loading={isLoading}
                                />
                            )}
                        </RestoreProductModal>
                    )}
                </DeleteProductModal>
            )}
        </DisableProductModal>
    )
}
