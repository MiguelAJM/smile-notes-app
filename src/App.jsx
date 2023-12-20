import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import PrivateRoutes from './components/PrivateRoutes'

export default function App() {
  return (
    <main className='dark text-foreground bg-background min-h-screen p-8'>
      <Toaster position='top-center' richColors />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </main>
  )
}
