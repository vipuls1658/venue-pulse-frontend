import { Card, Col, Statistic } from 'antd'

import { fmtMoney } from '../../common/format.js'
import { t } from '../../common/i18n/index.js'
import { FlaggedValue, StatBarRow } from './dashboard.styled.js'

export default function StatBar({ totals }) {
  const flagged = totals.flagged_venues > 0
  return (
    <StatBarRow gutter={16}>
      <Col flex="1">
        <Card>
          <Statistic
            title={t('stats.netSalesToday')}
            value={fmtMoney(totals.net_sales)}
          />
        </Card>
      </Col>
      <Col flex="1">
        <Card>
          <Statistic title={t('stats.venues')} value={totals.venue_count} />
        </Card>
      </Col>
      <Col flex="1">
        <Card>
          <Statistic
            title={t('stats.flaggedVenues')}
            value={totals.flagged_venues}
            formatter={(v) => (flagged ? <FlaggedValue>{v}</FlaggedValue> : v)}
          />
        </Card>
      </Col>
    </StatBarRow>
  )
}
