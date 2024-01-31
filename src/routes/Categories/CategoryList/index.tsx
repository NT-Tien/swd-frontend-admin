import { Category_GetAll } from '@/api/category/Category_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Category } from '@/lib/types/Category'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { queryClient } from '@/router'
import AddCategoryModal from '@/routes/Categories/CategoryList/components/AddCategoryModal'
import DeleteCategoryModal from '@/routes/Categories/CategoryList/components/DeleteCategoryModal'
import { ArrowsClockwise, Plus, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { Button, Dropdown, Flex, Table, Typography } from 'antd'
import format from 'date-fns/format'
import { Key, useState } from 'react'

const component = function CategoryListPage() {
    const {
        data: categories,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: Category_GetAll,
        select(res) {
            return res.data
        },
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    const searchColumnProps = GetColumnSearchProps<Category>()

    if (isError) return <div>Something went wrong</div>

    return (
        <>
            <AddCategoryModal>
                {({ handleOpen: handleOpenAddCategory }) => (
                    <DeleteCategoryModal categories={categories?.data ?? []} afterDelete={() => setSelectedRowKeys([])}>
                        {({ handleOpen: handleOpenDeleteCategory }) => (
                            <Flex vertical gap={20}>
                                <Typography.Title
                                    level={2}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                    }}
                                >
                                    Category List
                                    <Button
                                        size='small'
                                        icon={<ArrowsClockwise size={12} weight='fill' />}
                                        onClick={() => {
                                            queryClient.invalidateQueries({
                                                queryKey: ['products'],
                                            })
                                        }}
                                    ></Button>
                                </Typography.Title>
                                <Flex justify='space-between'>
                                    <Flex gap={5}>
                                        <div
                                            style={{
                                                width: '300px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginLeft: '10px',
                                            }}
                                        >
                                            {selectedRowKeys.length !== 0 && (
                                                <>
                                                    Selected {selectedRowKeys.length} Item
                                                    {selectedRowKeys.length !== 1 && 's'}
                                                </>
                                            )}
                                        </div>
                                    </Flex>
                                    <Flex gap={5}>
                                        {selectedRowKeys.length !== 0 && (
                                            <Button
                                                danger
                                                type='primary'
                                                icon={<Trash />}
                                                onClick={() => handleOpenDeleteCategory(selectedRowKeys.map(s => s.toString()))}
                                            >
                                                Delete
                                            </Button>
                                        )}
                                        <Button type='primary' icon={<Plus />} onClick={handleOpenAddCategory}>
                                            Add Category
                                        </Button>
                                    </Flex>
                                </Flex>
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
                                            title: 'Deleted',
                                            dataIndex: 'deletedAt',
                                            key: 'deletedAt',
                                            render: value => {
                                                if (value === null) return ''
                                                else return format(new Date(value), 'dd/MM/yyyy')
                                            },
                                            sorter: (a, b) => {
                                                if (a.deletedAt === null) return -1
                                                if (b.deletedAt === null) return 1
                                                return a.deletedAt.getTime() - b.deletedAt.getTime()
                                            },
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
                                                                    handleOpenDeleteCategory(
                                                                        selectedRowKeys.length === 0
                                                                            ? [record.id]
                                                                            : selectedRowKeys.map(s => s.toString()),
                                                                    )
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
                                    rowSelection={{
                                        hideSelectAll: true,
                                        selectedRowKeys,
                                        onChange: (selectedKeys: Key[]) => onSelectChange(selectedKeys),
                                    }}
                                />
                            </Flex>
                        )}
                    </DeleteCategoryModal>
                )}
            </AddCategoryModal>
        </>
    )
}

export const CategoryListRoute = createRoute({
    path: '/categories',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})
