import { Category_Delete } from '@/api/category/Category_Delete'
import { Category } from '@/lib/types/Category'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal, Table, message } from 'antd'
import { ReactNode, useMemo, useState } from 'react'

type DeleteCategoryModalProps = {
    children: ({
        handleOpen,
    }: {
        handleOpen: (categoryIds: string[]) => void
    }) => ReactNode
    categories: Category[]
    afterDelete?: () => void
}

export default function DeleteCategoryModal({
    children,
    categories,
    afterDelete,
}: DeleteCategoryModalProps) {
    const [messageApi, contextHolder] = message.useMessage()
    const [open, setOpen] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const queryClient = useQueryClient()

    // TODO Implement delete multiple
    const deleteCategories = useMutation({
        mutationFn: Category_Delete,
    })

    function handleOpen(categoryIds: string[]) {
        setOpen(true)
        setSelectedCategories(categoryIds)
    }

    function handleClose() {
        setOpen(false)
        setSelectedCategories([])
    }

    async function handleOk() {
        await Promise.all(
            selectedCategories.map(val =>
                deleteCategories.mutateAsync({ id: val }),
            ),
        )
        handleClose()
        messageApi.success(
            `Categor${
                selectedCategories.length === 1 ? 'y' : 'ies'
            } deleted successfully`,
        )
        queryClient.invalidateQueries({
            queryKey: ['categories'],
        })

        if (afterDelete) {
            afterDelete()
        }
    }

    const data = useMemo(
        () =>
            categories
                .filter(cat => selectedCategories.includes(cat.id))
                .map(cat => ({
                    ...cat,
                    key: cat.id,
                })),
        [categories, selectedCategories],
    )

    return (
        <>
            {contextHolder}
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                onOk={handleOk}
                title='Delete Category'
                footer={[
                    <Button key='cancel' onClick={handleClose}>
                        Cancel
                    </Button>,
                    <Button
                        key='delete'
                        type='primary'
                        danger
                        onClick={handleOk}
                    >
                        Delete
                    </Button>,
                ]}
            >
                <Table
                    dataSource={data}
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            sorter: (a, b) => a.name.localeCompare(b.name),
                            sortDirections: ['ascend', 'descend'],
                        },
                    ]}
                    pagination={{
                        pageSize: 5,
                    }}
                />
            </Modal>
        </>
    )
}
