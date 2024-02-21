import { Category_Create } from '@/api/category/Category_Create'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal } from 'antd'
import { ReactNode, useState } from 'react'

const { Item: FormItem } = Form

type AddCategoryModalProps = {
    children: ({ handleOpen }: { handleOpen: () => void }) => ReactNode
}

type FieldType = {
    name: string
}

export default function AddCategoryModal({ children }: AddCategoryModalProps) {
    const [form] = Form.useForm<FieldType>()
    const { messageApi } = useMessage()
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient()
    const createCategoryMutation = useMutation({
        mutationFn: Category_Create,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Creating category...',
                key: 'creating-category',
            })
        },
        onSettled: () => {
            messageApi.destroy('creating-category')
        },
        onSuccess: async () => {
            handleClose()
            setTimeout(() => {
                messageApi.success('Successfully created category')
            }, 250)
            await queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
        },
        onError(error) {
            devLog('Error creating category: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
    })

    async function handleOk() {
        form.submit()
    }

    function handleClose() {
        form.resetFields()
        setOpen(false)
    }

    function handleOpen() {
        setOpen(true)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                title='Add Category'
                open={open}
                onOk={handleOk}
                onCancel={handleClose}
                confirmLoading
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button
                        form='add-category-form'
                        htmlType='submit'
                        color='primary'
                        type='primary'
                        loading={createCategoryMutation.isPending}
                    >
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name='add-category-form'
                    initialValues={{
                        name: '',
                    }}
                    autoComplete='off'
                    onFinish={() => {
                        createCategoryMutation.mutate({
                            name: form.getFieldValue('name'),
                        })
                    }}
                    disabled={createCategoryMutation.isPending}
                >
                    <FormItem<FieldType>
                        name='name'
                        label='Name'
                        rules={[
                            {
                                required: true,
                                max: 200,
                                min: 1,
                            },
                            // TODO Check if name already exists
                        ]}
                    >
                        <Input disabled={createCategoryMutation.isPending} />
                    </FormItem>
                </Form>
            </Modal>
        </>
    )
}
