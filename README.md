# Frontend — Venue Pulse

React dashboard built with **Create React App** (`react-scripts`).

## Run

```bash
npm install            # first time only
cp .env.example .env   # first time only — then edit .env
npm start              # dev server at http://localhost:3000
```

Production build:

```bash
npm run build          # outputs to build/
```

## Configuration

Per-environment values live in `.env`. Create React App only exposes variables
prefixed with `REACT_APP_`, and inlines them at build time, so **restart
`npm start` after editing**.

```bash
REACT_APP_API_BASE_URL=http://localhost:8000  # REST base, '' = same origin
REACT_APP_WS_BASE_URL=ws://localhost:8000      # WebSocket base, '' = derive from page
```

These are read in `src/core/config.js` and re-exported through
`src/common/constants.js`, which is the single import point for the rest of the
app.

## Structure

```
public/index.html        HTML template (#root mount point)
src/
  index.js               CRA entry — wraps <App> in <AuthProvider>, renders
  core/
    App.js               top-level screen switch (Login vs Dashboard)
    AuthContext.js       auth state via React Context (authed, login, logout)
    config.js            reads REACT_APP_* env vars
    styles.css           global styles
  common/                constants, formatting, i18n
  hooks/                 useDashboardSocket — live WebSocket snapshot
  modules/
    auth/                Login
    components/          shared badges
    dashboard/           Dashboard + panels (table, chart, drawer, …)
  services/api.js        REST wrapper + token storage
```

## How it works

The app pulls an initial snapshot over REST, then a WebSocket
(`src/hooks/useDashboardSocket.js`) pushes a fresh group snapshot whenever trade
moves. Components under `src/modules/` are presentational and take their data as
props. Auth is held in React Context (`src/core/AuthContext.js`).
