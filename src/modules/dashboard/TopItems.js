import { Empty, List } from 'antd'

import { fmtNumber } from '../../common/format.js'
import { t } from '../../common/i18n/index.js'
import { ItemName, Muted } from './dashboard.styled.js'

export default function TopItems({ items }) {
  if (items.length === 0) return <Empty description={t('topItems.empty')} />

  return (
    <List
      size="small"
      dataSource={items}
      renderItem={(item) => (
        <List.Item>
          <ItemName>{item.name}</ItemName>
          <Muted>{t('topItems.sold', { count: fmtNumber(item.qty) })}</Muted>
        </List.Item>
      )}
    />
  )
}
