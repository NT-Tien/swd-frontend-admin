import { Product } from '@/lib/types/Product'
import ModalWrapper from '@/common/components/modal/ModalWrapper'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import OptionalProductsCard from '@/routes/Products/ProductView/components/OptionalProductsCard'
import ProductImagesView from '@/routes/Products/ProductView/components/ProductImagesView'
import { EditOutlined } from '@ant-design/icons'
import { Info } from '@phosphor-icons/react'
import { Button, Card, Col, Flex, Row, Tooltip, Typography } from 'antd'
import format from 'date-fns/format'

const DEFAULT_GUTTER_SIZE = 10

type AboutProductProps = {
    product: Product
}

export default function AboutProduct({ product }: AboutProductProps) {
    const isEditing = ProductViewRoute.useSearch({
        select: data => data.editing,
    })

    return (
        <Flex gap={DEFAULT_GUTTER_SIZE} vertical>
            <Row gutter={[DEFAULT_GUTTER_SIZE, DEFAULT_GUTTER_SIZE]}>
                <Col
                    span={16}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: DEFAULT_GUTTER_SIZE,
                    }}
                >
                    <Flex gap={DEFAULT_GUTTER_SIZE}>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Name
                                    {isEditing ? (
                                        <Button icon={<EditOutlined />} />
                                    ) : (
                                        <Tooltip title='Info'>
                                            <Info />
                                        </Tooltip>
                                    )}
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>{product.name}</Typography.Paragraph>
                        </Card>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Created
                                    {!isEditing && (
                                        <Tooltip title='Info'>
                                            <Info />
                                        </Tooltip>
                                    )}
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>{format(product.createdAt, 'MM/dd/yyyy')}</Typography.Paragraph>
                        </Card>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Updated
                                    {!isEditing && (
                                        <Tooltip title='Info'>
                                            <Info />
                                        </Tooltip>
                                    )}
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>{format(product.updatedAt, 'MM/dd/yyyy')}</Typography.Paragraph>
                        </Card>
                        <Card
                            title={
                                <Flex justify='space-between' align='center'>
                                    Category
                                    {isEditing ? (
                                        <Button icon={<EditOutlined />} />
                                    ) : (
                                        <Tooltip title='Info'>
                                            <Info />
                                        </Tooltip>
                                    )}
                                </Flex>
                            }
                            style={{
                                width: '100%',
                            }}
                        >
                            <Typography.Paragraph ellipsis>{product.category_id.name}</Typography.Paragraph>
                        </Card>
                    </Flex>
                    <ModalWrapper
                        modalProps={{
                            footer: null,
                        }}
                        modalComponent={() => (
                            <Typography.Paragraph>{product.description}</Typography.Paragraph>
                        )}
                    >
                        {({ handleOpen }) => (
                            <Card
                                title={
                                    <Flex justify='space-between' align='center'>
                                        Description
                                        {isEditing ? (
                                            <Button icon={<EditOutlined />} />
                                        ) : (
                                            <Tooltip title='Info'>
                                                <Info />
                                            </Tooltip>
                                        )}
                                    </Flex>
                                }
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    flexGrow: 1,
                                    cursor: 'pointer',
                                }}
                                onClick={handleOpen}
                            >
                                <Typography.Paragraph ellipsis={{ rows: 5, expandable: false }}>{product.description}</Typography.Paragraph>
                            </Card>
                        )}
                    </ModalWrapper>
                </Col>
                <Col span={8}>
                    <ProductImagesView imageLinks={product.images} productId={product.id} />
                </Col>
            </Row>
            <Row gutter={[DEFAULT_GUTTER_SIZE, DEFAULT_GUTTER_SIZE]}>
                <OptionalProductsCard productId={product.id} />
            </Row>
        </Flex>
    )
}
