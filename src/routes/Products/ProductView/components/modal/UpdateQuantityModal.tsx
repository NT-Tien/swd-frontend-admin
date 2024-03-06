import { Staff_UpdateQuantityProduct } from '@/api/staff/Staff_UpdateQuantityProduct'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type UpdateQuantityModalProps = {
    children: ({ handleOpen }: { handleOpen: (product: ProductState, quantity: number) => void }) => ReactNode
}

type FieldType = {
    quantity: number
}

type ProductState = {
    productId: string
    optionalProductId: string
}

export default function UpdateQuantityModal({ children }: UpdateQuantityModalProps) {
    const [form] = Form.useForm<FieldType>()
    const [open, setOpen] = useState(false)
    const [product, setProduct] = useState<ProductState | null>(null)
    const [currentQuantity, setCurrentQuantity] = useState<number>(0)
    const { messageApi } = useMessage()

    const updateQuantityMutation = useMutation({
        mutationFn: Staff_UpdateQuantityProduct,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Updating Quantity...',
                key: 'updating-quantity',
            })
        },
        onSettled: () => {
            messageApi.destroy('updating-quantity')
        },
        onSuccess: async () => {
            handleClose()
            setTimeout(() => {
                messageApi.success('Successfully Updated Quantity')
            }, 250)
            await queryClient.invalidateQueries({
                queryKey: ['product'],
            })
        },
        onError(error) {
            devLog('Error updating quantity: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
    })

    function handleOpen(product: ProductState, quantity: number) {
        setOpen(true)
        setProduct(product)
        setCurrentQuantity(quantity)
    }

    function handleClose() {
        setOpen(false)
        setProduct(null)
        setCurrentQuantity(0)
        form.resetFields()
    }

    function handleOk() {
        form.submit()
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                open={open}
                onCancel={handleClose}
                title='Update Quantity'
                footer={[
                    <Button form='update-quantity' type='primary' onClick={handleOk} loading={updateQuantityMutation.isPending}>
                        Update
                    </Button>,
                ]}
            >
                <Form
                    name='update-quantity'
                    form={form}
                    initialValues={{ quantity: currentQuantity }}
                    autoComplete='off'
                    onFinish={values => {
                        updateQuantityMutation.mutate({ id: product!.optionalProductId, quantity: values.quantity })
                    }}
                    disabled={updateQuantityMutation.isPending}
                >
                    <Form.Item<FieldType>
                        name='quantity'
                        rules={[
                            {
                                required: true,
                                message: 'Please input the quantity!',
                            },
                            {
                                type: 'number',
                                validator(_, value, callback) {
                                    const curr = Number(value)

                                    if (isNaN(curr)) {
                                        callback('Quantity must be a number!')
                                    }

                                    if (curr < 1) {
                                        callback('Quantity must be at least 1!')
                                    }
                                    callback()
                                },
                                min: 1,
                                message: 'Quantity must be at least 1!',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
