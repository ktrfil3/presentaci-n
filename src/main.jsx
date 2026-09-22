import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from './ErrorBoundary.jsx'
import { LiveStreamProvider } from './LiveStreamContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <LiveStreamProvider>
        <App />
      </LiveStreamProvider>
    </ErrorBoundary>
  </StrictMode>,
)
