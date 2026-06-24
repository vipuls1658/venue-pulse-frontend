import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './core/App.js'
import { AuthProvider } from './core/AuthContext.js'
import { GlobalStyle } from './modules/dashboard/dashboard.styled.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
