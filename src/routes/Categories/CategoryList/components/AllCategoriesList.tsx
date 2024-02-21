import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { Category } from '@/lib/types/Category'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import DeleteCategoryModal from '@/routes/Categories/CategoryList/modals/DeleteCategoryModal'
import { Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Dropdown, Table } from 'antd'
import { format } from 'date-fns'

export default function AllCategoriesList() {
    const { data: categories, isLoading, isError } = useQuery(queryCategory_GetAll())

    const searchColumnProps = GetColumnSearchProps<Category>()

    if (isError) return <div>Something went wrong</div>

    return (
        <DeleteCategoryModal>
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
                            title: 'Created At',
                            dataIndex: 'createdAt',
                            key: 'createdAt',
                            render: value => format(new Date(value), 'dd/MM/yyyy'),
                            sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                            sortDirections: ['ascend', 'descend'],
                            defaultSortOrder: 'descend',
                        },
                        {
                            title: 'Updated At',
                            dataIndex: 'updatedAt',
                            key: 'updatedAt',
                            render: value => format(new Date(value), 'dd/MM/yyyy'),
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
                                                    handleOpenDelete([record.id])
                                                },
                                            },
                                        ],
                                    }}
                                    onClick={() => {
                                        alert(`Viewing products of category ${record.id} with name: ${record.name}`)
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
        </DeleteCategoryModal>
    )
}
