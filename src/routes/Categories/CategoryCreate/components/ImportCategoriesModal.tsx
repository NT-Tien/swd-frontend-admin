import { InboxOutlined } from '@ant-design/icons'
import { Button, Form, Modal, Typography, Upload, UploadFile } from 'antd'
import { ReactNode, useState } from 'react'

type FieldType = {
    file: UploadFile<any>
}

type ImportCategoriesModalProps = {
    children: ({ handleOpen }: { handleOpen: () => void }) => ReactNode
}

export default function ImportCategoriesModal({ children }: ImportCategoriesModalProps) {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm<FieldType>()
    // const [data, setData] = useState('')

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
        form.resetFields()
    }

    function handleFinish() {
        console.log(form.getFieldsValue())
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} title='Import Categories From JSON'>
                <Typography.Paragraph copyable>
                    <pre>
                        {`[
    {
        "name": "First category"
    },
    {
        "name": "Second category"
    },
    ...
]`}
                    </pre>
                </Typography.Paragraph>
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item<FieldType> name='file' label='File' getValueFromEvent={e => e}>
                        <Upload.Dragger
                            multiple={false}
                            accept='.json'
                            beforeUpload={() => false}
                            maxCount={1}
                            onChange={info => {
                                form.setFieldValue('file', info.file)
                            }}
                        >
                            <p className='ant-upload-drag-icon'>
                                <InboxOutlined />
                            </p>
                            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                        </Upload.Dragger>
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    )
}
