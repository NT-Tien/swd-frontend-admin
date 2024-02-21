import { Account_Update_Password } from '@/api/account/Account_Update_Password'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type FieldType = {
    password: string
    confirmPassword: string
}

export type UpdatePasswordModalProps = {
    children: ({ handleOpen }: { handleOpen: (accountId: string) => void }) => ReactNode
}

export default function UpdatePasswordmodal({ children }: UpdatePasswordModalProps) {
    const [open, setOpen] = useState(false)
    const [accountId, setAccountId] = useState<string | null>(null)
    const [form] = Form.useForm<FieldType>()
    const { messageApi } = useMessage()

    const updatePasswordMutation = useMutation({
        mutationFn: Account_Update_Password,
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Updating account password...',
                key: 'updating-account-password',
            })
        },
        onSettled: () => {
            messageApi.destroy('updating-account-password')
        },
        onSuccess: () => {
            setTimeout(() => {
                messageApi.success('Password updated successfully.')
            }, 250)
            handleClose()
        },
        onError: error => {
            devLog('Error updating password', error)
            setTimeout(() => {
                messageApi.error('Error updating password.')
            }, 250)
        },
    })

    function handleOpen(accountId: string) {
        setOpen(true)
        setAccountId(accountId)
    }

    function handleClose() {
        setOpen(false)
        setAccountId(null)
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
                title='Update Password'
                footer={[
                    <Button type='default' onClick={handleClose}>
                        Close
                    </Button>,
                    <Button type='primary' loading={updatePasswordMutation.isPending} onClick={handleOk}>
                        Update Password
                    </Button>,
                ]}
            >
                {!!accountId && (
                    <Form<FieldType>
                        name='update-account-in-modal'
                        labelCol={{
                            span: 7,
                        }}
                        form={form}
                        initialValues={{
                            password: '',
                            confirmPassword: '',
                        }}
                        style={{
                            marginTop: '10px',
                        }}
                        onFinish={values => {
                            updatePasswordMutation.mutate({
                                id: accountId,
                                payload: {
                                    password: values.password,
                                },
                            })
                        }}
                        disabled={updatePasswordMutation.isPending}
                    >
                        <Form.Item<FieldType>
                            name='password'
                            label='Password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input type='password'></Input>
                        </Form.Item>
                        <Form.Item<FieldType>
                            name='confirmPassword'
                            label='Confirm Password'
                            dependencies={['password']}
                            rules={[
                                {
                                    type: 'string',
                                },
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator(_, value, callback) {
                                        if (!value || form.getFieldValue('password') === value) {
                                            callback()
                                        } else {
                                            callback('The two passwords that you entered do not match!')
                                        }
                                    },
                                },
                            ]}
                        >
                            <Input type='password'></Input>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </>
    )
}
