import { Tag } from 'antd'

import { t } from '../../common/i18n/index.js'

export default function AnomalyBadge({ anomaly }) {
  const key = `anomaly.${anomaly.type}`
  const label = t(key)
  return (
    <Tag
      color={anomaly.severity === 'high' ? 'red' : 'orange'}
      title={anomaly.message}
    >
      {label === key ? anomaly.type : label}
    </Tag>
  )
}
