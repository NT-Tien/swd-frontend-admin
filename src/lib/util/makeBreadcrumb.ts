import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb'

type makeBreadcrumbProps = Partial<BreadcrumbItemType & BreadcrumbSeparatorType> & {
    show?: boolean
}

type returnTypeProps =
    | {
          isCurrent?: boolean
          title?: string
      }
    | undefined

export default function makeBreadcrumb({ show = true, ...props }: makeBreadcrumbProps) {
    return (
        { isCurrent, title }: returnTypeProps = {
            isCurrent: false,
            title: undefined,
        },
    ) => ({
        ...props,
        title: title ?? props.title,
        onClick: isCurrent || !show ? undefined : props.onClick,
    })
}
