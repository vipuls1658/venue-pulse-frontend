import { useEffect, useRef, useState } from 'react'

import { WS_BASE_URL } from '../core/config.js'
import {
  WS_DASHBOARD_PATH,
  WS_RECONNECT_BASE_MS,
  WS_RECONNECT_MAX_MS,
  WS_UNAUTHORIZED_CODE,
} from '../common/constants.js'
import { useAuth } from '../core/AuthContext.js'
import { t } from '../common/i18n/index.js'
import { fetchSummary, getToken } from '../services/api.js'

export function useDashboardSocket() {
  const { logout } = useAuth()
  const [snapshot, setSnapshot] = useState(null)
  const [status, setStatus] = useState('connecting')
  const socketRef = useRef(null)
  const retryRef = useRef(0)

  // ref avoids a stale closure in the mount-only effect
  const onAuthError = useRef(logout)
  onAuthError.current = logout

  useEffect(() => {
    let cancelled = false
    let reconnectTimer = null

    const refresh = () => {
      fetchSummary()
        .then((data) => !cancelled && setSnapshot(data))
        .catch((err) => {
          if (err.message === t('errors.sessionExpired'))
            onAuthError.current?.()
        })
    }

    refresh()

    const connect = () => {
      if (cancelled) return
      // fall back to the page origin, ws/wss matching http/https
      const origin =
        WS_BASE_URL ||
        `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`
      const url = `${origin}${WS_DASHBOARD_PATH}?token=${getToken()}`
      const socket = new WebSocket(url)
      socketRef.current = socket

      socket.onopen = () => {
        retryRef.current = 0
        setStatus('live')
      }
      socket.onmessage = (event) => {
        let msg
        try {
          msg = JSON.parse(event.data)
        } catch {
          return
        }
        if (msg.event === 'transaction_created') refresh()
      }
      socket.onclose = (event) => {
        if (cancelled) return
        if (event.code === WS_UNAUTHORIZED_CODE) {
          setStatus('unauthorized')
          onAuthError.current?.()
          return
        }
        setStatus('reconnecting')
        const delay = Math.min(
          WS_RECONNECT_BASE_MS * 2 ** retryRef.current,
          WS_RECONNECT_MAX_MS,
        )
        retryRef.current += 1
        reconnectTimer = setTimeout(connect, delay)
      }
    }

    connect()

    return () => {
      cancelled = true
      clearTimeout(reconnectTimer)
      socketRef.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { snapshot, status }
}
