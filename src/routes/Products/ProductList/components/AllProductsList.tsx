import { queryProduct_GetAll } from '@/api/product/Product_GetAll'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { Category } from '@/lib/types/Category'
import { Product } from '@/lib/types/Product'
import { copyId } from '@/lib/util/copyId'
import GetColumnDateSearchProps from '@/lib/util/getColumnDateSearchProps'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import DisableProductModal from '@/routes/Products/common/components/DisableProductModal'
import RestoreProductModal from '@/routes/Products/common/components/RestoreProductModal'
import { PoweroffOutlined } from '@ant-design/icons'
import { FileX, Pencil } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Table } from 'antd'
import dayjs from 'dayjs'

type AllProductsListProps = {
    disabled?: boolean
}

export default function AllProductsList({ disabled = false }: AllProductsListProps) {
    const navigate = useNavigate()
    const page = ProductListRoute.useSearch({
        select: data => data.page!,
    })
    const size = ProductListRoute.useSearch({
        select: data => data.size!,
    })
    const { data: products, isLoading, isError } = useQuery(queryProduct_GetAll({ page, size, deleted: disabled }))
    const searchColumnProps = GetColumnSearchProps<Product>()
    const searchColumnDateProps = GetColumnDateSearchProps<Product>()
    const { messageApi } = useMessage()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <DisableProductModal>
            {({ handleOpen: handleOpenDisableProduct }) => (
                <RestoreProductModal>
                    {({ handleOpen: handleOpenRestoreProduct }) => (
                        <Table
                            dataSource={products?.data}
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
                                    width: 300,
                                    ...searchColumnProps('name'),
                                },
                                disabled
                                    ? {
                                          title: 'Disabled Date',
                                          dataIndex: 'deletedAt',
                                          key: 'deletedAt',
                                          render: value => dayjs(value).format('DD-MM-YYYY HH:mm:ss'),
                                          sorter: (a, b) => a.deletedAt!.getTime() - b.deletedAt!.getTime(),
                                          sortDirections: ['ascend', 'descend'],
                                          defaultSortOrder: 'descend',
                                          ...searchColumnDateProps('deletedAt'),
                                      }
                                    : {
                                          title: 'Created At',
                                          dataIndex: 'createdAt',
                                          key: 'createdAt',
                                          render: value => dayjs(value).format('DD-MM-YYYY HH:mm:ss'),
                                          sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                                          sortDirections: ['ascend', 'descend'],
                                          defaultSortOrder: 'descend',
                                          ...searchColumnDateProps('createdAt'),
                                      },

                                {
                                    title: 'Updated At',
                                    dataIndex: 'updatedAt',
                                    key: 'updatedAt',
                                    render: value => dayjs(value).format('DD-MM-YYYY HH:mm:ss'),
                                    sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                                    sortDirections: ['ascend', 'descend'],
                                    ...searchColumnDateProps('updatedAt'),
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
                                                    copyId(record.id, messageApi),
                                                    ...(isAuthorized(Role.ADMIN, AuthenticationHandler.getCurrentRole())
                                                        ? [
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
                                                                  danger: true,
                                                                  key: disabled
                                                                      ? 'restore-product-dropdown-button'
                                                                      : 'disable-product-dropdown-button',
                                                                  icon: disabled ? <FileX /> : <PoweroffOutlined />,
                                                                  onClick: () =>
                                                                      disabled
                                                                          ? handleOpenRestoreProduct(record.id)
                                                                          : handleOpenDisableProduct(record.id),
                                                              },
                                                          ]
                                                        : []),

                                                    // {
                                                    //     label: 'Delete',
                                                    //     key: 'delete-product-dropdown-button',
                                                    //     icon: <Trash />,
                                                    //     style: {
                                                    //         marginTop: '10px',
                                                    //     },
                                                    //     danger: true,
                                                    //     onClick: () => handleOpenDeleteProduct(record.id),
                                                    // },
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
                                defaultCurrent: page,
                                pageSize: size,
                                total: products?.total ?? 0,
                                pageSizeOptions: ['8', '16', '24', '32'],
                                showSizeChanger: true,
                                onShowSizeChange(_, size) {
                                    navigate({
                                        to: ProductListRoute.to,
                                        search: {
                                            page,
                                            tab: disabled ? 'disabled' : 'all',
                                            size: size,
                                        },
                                    })
                                },
                                showTotal: (total, range) => {
                                    return `${range[0]}-${range[1]} of ${total} items`
                                },
                                showLessItems: true,
                                showQuickJumper: true,
                                onChange(page) {
                                    navigate({
                                        to: ProductListRoute.to,
                                        search: {
                                            page,
                                            tab: disabled ? 'disabled' : 'all',
                                            size,
                                        },
                                    })
                                },
                            }}
                            loading={isLoading}
                        />
                    )}
                </RestoreProductModal>
            )}
        </DisableProductModal>
    )
}
