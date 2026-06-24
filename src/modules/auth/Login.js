import { useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'

import { useAuth } from '../../core/AuthContext.js'
import { t } from '../../common/i18n/index.js'
import { login } from '../../services/api.js'
import {
  FormError,
  LoginCard,
  LoginHint,
  LoginScreen,
} from '../dashboard/dashboard.styled.js'

export default function Login() {
  const { login: onLoggedIn } = useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async ({ email, password }) => {
    setBusy(true)
    setError('')
    try {
      await login(email, password)
      onLoggedIn()
    } catch (err) {
      setError(err.message)
      setBusy(false)
    }
  }

  return (
    <LoginScreen>
      <LoginCard>
        <Typography.Title level={3}>{t('app.title')}</Typography.Title>
        <Typography.Paragraph type="secondary">
          {t('app.operationsDashboard')}
        </Typography.Paragraph>

        <Form layout="vertical" onFinish={submit} requiredMark={false}>
          <Form.Item
            name="email"
            label={t('login.email')}
            rules={[{ required: true, type: 'email' }]}
          >
            <Input type="email" autoFocus />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('login.password')}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          {error && (
            <FormError>
              <Alert type="error" message={error} showIcon />
            </FormError>
          )}

          <Button type="primary" htmlType="submit" loading={busy} block>
            {busy ? t('login.signingIn') : t('login.signIn')}
          </Button>
        </Form>

        <LoginHint type="secondary">{t('login.demoHint')}</LoginHint>
      </LoginCard>
    </LoginScreen>
  )
}
