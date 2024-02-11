import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { Product_GetByName } from '@/api/product/Product_GetByName'
import { queryProduct_GetOne } from '@/api/product/Product_GetOne'
import ModalWrapper from '@/lib/util/ModalWrapper'
import { GetImages } from '@/routes/Products/common/util/GetImages'
import { UpdateProduct } from '@/routes/Products/common/util/UpdateProduct'
import { Eye } from '@phosphor-icons/react'
import { useMutation, useQueries, useQuery } from '@tanstack/react-query'
import { Button, Divider, Flex, Form, Input, Select, Upload, UploadFile, message } from 'antd'

const { Item: FormItem } = Form

type UpdateProductFormProps = {
    productId: string
}

type FieldType = {
    name: string
    description: string
    categoryId: string
    images: UploadFile<any>[]
}

export default function UpdateProductForm({ productId }: UpdateProductFormProps) {
    const [messageApi, contextHolder] = message.useMessage()

    const {
        categories: { data: categories, isError: isError_Categories, isLoading: isLoading_Categories, isSuccess: isSuccess_Categories },
        product: { data: product, isError, isLoading, isSuccess, error },
    } = useQueries({
        queries: [
            {
                ...queryProduct_GetOne({ id: productId }),
                staleTime: Infinity,
                gcTime: 0,
                retry: 0,
            },
            queryCategory_GetAll(),
        ],
        combine: data => {
            return {
                product: data[0],
                categories: data[1],
            }
        },
    })

    const {
        data: images,
        isLoading: isLoading_Images,
        isError: isError_Images,
        isSuccess: isSuccess_Images,
        error: error_Images,
    } = useQuery({
        queryKey: ['file', productId, product?.images],
        queryFn: () => GetImages(product?.images ?? []),
        enabled: !!product,
        select: data =>
            data.map((img: string) => ({ uid: img, name: img, status: 'done', url: img, key: img }) as unknown as UploadFile<any>),
    })

    const updateProductMutation = useMutation({
        mutationFn: UpdateProduct,
        onSuccess: () => {
            messageApi.success('Product updated successfully')
        },
        onError: () => {
            messageApi.error('Error while updating product')
        },
    })

    const [form] = Form.useForm()
    async function handleFinish() {
        await updateProductMutation.mutateAsync({
            product: {
                id: productId,
                payload: {
                    name: form.getFieldValue('name'),
                    description: form.getFieldValue('description'),
                    category: form.getFieldValue('categoryId'),
                    images: [],
                },
            },
            images: form.getFieldValue('images'),
        })
    }
    function handleFinishFailed() {}

    if (isLoading || isLoading_Images) {
        return <div>Loading...</div>
    }

    if (isError || isError_Images) {
        return <div>{error?.message || error_Images?.message}</div>
    }

    if (!isSuccess) return // product WILL exist after this line

    return (
        <>
            {contextHolder}
            <Form<FieldType>
                form={form}
                name='create-product-form'
                initialValues={{
                    name: product.name,
                    description: product.description,
                    images: images,
                    optional: [],
                }}
                onFinish={handleFinish}
                onFinishFailed={handleFinishFailed}
                size='large'
                layout='vertical'
                requiredMark={false}
                colon={false}
            >
                <Flex gap={20}>
                    {/* NAME INPUT */}
                    <FormItem<FieldType>
                        label='Name'
                        name='name'
                        hasFeedback
                        rules={[
                            { required: true },
                            { min: 2 },
                            { max: 200 },
                            {
                                async validator(_, value) {
                                    if (value === product.name) return Promise.resolve()
                                    const alreadyExists = await Product_GetByName({ name: value })
                                    if (alreadyExists.data !== null) {
                                        return Promise.reject('Product with this name already exists.')
                                    } else {
                                        return Promise.resolve()
                                    }
                                },
                            },
                        ]}
                        style={{
                            width: '50%',
                        }}
                        validateDebounce={2000}
                    >
                        <Input placeholder='Mobile Phone' />
                    </FormItem>

                    {/* CATEGORY INPUT */}
                    {isLoading_Categories && <Input disabled />}
                    {isError_Categories && <Input disabled />}
                    {isSuccess_Categories && (
                        <FormItem<FieldType>
                            label='Category'
                            name='categoryId'
                            style={{
                                width: '50%',
                            }}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            initialValue={categories.data.find(cat => cat.id === product.category_id.id)}
                        >
                            <Select
                                showSearch
                                placeholder='Select a Category'
                                options={categories.data.map(cat => ({
                                    value: cat.id ?? '',
                                    label: cat.name ?? '',
                                }))}
                                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                onChange={value => {
                                    form.setFieldValue('categoryId', value)
                                }}
                            />
                        </FormItem>
                    )}
                </Flex>

                {/* IMAGES INPUT */}
                <FormItem<FieldType>
                    name='images'
                    label='Images'
                    rules={[{ required: true }]}
                    getValueFromEvent={e => {
                        if (Array.isArray(e)) {
                            return e
                        }
                        return e && e.fileList
                    }}
                >
                    {isSuccess_Images && (
                        <Upload.Dragger
                            name='upload'
                            multiple
                            maxCount={3}
                            accept='image/*'
                            fileList={form.getFieldValue('images')}
                            listType='picture'
                            showUploadList
                            hasControlInside
                            beforeUpload={() => false}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    rowGap: 8,
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: '1.2rem',
                                        fontWeight: 500,
                                    }}
                                >
                                    Drag & drop product image here
                                </p>
                                <Divider>OR</Divider>
                                <Button>Select Files</Button>
                            </div>
                        </Upload.Dragger>
                    )}
                </FormItem>

                {/* DESCRIPTION INPUT */}
                <ModalWrapper
                    modalProps={{
                        title: 'Description',
                        width: '50%',
                    }}
                    modalComponent={() => (
                        <FormItem<FieldType> name='description' rules={[{ required: true }]}>
                            <Input.TextArea rows={20} />
                        </FormItem>
                    )}
                >
                    {({ handleOpen }) => (
                        <FormItem<FieldType>
                            label={
                                <>
                                    <div>Description</div>
                                    <Button
                                        onClick={handleOpen}
                                        style={{
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <Eye />
                                    </Button>
                                </>
                            }
                            name='description'
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea rows={5} />
                        </FormItem>
                    )}
                </ModalWrapper>

                <Flex justify='end'>
                    <Button
                        htmlType='submit'
                        type='primary'
                        style={{
                            marginTop: 20,
                        }}
                    >
                        Update
                    </Button>
                </Flex>
            </Form>
        </>
    )
}
