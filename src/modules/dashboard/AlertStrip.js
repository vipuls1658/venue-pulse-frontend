import { WarningFilled } from '@ant-design/icons'

import { t } from '../../common/i18n/index.js'
import {
  AlertChip,
  AlertStripBox,
  AlertStripItems,
  AlertStripLabel,
} from './dashboard.styled.js'

export default function AlertStrip({ flagged, onSelect }) {
  if (!flagged || flagged.length === 0) return null

  return (
    <AlertStripBox>
      <AlertStripLabel>
        <WarningFilled />
        {t('alert.needAttention', { count: flagged.length })}
      </AlertStripLabel>
      <AlertStripItems>
        {flagged.map((venue) => (
          <AlertChip
            key={venue.venue_id}
            onClick={() => onSelect(venue.venue_id)}
          >
            <strong>{venue.name}</strong>
            <span>
              {venue.anomalies.map((anomaly) => anomaly.message).join(' · ')}
            </span>
          </AlertChip>
        ))}
      </AlertStripItems>
    </AlertStripBox>
  )
}
