import { Badge } from 'antd'

import { t } from '../../common/i18n/index.js'

const STATUS = {
  connecting: 'processing',
  live: 'success',
  reconnecting: 'warning',
  unauthorized: 'error',
}

export default function ConnectionBadge({ status }) {
  const key = `connection.${status}`
  const label = t(key)
  return (
    <Badge
      status={STATUS[status] || 'default'}
      text={label === key ? status : label}
    />
  )
}
