import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Home from './pages/Home'
import RegisterPage from './pages/auth/RegisterPage'
import LoginPage from './pages/auth/LoginPage'
import PrivateRoutes from './components/PrivateRoutes'
import Tasks from './pages/Tasks'
import NotFound from './pages/NotFound'
import CategoryModal from './components/CategoryModal'

export default function App() {
  return (
    <main className='w-full min-h-screen theme'>
      <Toaster position='top-center' richColors />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
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
          path='/task/:id/u/:uid'
          element={
            <PrivateRoutes>
              <Tasks />
            </PrivateRoutes>
          }
        />
      </Routes>

      <CategoryModal />
    </main>
  )
}
