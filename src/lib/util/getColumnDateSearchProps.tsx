import { CalendarOutlined } from '@ant-design/icons'
import { Button, DatePicker, Space, TableColumnType, Tooltip } from 'antd'
import { FilterDropdownProps } from 'antd/es/table/interface'
import dayjs, { Dayjs } from 'dayjs'
import { useRef, useState } from 'react'

export default function GetColumnDateSearchProps<T>() {
    const [searchDates, setSearchDates] = useState<[Dayjs | null, Dayjs | null] | null>(null)
    const searchInput = useRef<any>(null)

    function handleSearch(confirm: FilterDropdownProps['confirm']) {
        confirm()
    }

    function handleReset(clearFilters: () => void, confirm: FilterDropdownProps['confirm']) {
        setSearchDates(null)
        clearFilters()
        confirm()
    }

    const func = (dataIndex: keyof T, edit?: TableColumnType<T>): TableColumnType<T> => ({
        filterDropdown: ({ setSelectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <DatePicker.RangePicker
                    showTime={{
                        defaultValue: [dayjs().hour(0).minute(0), dayjs().hour(0).minute(0)],
                    }}
                    size='small'
                    ref={searchInput}
                    value={searchDates}
                    onChange={dates => {
                        setSearchDates(dates ? [dayjs(dates[0]), dayjs(dates[1])] : null)
                        setSelectedKeys(dates && dates[0] && dates[1] ? [dates[0].toISOString(), dates[1].toISOString()] : [])
                    }}
                    style={{ marginBottom: 8, display: 'block', width: '100%' }}
                />
                <Space>
                    <Button type='primary' onClick={() => handleSearch(confirm)} size='small' style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters, confirm)} size='small' style={{ width: 80 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <Tooltip title='Filter by Date'>
                <CalendarOutlined size={16} style={{ color: filtered ? '#1677ff' : undefined }} />
            </Tooltip>
        ),
        onFilter: (_, record) => {
            if (!searchDates || !record[dataIndex]) {
                return false
            }
            const recordDate = dayjs(record[dataIndex] as Date)

            if (!recordDate.isValid()) {
                return false
            }

            return recordDate.isBetween(searchDates[0], searchDates[1], null, '[]')
        },
        ...edit,
    })

    return func
}
