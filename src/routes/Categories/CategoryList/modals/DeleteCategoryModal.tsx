import { Category_DeleteMany } from '@/api/category/Category_DeleteMany'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type DeleteCategoryModalProps = {
    children: ({ handleOpen }: { handleOpen: (categoryIds: string[]) => void }) => ReactNode
    afterDelete?: () => void
}

export default function DeleteCategoryModal({ children, afterDelete }: DeleteCategoryModalProps) {
    const { messageApi } = useMessage()
    const [open, setOpen] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const queryClient = useQueryClient()

    const deleteCategoriesMutation = useMutation({
        mutationFn: Category_DeleteMany,
        onSuccess: async () => {
            handleClose()
            setTimeout(() => {
                messageApi.success(`Categor${selectedCategories.length === 1 ? 'y' : 'ies'} deleted successfully`)
            }, 250)
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
            queryClient.invalidateQueries({
                queryKey: ['categories-deleted'],
            })
            if (afterDelete) {
                afterDelete()
            }
        },
        onError: error => {
            devLog('Error deleting category: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Deleting category...',
                key: 'deleting-category',
            })
        },
        onSettled: () => {
            messageApi.destroy('deleting-category')
        },
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
        await deleteCategoriesMutation.mutateAsync({ ids: selectedCategories })
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                onOk={handleOk}
                title='Delete Category'
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button type='primary' danger onClick={handleOk} loading={deleteCategoriesMutation.isPending}>
                        Delete
                    </Button>,
                ]}
            >
                Are you sure you want to delete this category?
            </Modal>
        </>
    )
}
