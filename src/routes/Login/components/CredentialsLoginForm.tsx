import { DashboardRoute } from '@/routes/Dashboard'
import { useNavigate } from '@tanstack/react-router'
import Button from 'antd/es/button'
import Form, { FormProps } from 'antd/es/form'
import Input from 'antd/es/input'
import message from 'antd/es/message'
import theme from 'antd/es/theme'

const { useToken } = theme
const { Item } = Form

type FormFields = {
    username?: string
    password?: string
}

type LoginFormProps = FormProps<FormFields>

export default function CredentialsLoginForm({ ...props }: LoginFormProps) {
    const [form] = Form.useForm<FormFields>()
    const { token } = useToken()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()

    function handleFinish() {
        if (
            form.getFieldsValue().username === 'admin' &&
            form.getFieldsValue().password === '123'
        ) {
            navigate({
                to: DashboardRoute.to,
            })
        } else {
            form.setFields([
                {
                    name: 'username',
                    errors: ['Invalid username or password.'],
                    value: '',
                },
                {
                    name: 'password',
                    errors: ['Invalid username or password.'],
                    value: '',
                },
            ])
            messageApi.error('Invalid username or password.')
        }
    }

    function handleFinishFailed() {
        form.setFields([
            {
                name: 'username',
                errors: ['This field is required.'],
                value: '',
            },
            {
                name: 'password',
                errors: ['This field is required.'],
                value: '',
            },
        ])
        messageApi.error('Invalid username or password.')
        // ! TEST start
        messageApi.info(
            <Button
                onClick={() => {
                    form.setFieldsValue({
                        username: 'admin',
                        password: '123',
                    })
                }}
            >
                TEST_Fill
            </Button>,
        )
        // ! TEST end
    }

    return (
        <>
            <Form
                form={form}
                name='admin-login'
                labelCol={{
                    span: 6,
                }}
                autoComplete='off'
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                {...props}
            >
                <Item<FormFields>
                    label='Username'
                    name='username'
                    labelAlign='left'
                    rules={[
                        {
                            required: true,
                            message: 'This field is required.',
                        },
                    ]}
                    style={{
                        marginBottom: token.marginMD,
                    }}
                >
                    <Input size='large' placeholder='user' allowClear />
                </Item>
                <Item<FormFields>
                    label='Password'
                    name='password'
                    labelAlign='left'
                    rules={[
                        {
                            required: true,
                            message: 'This field is required.',
                        },
                    ]}
                    style={{
                        marginBottom: token.marginMD,
                    }}
                >
                    <Input.Password
                        size='large'
                        placeholder='*****'
                        allowClear
                    />
                </Item>
                <Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        style={{
                            width: '100%',
                            height: '35px',
                            marginTop: token.marginSM,
                        }}
                        disabled={form.isFieldsValidating()}
                    >
                        Login
                    </Button>
                </Item>
            </Form>
            {contextHolder}
        </>
    )
}
