const en = {
  app: {
    title: 'Venue Pulse',
    subtitle: 'Group operations · today',
    operationsDashboard: 'Operations dashboard',
    signOut: 'Sign out',
    updatedAt: 'updated {time}',
    connecting: 'Connecting to the live feed…',
  },
  login: {
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signingIn: 'Signing in…',
    demoHint: 'Sign in with your venue ops account',
    invalidCredentials: 'Invalid email or password',
    failed: 'Login failed. Please try again.',
  },
  errors: {
    sessionExpired: 'Session expired',
    requestFailed: 'Request failed ({status})',
  },
  connection: {
    connecting: 'Connecting',
    live: 'Live',
    reconnecting: 'Reconnecting',
    unauthorized: 'Signed out',
  },
  stats: {
    netSalesToday: 'Net sales today',
    venues: 'Venues',
    flaggedVenues: 'Flagged venues',
  },
  alert: {
    needAttention: '{count} venue(s) need attention',
  },
  anomaly: {
    sales_drop: 'Sales drop',
    refund_spike: 'Refund spike',
    void_spike: 'Void spike',
  },
  venueKind: {
    pub: 'Pub',
    restaurant: 'Restaurant',
    function: 'Function space',
  },
  dashboard: {
    salesByVenue: 'Sales by venue',
    topSellersGroup: 'Top sellers · group',
  },
  venueTable: {
    rank: '#',
    venue: 'Venue',
    netSales: 'Net sales',
    txns: 'Txns',
    flags: 'Flags',
  },
  topItems: {
    empty: 'No sales yet today.',
    sold: '{count} sold',
  },
  drawer: {
    loading: 'Loading…',
    hourlyTrade: 'Hourly trade',
    whatsSelling: "What's selling",
    close: 'Close',
  },
  chart: {
    salesTip: '{hour} · {sales} sales',
    refundsTip: ' · {refunds} refunds',
    voidsTip: ' · {count} voids',
  },
}

export default en
