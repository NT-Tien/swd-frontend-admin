import { Category_Delete } from '@/api/category/Category_Delete'
import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { queryCategory_GetAll_Deleted } from '@/api/category/Category_GetAll_Deleted'
import DeleteModal from '@/common/components/modal/DeleteModal'
import { Category } from '@/lib/types/Category'
import GetColumnDateSearchProps from '@/lib/util/getColumnDateSearchProps'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { queryClient } from '@/main'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { CategoryViewRoute } from '@/routes/Categories/CategoryView'
import { Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Table } from 'antd'
import dayjs from 'dayjs'

type AllCategoriesListProps = {
    disabled?: boolean
}

export default function AllCategoriesList({ disabled = false }: AllCategoriesListProps) {
    const navigate = useNavigate()
    const pageSize = CategoryListRoute.useSearch({
        select: data => data.size,
    })
    const page = CategoryListRoute.useSearch({
        select: data => data.page,
    })
    const { data: categories, isLoading, isError } = useQuery(disabled ? queryCategory_GetAll_Deleted() : queryCategory_GetAll())

    const searchColumnProps = GetColumnSearchProps<Category>()
    const searchColumnDateProps = GetColumnDateSearchProps<Category>()

    if (isError) return <div>Something went wrong</div>

    return (
        <DeleteModal
            title='category'
            mutationFn={Category_Delete}
            afterSuccess={() => {
                queryClient.invalidateQueries({
                    queryKey: ['categories'],
                })
                queryClient.invalidateQueries({
                    queryKey: ['categories-deleted'],
                })
            }}
        >
            {({ handleOpen: handleOpenDelete }) => (
                <Table
                    dataSource={categories?.data ?? []}
                    columns={[
                        {
                            title: 'No.',
                            render: (_, __, index) => index + 1,
                            width: 100,
                        },
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            sorter: (a, b) => a.name.localeCompare(b.name),
                            sortDirections: ['ascend', 'descend'],
                            ellipsis: true,
                            ...searchColumnProps('name'),
                        },
                        disabled
                            ? {
                                  title: 'Disabled At',
                                  dataIndex: 'deletedAt',
                                  key: 'disabledAt',
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
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (_, record) => (
                                <Dropdown.Button
                                    menu={{
                                        items: [
                                            {
                                                label: 'Delete',
                                                key: '1',
                                                icon: <Trash />,
                                                danger: true,
                                                onClick: () => {
                                                    handleOpenDelete(record.id)
                                                },
                                                disabled: disabled,
                                            },
                                        ],
                                    }}
                                    onClick={() => {
                                        navigate({
                                            to: CategoryViewRoute.to,
                                            params: {
                                                id: record.id,
                                            },
                                            search: {
                                                page: 0,
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
                        pageSize: pageSize,
                        total: categories?.total ?? 0,
                        pageSizeOptions: ['8', '16', '24', '32'],
                        showSizeChanger: true,
                        onShowSizeChange(page, size) {
                            navigate({
                                to: CategoryListRoute.to,
                                search: {
                                    size: size,
                                    page: page,
                                    tab: disabled ? 'disabled' : 'all',
                                },
                            })
                        },
                        onChange(page, size) {
                            navigate({
                                to: CategoryListRoute.to,
                                search: {
                                    page: page,
                                    size: size,
                                    tab: disabled ? 'disabled' : 'all',
                                },
                            })
                        },
                        showTotal: (total, range) => {
                            return `${range[0]}-${range[1]} of ${total} items`
                        },
                        showLessItems: true,
                        showQuickJumper: true,
                    }}
                    loading={isLoading}
                />
            )}
        </DeleteModal>
    )
}
