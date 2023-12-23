import { NextUIProvider } from '@nextui-org/react'
import AuthProvider from './context/AuthProvider'
import CategoryProvider from './context/CategoryProvider'
import TaskProvider from './context/TaskProvider'
import ModalProvider from './context/ModalProvider'
import { useNavigate } from 'react-router-dom'

export default function Providers({ children }) {
  const navigate = useNavigate()

  return (
    <AuthProvider>
      <CategoryProvider>
        <TaskProvider>
          <ModalProvider>
            <NextUIProvider navigate={navigate}>{children}</NextUIProvider>
          </ModalProvider>
        </TaskProvider>
      </CategoryProvider>
    </AuthProvider>
  )
}
