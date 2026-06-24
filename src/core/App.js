import { ConfigProvider, theme } from 'antd'

import { useAuth } from './AuthContext.js'
import Dashboard from '../modules/dashboard/Dashboard.js'
import Login from '../modules/auth/Login.js'

export default function App() {
  const { authed } = useAuth()

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      {authed ? <Dashboard /> : <Login />}
    </ConfigProvider>
  )
}
