import { createContext, useContext, useMemo, useState } from 'react'

import { clearToken, getToken } from '../services/api.js'

// here we are creating a context for authentication so that we can easily manage the authentication state across the application.
const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(() => Boolean(getToken()))

  const value = useMemo(
    () => ({
      authed,
      login: () => setAuthed(true),
      logout: () => {
        clearToken()
        setAuthed(false)
      },
    }),
    [authed],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
