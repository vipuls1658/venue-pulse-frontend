import { useEffect, useState } from 'react'
import { Space } from 'antd'

import { fmtMoney } from '../../common/format.js'
import { t } from '../../common/i18n/index.js'
import { VENUE_PAGE_SIZE } from '../../common/constants.js'
import { fetchVenuesPage } from '../../services/api.js'
import AnomalyBadge from '../components/AnomalyBadge.js'
import { VenueTableStyled } from './dashboard.styled.js'

export default function VenueTable({ alerts, generatedAt, onSelect }) {
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    fetchVenuesPage(page, alerts)
      .then((res) => {
        if (!active) return
        setRows(res.rows)
        setTotal(res.total)
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [page, alerts, generatedAt])

  const columns = [
    {
      title: t('venueTable.rank'),
      width: 56,
      render: (_, __, i) => (page - 1) * VENUE_PAGE_SIZE + i + 1,
    },
    { title: t('venueTable.venue'), dataIndex: 'name' },
    {
      title: t('venueTable.netSales'),
      dataIndex: 'net_sales',
      align: 'right',
      render: (v) => fmtMoney(v),
    },
    {
      title: t('venueTable.flags'),
      dataIndex: 'anomalies',
      render: (anomalies) => (
        <Space size={4} wrap>
          {anomalies.map((anomaly) => (
            <AnomalyBadge key={anomaly.type} anomaly={anomaly} />
          ))}
        </Space>
      ),
    },
  ]

  return (
    <VenueTableStyled
      rowKey="venue_id"
      columns={columns}
      dataSource={rows}
      loading={loading}
      size="small"
      pagination={{
        current: page,
        pageSize: VENUE_PAGE_SIZE,
        total,
        onChange: setPage,
        showSizeChanger: false,
      }}
      rowClassName={(venue) => (venue.anomalies.length ? 'flagged' : '')}
      onRow={(venue) => ({
        onClick: () => onSelect(venue.venue_id),
        style: { cursor: 'pointer' },
      })}
    />
  )
}
