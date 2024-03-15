import { message } from 'antd'
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb'

type makeBreadcrumbProps = Partial<BreadcrumbItemType & BreadcrumbSeparatorType> & {
    show?: boolean
    isCopyable?: boolean
}

type returnTypeProps =
    | {
          isCurrent?: boolean
          title?: string
      }
    | undefined

export default function makeBreadcrumb({ show = true, isCopyable = false, ...props }: makeBreadcrumbProps) {
    return (
        { isCurrent, title }: returnTypeProps = {
            isCurrent: false,
            title: undefined,
        },
    ) =>
        ({
            ...props,
            title: title ?? props.title,
            onClick:
                (isCurrent || !show) && isCopyable
                    ? () => {
                          window.navigator.clipboard.writeText(title ?? '')
                          message.success('Copied to clipboard!')
                      }
                    : props.onClick,
            className: 'enabled-breadcrumb',
        }) satisfies Partial<BreadcrumbItemType & BreadcrumbSeparatorType>
}
