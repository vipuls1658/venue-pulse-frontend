import { Card, Row, Space, Table, Typography } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #0f1115;
    --panel: #181b22;
    --panel-2: #1f232c;
    --border: #2a2f3a;
    --text: #e7e9ee;
    --muted: #8b93a3;
    --accent: #4f8cff;
    --warn: #d9a441;
    --warn-bg: #3a2f18;
    --crit: #e2574c;
    --crit-bg: #3a201d;
    --ok: #57c08a;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 14px;
  }

  button {
    font: inherit;
    cursor: pointer;
  }
`

export const Muted = styled.span`
  color: var(--muted);
  ${(p) => p.$small && 'font-size: 0.8rem;'}
`

export const LinkButton = styled.button`
  background: none;
  border: none;
  color: var(--accent);
  padding: 0;
`

/* --- login --- */
export const LoginScreen = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export const LoginCard = styled(Card)`
  width: 340px;
`

export const LoginHint = styled(Typography.Paragraph)`
  text-align: center;
  margin-top: 1rem;
`

export const FormError = styled.div`
  margin-bottom: 16px;
`

/* --- layout --- */
export const App = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem 3rem;
`

export const Loading = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  color: var(--muted);
`

export const Topbar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0 1rem;

  h1 {
    font-size: 1.25rem;
    margin: 0;
  }
`

export const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const SectionTitle = styled.h2`
  font-size: 0.95rem;
  margin: 0 0 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
`

/* --- stat bar --- */
export const StatBarRow = styled(Row)`
  margin-top: 1rem;
`

/* --- alert strip --- */
export const AlertStripBox = styled.div`
  margin-top: 1rem;
  border: 1px solid var(--crit);
  background: var(--crit-bg);
  border-radius: 10px;
  padding: 0.75rem 1rem;
`

export const AlertStripLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: var(--crit);
`

export const AlertStripItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.6rem;
`

export const AlertChip = styled.button`
  text-align: left;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.45rem 0.7rem;
  color: var(--text);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  max-width: 320px;

  span {
    font-size: 0.78rem;
    color: var(--muted);
  }
`

/* --- main grid --- */
export const Grid = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`

export const Panel = styled.section`
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.1rem 1.2rem;
`

/* --- venue table --- */
export const FlaggedValue = styled.span`
  color: var(--crit);
`

export const VenueTableStyled = styled(Table)`
  .ant-table-row.flagged > td {
    background: rgba(226, 87, 76, 0.07);
  }
`

export const ItemName = styled.span`
  flex: 1;
`

/* --- drawer --- */
export const DrawerMeta = styled(Space)`
  margin-bottom: 16px;
`

export const DrawerSubsection = styled.div`
  margin-top: 16px;
`
