import { createRoot } from 'react-dom/client'
import App from './src/App'
import './style.css'
import { StrictMode } from 'react'
import Providers from './src/context/Providers'

const root = createRoot(document.getElementById('app'))
root.render(
  <StrictMode>
    <Providers>
      <App />
    </Providers>
  </StrictMode>
)
