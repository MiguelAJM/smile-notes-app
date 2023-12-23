import { BrowserRouter } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from './context/AuthProvider'
import CategoryProvider from './context/CategoryProvider'
import TaskProvider from './context/TaskProvider'
import ModalProvider from './context/ModalProvider'

export default function Providers({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CategoryProvider>
          <TaskProvider>
            <ModalProvider>
              <NextUIProvider>{children}</NextUIProvider>
            </ModalProvider>
          </TaskProvider>
        </CategoryProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
