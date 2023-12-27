import { Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import PrivateRoutes from './components/PrivateRoutes'
import { AnimatePresence } from 'framer-motion'
import Tasks from './pages/Tasks'
import CategoryModal from './elements/CategoryModal'
import NotFound from './pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <main className='w-full min-h-screen theme'>
      <Toaster position='top-center' richColors />
      <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
          <Route path='*' element={<NotFound />} />
          <Route
            path='/'
            element={
              <PrivateRoutes>
                <Home />
              </PrivateRoutes>
            }
          />
          <Route
            path='/task/:id'
            element={
              <PrivateRoutes>
                <Tasks />
              </PrivateRoutes>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </AnimatePresence>

      <CategoryModal />
    </main>
  )
}
