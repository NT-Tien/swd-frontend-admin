import { Account_Update_Password } from '@/api/account/Account_Update_Password'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { useMutation } from '@tanstack/react-query'
import { Form, Input, Modal } from 'antd'
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
        onSuccess: () => {
            messageApi.success('Password updated successfully.')
            handleClose()
        },
        onError: error => {
            devLog('Error updating password', error)
            messageApi.error('Error updating password.')
        },
    })

    function handleOpen(accountId: string) {
        setOpen(true)
        setAccountId(accountId)
    }

    function handleClose() {
        setOpen(false)
        setAccountId(null)
    }

    function handleOk() {
        form.submit()
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} title='Update Password' onOk={handleOk}>
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
