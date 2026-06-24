import { API_BASE_URL, API_PATHS, TOKEN_KEY } from '../common/constants.js'
import { t } from '../common/i18n/index.js'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

const url = (path) => `${API_BASE_URL}${path}`

const EMPTY_ALERTS = {
  sales_drop_alerts: [],
  refund_alerts: [],
  void_alerts: [],
}

async function request(
  path,
  { method = 'GET', body, auth = true, fallback } = {},
) {
  const headers = {}
  if (body) headers['Content-Type'] = 'application/json'
  if (auth) headers.Authorization = `Bearer ${getToken()}`

  const response = await fetch(url(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (auth && response.status === 401) {
    // expired token -> bounce to login
    clearToken()
    throw new Error(t('errors.sessionExpired'))
  }
  if (!response.ok)
    throw new Error(
      fallback || t('errors.requestFailed', { status: response.status }),
    )
  return response.json()
}

const post = (path, body, fallback) =>
  request(path, { method: 'POST', body, auth: false, fallback })
const getRaw = (path) => request(path)
const get = (path) => getRaw(path).then((body) => body.data)

export const login = async (email, password) => {
  try {
    const response = await post(
      API_PATHS.login,
      { email, password },
      t('login.invalidCredentials'),
    )
    const token = response?.data?.access_token
    if (!token) throw new Error(t('login.invalidCredentials'))
    setToken(token)
    return token
  } catch (error) {
    throw new Error(error?.message || t('login.failed'))
  }
}

export const fetchSummary = async () => {
  try {
    const [venuesResponse, topItems, alerts] = await Promise.all([
      getRaw(API_PATHS.venueSales(1) + '&pageSize=100'),
      get(API_PATHS.topItems),
      get(API_PATHS.alerts),
    ])
    const venues = venuesResponse.data

    const flaggedVenueIds = new Set()
    for (const venue of venues) {
      if (anomaliesFor(venue.venue_id, alerts).length)
        flaggedVenueIds.add(venue.venue_id)
    }

    const totalNetSales = venues.reduce(
      (sum, venue) => sum + venue.total_sales,
      0,
    )
    const flaggedVenues = venues
      .filter((venue) => flaggedVenueIds.has(venue.venue_id))
      .map((venue) => ({
        venue_id: venue.venue_id,
        name: venue.venue_name,
        anomalies: anomaliesFor(venue.venue_id, alerts),
      }))

    return {
      generated_at: new Date().toISOString(),
      totals: {
        net_sales: totalNetSales,
        venue_count: venues.length,
        flagged_venues: flaggedVenueIds.size,
      },
      flagged: flaggedVenues,
      alerts,
      top_items: topItems.map((item) => ({
        item_id: item.item_id,
        name: item.item_name,
        qty: item.quantity_sold,
      })),
    }
  } catch (error) {
    // keep original message so expiry still triggers the redirect
    throw new Error(error?.message || t('errors.requestFailed', { status: '' }))
  }
}

export const fetchVenuesPage = async (page, alerts) => {
  try {
    const response = await getRaw(API_PATHS.venueSales(page))
    const rows = response.data.map((venue) => ({
      venue_id: venue.venue_id,
      name: venue.venue_name,
      net_sales: venue.total_sales,
      anomalies: anomaliesFor(venue.venue_id, alerts || EMPTY_ALERTS),
    }))
    return { rows, total: response.meta?.pagination?.total ?? rows.length }
  } catch (error) {
    throw new Error(error?.message || t('errors.requestFailed', { status: '' }))
  }
}

export const fetchVenue = async (venueId, alerts) => {
  try {
    // endpoint returns a single-element list
    const [venue] = await get(API_PATHS.venue(venueId))
    return {
      venue: { name: venue.venue_name, kind: venue.venue_type },
      hourly: venue.hourly_sales,
      top_items: venue.top_selling_items.map((item) => ({
        item_id: item.item_id,
        name: item.item_name,
        qty: item.quantity_sold,
      })),
      anomalies: anomaliesFor(venue.venue_id, alerts || EMPTY_ALERTS),
    }
  } catch (error) {
    throw new Error(error?.message || t('errors.requestFailed', { status: '' }))
  }
}

function anomaliesFor(venueId, alerts) {
  const mine = (list) => list.filter((alert) => alert.venue_id === venueId)
  return [
    ...mine(alerts.sales_drop_alerts).map((alert) => ({
      type: 'sales_drop',
      severity: 'high',
      message: `Sales down ${alert.drop_percentage}%`,
    })),
    ...mine(alerts.refund_alerts).map((alert) => ({
      type: 'refund_spike',
      severity: 'warn',
      message: `${alert.refund_count} refunds`,
    })),
    ...mine(alerts.void_alerts).map((alert) => ({
      type: 'void_spike',
      severity: 'warn',
      message: `${alert.void_count} voids`,
    })),
  ]
}
