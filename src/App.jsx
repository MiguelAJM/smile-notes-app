import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import NotFound from './pages/NotFound'
import PrivateRoutes from './components/PrivateRoutes'
import Home from './pages/Home'
import Tasks from './pages/Tasks'
import CategoryModal from './components/modal/CategoryModal'

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
