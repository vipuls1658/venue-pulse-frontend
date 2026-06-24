import { useState } from 'react'

import { useAuth } from '../../core/AuthContext.js'
import { fmtTime } from '../../common/format.js'
import { t } from '../../common/i18n/index.js'
import { useDashboardSocket } from '../../hooks/useDashboardSocket.js'
import ConnectionBadge from '../components/ConnectionBadge.js'
import AlertStrip from './AlertStrip.js'
import StatBar from './StatBar.js'
import TopItems from './TopItems.js'
import VenueDrawer from './VenueDrawer.js'
import VenueTable from './VenueTable.js'
import {
  App,
  Grid,
  LinkButton,
  Loading,
  Muted,
  Panel,
  SectionTitle,
  Topbar,
  TopbarRight,
} from './dashboard.styled.js'

export default function Dashboard() {
  const { logout } = useAuth()
  const { snapshot, status } = useDashboardSocket()
  const [openVenueId, setOpenVenueId] = useState(null)

  if (!snapshot) {
    return (
      <Loading>
        <p>{t('app.connecting')}</p>
      </Loading>
    )
  }

  return (
    <App>
      <Topbar>
        <div>
          <h1>{t('app.title')}</h1>
          <Muted>{t('app.subtitle')}</Muted>
        </div>
        <TopbarRight>
          <ConnectionBadge status={status} />
          <Muted $small>
            {t('app.updatedAt', { time: fmtTime(snapshot.generated_at) })}
          </Muted>
          <LinkButton onClick={logout}>{t('app.signOut')}</LinkButton>
        </TopbarRight>
      </Topbar>

      <StatBar totals={snapshot.totals} />
      <AlertStrip flagged={snapshot.flagged} onSelect={setOpenVenueId} />

      <Grid>
        <Panel>
          <SectionTitle>{t('dashboard.salesByVenue')}</SectionTitle>
          <VenueTable
            alerts={snapshot.alerts}
            generatedAt={snapshot.generated_at}
            onSelect={setOpenVenueId}
          />
        </Panel>

        <Panel>
          <SectionTitle>{t('dashboard.topSellersGroup')}</SectionTitle>
          <TopItems items={snapshot.top_items} />
        </Panel>
      </Grid>

      {openVenueId && (
        <VenueDrawer
          venueId={openVenueId}
          alerts={snapshot.alerts}
          onClose={() => setOpenVenueId(null)}
        />
      )}
    </App>
  )
}
