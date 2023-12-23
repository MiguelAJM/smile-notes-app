import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import Providers from './src/Providers'
import App from './src/App'
import './style.css'
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('app'))
root.render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </StrictMode>
)
