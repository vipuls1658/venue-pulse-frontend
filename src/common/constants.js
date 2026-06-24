import { API_BASE_URL, WS_BASE_URL } from '../core/config.js'
export { API_BASE_URL, WS_BASE_URL }

export const TOKEN_KEY = 'vp_token' // this is basically the key that we will use to store the token in the local storage of the browser


// defining the API paths so that we can have a single source of truth for the API endpoints and we can easily change them if needed in the future
export const API_PATHS = {
  login: '/api/auth/login/',
  venueSales: (page = 1) => `/api/dashboard/venue-sales/?page=${page}`,
  topItems: '/api/dashboard/top-items/',
  alerts: '/api/dashboard/alerts/',
  venue: (venueId) => `/api/dashboard/venue/?venue_id=${venueId}`,
}

export const VENUE_PAGE_SIZE = 10 // from here we can configure that how many venues we want to show per page in the dashboard
export const WS_DASHBOARD_PATH = '/ws/dashboard/' // its the address of the websocket connection for the dashboard

export const WS_UNAUTHORIZED_CODE = 4401
export const VENUE_POLL_INTERVAL_MS = 10000
export const WS_RECONNECT_BASE_MS = 1000
export const WS_RECONNECT_MAX_MS = 10000

// Display settings for currency, numbers, and times.
export const LOCALE = 'en-IN'
export const CURRENCY = 'INR'
export const TIME_ZONE = 'Asia/Kolkata'
