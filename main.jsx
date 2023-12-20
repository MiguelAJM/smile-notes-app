import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Providers from './src/Providers'
import App from './src/App'
import './style.css'

const root = createRoot(document.getElementById('app'))
root.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
)
