import { useEffect, useState } from 'react'
import { Alert, Modal, Spin, Typography } from 'antd'

import { kindLabel } from '../../common/format.js'
import { t } from '../../common/i18n/index.js'
import { VENUE_POLL_INTERVAL_MS } from '../../common/constants.js'

import { fetchVenue } from '../../services/api.js'

import AnomalyBadge from '../components/AnomalyBadge.js'
import HourlyChart from './HourlyChart.js'
import TopItems from './TopItems.js'

import { DrawerMeta, DrawerSubsection } from './dashboard.styled.js'

export default function VenueDrawer({ venueId, alerts, onClose }) {
  const [detail, setDetail] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    const load = () =>
      fetchVenue(venueId, alerts)
        .then((data) => active && setDetail(data))
        .catch((err) => active && setError(err.message))
    load()
    // poll while open
    const timer = setInterval(load, VENUE_POLL_INTERVAL_MS)
    return () => {
      active = false
      clearInterval(timer)
    }
  }, [venueId, alerts])

  return (
    <Modal
      open
      width={640}
      footer={null}
      onCancel={onClose}
      title={detail?.venue.name || t('drawer.loading')}
    >
      {error && <Alert type="error" message={error} showIcon />}
      {!detail && !error && <Spin />}
      {detail && (
        <>
          <DrawerMeta align="center">
            <Typography.Text type="secondary">
              {kindLabel(detail.venue.kind)}
            </Typography.Text>

            {detail.anomalies.map((a) => (
              <AnomalyBadge key={a.type} anomaly={a} />
            ))}
          </DrawerMeta>

          <Typography.Title level={5}>
            {t('drawer.hourlyTrade')}
          </Typography.Title>

          <HourlyChart hourly={detail.hourly} />

          <DrawerSubsection>
            <Typography.Title level={5}>
              {t('drawer.whatsSelling')}
            </Typography.Title>

            <TopItems items={detail.top_items} />
          </DrawerSubsection>
        </>
      )}
    </Modal>
  )
}
