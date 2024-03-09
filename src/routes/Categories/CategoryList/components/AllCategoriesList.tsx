import { Category_Delete } from '@/api/category/Category_Delete'
import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { queryCategory_GetAll_Deleted } from '@/api/category/Category_GetAll_Deleted'
import DeleteModal from '@/common/components/modal/DeleteModal'
import { Category } from '@/lib/types/Category'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { queryClient } from '@/main'
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
    const { data: categories, isLoading, isError } = useQuery(disabled ? queryCategory_GetAll_Deleted() : queryCategory_GetAll())

    const searchColumnProps = GetColumnSearchProps<Category>()

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
                            title: disabled ? 'Deleted At' : 'Created At',
                            dataIndex: disabled ? 'deletedAt' : 'createdAt',
                            key: disabled ? 'deletedAt' : 'createdAt',
                            render: value => dayjs(value).format('DD-MM-YYYY'),
                            sorter: (a, b) =>
                                disabled ? a.deletedAt!.getTime() - b.deletedAt!.getTime() : a.createdAt.getTime() - b.createdAt.getTime(),
                            sortDirections: ['ascend', 'descend'],
                            defaultSortOrder: 'descend',
                        },
                        {
                            title: 'Updated At',
                            dataIndex: 'updatedAt',
                            key: 'updatedAt',
                            render: value => dayjs(value).format('DD-MM-YYYY'),
                            sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                            sortDirections: ['ascend', 'descend'],
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
                        pageSize: 8,
                    }}
                    loading={isLoading}
                />
            )}
        </DeleteModal>
    )
}
